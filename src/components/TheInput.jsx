import React from "react";
import { ErrorMessage } from "formik";
import checkRed from "../assets/check-red.png";

const TheInput = ({ field, form: { errors, touched }, ...props }) => {
  const hasError = errors[field.name] && touched[field.name];
  const borderColor = hasError ? 'red' : (touched[field.name] ? 'green' : 'var(--border-color)');

  return (
    <div style={{ width: props.width || "22rem" }} className="flex h-20 flex-col">
      <label className="font-semibold text-sm">{props.label} *</label>
      <input
        {...field}
        className={`h-11 p-2 shrink-0 rounded-md border outline-none`}
        type="text"
        style={{ borderColor }}
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

export default TheInput;
