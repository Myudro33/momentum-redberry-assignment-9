import React from "react";
import { ErrorMessage } from "formik";

const TheInput = (props) => {
  return (
    <div className="flex w-[22rem] h-20  flex-col">
      <label className="font-semibold text-sm">{props.label} *</label>
      <input
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        className="h-11 p-2 shrink-0 rounded-md border border-[color:var(--border-color)] outline-none "
        type="text"
      />
      <span className="flex items-center h-5 shrink-0">
        <p className="text-red-500">
          <ErrorMessage name={props.name} />
        </p>
      </span>
    </div>
  );
};

export default TheInput;
