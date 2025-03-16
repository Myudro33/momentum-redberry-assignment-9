import React from "react";
import TheButton from "../TheButton";

const FilterByPriorities = ({ show, priorities }) => {
  return (
    <div
      className={`absolute top-14 p-3 -left-2 w-[20rem] bg-white border border-[color:var(--solid-button)] rounded-[.625rem] ${
        show ? "block" : "hidden"
      } flex flex-wrap gap-2 `}
    >
      {priorities &&
        priorities.map((prioritie) => (
          <div
            className="w-full h-8 flex items-center font-normal text-sm"
            key={prioritie.id}
          >
            <input
              value={prioritie.name}
              id={prioritie.name}
              className="w-5 h-5 shrink-0 cursor-pointer"
              type="checkbox"
            />
            <label className="ml-2 text-xs cursor-pointer" htmlFor={prioritie.name}>
              {prioritie.name}
            </label>
          </div>
        ))}
      <TheButton
        type="button"
        rounded
        solid
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          height: "35px",
          alignItems: "center",
          display: "flex",
        }}
        text="არჩევა"
      />
    </div>
  );
};

export default FilterByPriorities;
