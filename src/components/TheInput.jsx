import React, { useEffect } from "react";
import { ErrorMessage } from "formik";
import checkRed from "../assets/check-red.png";
import { useLocalStorage } from "../services/useLocalStorage";

const TheInput = ({ field, form: { errors, touched }, ...props }) => {
  const hasError = errors[field.name] && touched[field.name];
  const {setItem} = useLocalStorage(field.name)
  const borderColor = hasError
    ? "red"
    : touched[field.name]
    ? "green"
    : "var(--gray-border)";

    useEffect(()=>{
      if(props.store){
        setItem(field.name,field.value)
      }
    },[field])

  return (
    <div
      style={{ width: props.width || "22rem" }}
      className="flex h-20 flex-col"
    >
      <label className="font-semibold text-sm">{props.label} *</label>
      <input
        {...field}
        className={`h-11 p-2 shrink-0 rounded-md border outline-none`}
        type="text"
        style={{ borderColor }}
      />

      <p className="text-red-500 h-10 flex items-center">
        {hasError && (
          <img className="shrink-0 mr-1" src={checkRed} alt="check" />
        )}
        <ErrorMessage name={field.name} />
      </p>
    </div>
  );
};

export default TheInput;
