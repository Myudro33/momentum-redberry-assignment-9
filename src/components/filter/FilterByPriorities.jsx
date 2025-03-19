import React from "react";
import TheButton from "../TheButton";
import { applyFilters, setQueryParams } from "../../services/filterService";
import { useSearchParams } from "react-router-dom";

const FilterByPriorities = ({
  show,
  priorities,
  selectedPriorities,
  setSelectedPriorities,
  toggleSelection,
  tasks,
  setFilteredData,
}) => {
  const data = [...tasks];
  const [searchParams, setSearchParams] = useSearchParams();
  const employeesFromQuery = searchParams.get("employees")?.split(",") || [];
  const departmentsFromQuery =
    searchParams.get("departments")?.split(",") || [];
  const click = () => {
    applyFilters(
      departmentsFromQuery,
      employeesFromQuery,
      selectedPriorities,
      setFilteredData,
      [...data],
    );
    setQueryParams(
      setSearchParams,
      { priorities: selectedPriorities },
      searchParams,
    );
  };
  return (
    <div
      className={`absolute top-14 p-3 -left-2 w-[20rem] bg-white border border-[color:var(--purple)] rounded-[.625rem] ${
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
              checked={selectedPriorities.includes(prioritie.name)}
              onChange={() =>
                toggleSelection(prioritie.name, setSelectedPriorities)
              }
              className="w-5 h-5 shrink-0 cursor-pointer"
              type="checkbox"
            />
            <label
              className="ml-2 text-xs cursor-pointer"
              htmlFor={prioritie.name}
            >
              {prioritie.name}
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

export default FilterByPriorities;
