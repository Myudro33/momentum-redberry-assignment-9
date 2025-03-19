import React, { useEffect } from "react";
import { useLocalStorage } from "../services/useLocalStorage";
import RenderErrorMessages from "./RenderErrorMessages.jsx";

const TheInput = ({ field, form: { errors, touched }, ...props }) => {
  const { setItem } = useLocalStorage();
  const borderColor =
    errors[field.name] && touched[field.name]
      ? "red"
      : touched[field.name]
        ? "green"
        : "var(--gray-border)";
  useEffect(() => {
    if (props.store) {
      setItem(field.name, field.value);
    }
  }, [field]);
  return (
    <div
      style={{ width: props.width || "22rem" }}
      className="flex h-20 flex-col"
    >
      <label className="font-semibold text-sm">{props.label} *</label>
      <input
        {...field}
        className="h-11 p-2 shrink-0 rounded-md border outline-none"
        type="text"
        style={{ borderColor }}
      />
      <RenderErrorMessages
        errorMessage={
          field.name === "name" ? "მინიმუმ 3 სიმბოლო" : "მინიმუმ 2 სიმბოლო"
        }
        errors={errors}
        fieldName={field.name}
        touched={touched}
      />
      <RenderErrorMessages
        errorMessage="მაქსიმუმ 255 სიმბოლო"
        errors={errors}
        fieldName={field.name}
        touched={touched}
      />
    </div>
  );
};

export default TheInput;
