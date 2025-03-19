import { Field } from "formik";
import RenderErrorMessages from "./RenderErrorMessages";
import React, { useEffect } from "react";
import { useLocalStorage } from "../services/useLocalStorage";
const TheTextarea = ({ field, form: { errors, touched }, ...props }) => {
  const hasError = errors[field.name] && touched[field.name];
  const borderColor = hasError
    ? "red"
    : touched[field.name]
      ? "green"
      : "var(--gray-border)";
  const { setItem } = useLocalStorage(field.name);
  useEffect(() => {
    if (props.store) {
      setItem(field.name, field.value);
    }
  }, [field]);
  return (
    <div
      style={{ width: props.width || "22rem" }}
      className="flex h-20 flex-col mt-14"
    >
      <label className="font-semibold text-sm">{props.label}</label>
      <Field
        as="textarea"
        {...field}
        className="p-2 h-[8.313rem] resize-none shrink-0 rounded-md border outline-none"
        style={{ borderColor }}
      />
      <RenderErrorMessages
        errorMessage={"მინიმუმ 4 სიტყვა"}
        errors={errors}
        fieldName={field.name}
        touched={touched}
      />
    </div>
  );
};

export default TheTextarea;
