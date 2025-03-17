import { Field, ErrorMessage } from 'formik';
import React from 'react';

const TheTextarea = ({ field, form: { errors, touched }, ...props }) => {
  const hasError = errors[field.name] && touched[field.name];
  const borderColor = hasError ? 'red' : (touched[field.name] ? 'green' : 'var(--border-color)');

  return (
    <div style={{ width: props.width || '22rem' }} className="flex h-20 flex-col mt-14">
      <label className="font-semibold text-sm">{props.label}</label>
      <Field
        as="textarea"
        {...field}
        className="p-2 h-[8.313rem] resize-none shrink-0 rounded-md border outline-none"
        style={{ borderColor }}
      />
      <span className="flex items-center h-5 shrink-0">
        <p className="text-red-500">
          <ErrorMessage name={field.name} />
        </p>
      </span>
    </div>
  );
};

export default TheTextarea;
