import React from "react";
import EmployeeCard from "../EmployeeCard";
import TheButton from "../TheButton";
import { applyFilters, setQueryParams } from "../../services/filterService";
import { useSearchParams } from "react-router-dom";

const FilterByEmployee = ({
  show,
  employees,
  selectedEmployees,
  setSelectedemployees,
  toggleSelection,
  tasks,
  setFilteredData,
}) => {
  const data = [...tasks];
  const [searchParams, setSearchParams] = useSearchParams();
  const prioritiesFromQuery = searchParams.get("priorities")?.split(",") || [];
  const departmentsFromQuery =
    searchParams.get("departments")?.split(",") || [];
  const click = () => {
    applyFilters(
      departmentsFromQuery,
      selectedEmployees,
      prioritiesFromQuery,
      setFilteredData,
      [...data]
    );
    setQueryParams(
      setSearchParams,
      { employees: selectedEmployees },
      searchParams
    );
  };
  return (
    <div
      className={`absolute top-14 p-3 -left-2 w-[20rem] bg-white border border-[color:var(--purple)] rounded-[.625rem] ${
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
              name='employee'
              id={employee.id}
              checked={selectedEmployees?.includes(`${employee.name} ${employee.surname}`)}
              onChange={() =>
                toggleSelection(`${employee.name} ${employee.surname}`, setSelectedemployees,true)
              }
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

export default FilterByEmployee;
