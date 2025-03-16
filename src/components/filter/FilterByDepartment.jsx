import React from "react";
import TheButton from "../TheButton";
import { applyFilters, setQueryParams } from "../../services/filterService";
import { useSearchParams } from "react-router-dom";
const FilterByDepartment = ({
  show,
  departments,
  selectedDepartments,
  setSelectedDepartments,
  toggleSelection,
  tasks,
  setFilteredData,
}) => {
  const data = [...tasks];
  const [searchParams, setSearchParams] = useSearchParams();
  const prioritiesFromQuery = searchParams.get("priorities")?.split(",") || [];
  const employeesFromQuery = searchParams.get("employees")?.split(",") || [];
  const click = () => {
    applyFilters(
      selectedDepartments,
      employeesFromQuery,
      prioritiesFromQuery,
      setFilteredData,
      [...data]
    );
    setQueryParams(
      setSearchParams,
      { departments: selectedDepartments },
      searchParams
    );
  };
  return (
    <div
      className={`absolute top-14 p-3 -left-6 w-[43rem] bg-white border border-[color:var(--solid-button)] rounded-[.625rem] ${
        show ? "block" : "hidden"
      } flex flex-wrap gap-2 `}
    >
      {departments &&
        departments.map((department) => (
          <div
            className="w-[45%] h-8 flex items-center font-normal text-sm"
            key={department.id}
          >
            <input
              value={department.name}
              id={department.name}
              checked={selectedDepartments.includes(department.name)}
              onChange={() =>
                toggleSelection(department.name, setSelectedDepartments)
              }
              className="w-5 h-5 shrink-0 cursor-pointer"
              type="checkbox"
            />
            <label
              className="ml-2 text-xs cursor-pointer"
              htmlFor={department.name}
            >
              {department.name}
            </label>
          </div>
        ))}
      <TheButton
        onClick={click}
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

export default FilterByDepartment;
