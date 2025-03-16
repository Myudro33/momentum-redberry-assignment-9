import React from "react";
import EmployeeCard from "../EmployeeCard";
import TheButton from "../TheButton";

const FilterByEmployee = ({ show, employees }) => {
  return (
    <div
      className={`absolute top-14 p-3 -left-2 w-[20rem] bg-white border border-[color:var(--solid-button)] rounded-[.625rem] ${
        show ? "block" : "hidden"
      } flex flex-wrap gap-2 `}
    >
      {employees &&
        employees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center cursor-pointer w-full"
          >
            <input
              type="checkbox"
              name={employee.name}
              id={employee.id}
              className="mr-2 shrink-0 w-5 h-5 cursor-pointer"
            />
            <label className="cursor-pointer" htmlFor={employee.id}>
              <EmployeeCard
                avatar={employee.avatar}
                name={employee.name}
                surname={employee.surname}
                page={"filter"}
              />{" "}
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

export default FilterByEmployee;
