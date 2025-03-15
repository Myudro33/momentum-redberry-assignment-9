import { Field,ErrorMessage } from 'formik'
import React from 'react'

const TheTextarea = (props) => {
  return (
    <div style={{width:props.width||'22rem'}} className="flex  h-20  flex-col">
          <label className="font-semibold text-sm">{props.label}</label>
          <Field as='textarea'
            name={props.name}
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            className="p-2 h-[8.313rem] resize-none shrink-0 rounded-md border border-[color:var(--border-color)] outline-none "
            type="text"
          />
          <span className="flex items-center h-5 shrink-0">
            <p className="text-red-500">
              <ErrorMessage name={props.name} />
            </p>
          </span>
        </div>
  )
}

export default TheTextarea
