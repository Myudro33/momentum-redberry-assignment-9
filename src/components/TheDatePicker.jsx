import { Field,ErrorMessage } from "formik";
import React from "react";

const TheDatePicker = (props) => {
  return (
    <div
      style={{ width: props.width || "22rem" }}
      className="flex  h-20  flex-col"
    >
      <label className="font-semibold text-sm">{props.label} *</label>
      <input
        type="date"
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        className="h-11 p-2 shrink-0 rounded-md border border-[color:var(--border-color)] outline-none "
      />
      <span className="flex items-center h-5 shrink-0">
        <p className="text-red-500">
          <ErrorMessage name={props.name} />
        </p>
      </span>
    </div>
  );
};

export default TheDatePicker;
