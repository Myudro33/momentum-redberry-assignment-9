import React from "react";

const TheSelect = (props) => {
  return (
    <div style={{marginTop:props.style}} className="flex w-[22rem] h-20  flex-col">
      <label className="font-semibold text-sm">{props.label} *</label>
      <select  className="h-11 p-2 shrink-0 rounded-md border border-[color:var(--border-color)] outline-none" >
       <option selected disabled value=""></option>
       {props.data.map(item=>(
           <option key={item.id} value={item.id}>{item.name}</option>
       ))}
      </select>
      <span className="flex items-center h-5 shrink-0">
        <p>error</p>
      </span>
    </div>
  );
};

export default TheSelect;
