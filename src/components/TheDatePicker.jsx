import { ErrorMessage } from "formik";
import React,{useEffect,useState} from "react";
import checkRed from "../assets/check-red.png";
import { useLocalStorage } from "../services/useLocalStorage";

const TheDatePicker = ({ field, form: { errors, touched, setFieldValue }, ...props }) => {
  const [date, setDate] = useState("");
  const hasError = errors[field.name] && touched[field.name];
  const borderColor = hasError
    ? "red"
    : touched[field.name]
    ? "green"
    : "var(--gray-border)";
  const { setItem,getItem } = useLocalStorage();
  useEffect(() => {
      setItem(field.name, field.value);
  }, [field]);
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split("T")[0]);
    if(!getItem('due_date')){
      setFieldValue(field.name,  tomorrow.toISOString().split("T")[0]); 
      setItem(field.name, tomorrow.toISOString().split("T")[0]);
    } 
  }, []);
  return (
    <div
      style={{ width: props.width || "22rem" }}
      className="flex h-20 flex-col"
    >
      <label className="font-semibold text-sm">{props.label} *</label>
      <input
        {...field}
        value={getItem('due_date') || date} 
        type="date"
        className="h-11 p-2 shrink-0 rounded-md border outline-none"
        style={{ borderColor }}
        onChange={(e) => {
          const value = e.target.value;
          setFieldValue(field.name, value); 
          setDate(value);
        }}
      />
      {hasError && (
        <p className="text-red-500 flex items-center">
          <img className="h-5 w-5 shrink-0 mr-1" src={checkRed} alt="check" />
          <ErrorMessage name={field.name} />
        </p>
      )}
    </div>
  );
};

export default TheDatePicker;
