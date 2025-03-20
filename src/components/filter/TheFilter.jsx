import React, { useState } from "react";
import arrow from "../../assets/arrow-down.png";
import arrowDown from "../../assets/arrow-down-solid.png";
import FilterByDepartment from "./FilterByDepartment";
import FilterByPriorities from "./FilterByPriorities";
import FilterByEmployee from "./FilterByEmployee";
import { useMyContext } from "../../context";

const TheFilter = ({
  setFilteredData,
  selectedDepartments,
  setSelectedDepartments,
  selectedPriorities,
  setSelectedPriorities,
  selectedEmployees,
  setSelectedEmployees,
}) => {
  const [filters, setFilters] = useState({
    department: false,
    prioritie: false,
    employee: false,
  });
  const { departments, priorities, employees, tasks } = useMyContext();
  const { department, prioritie, employee } = filters;
  const toggleFilter = (filter) => {
    setFilters({
      department: filter === "department" ? !filters.department : false,
      prioritie: filter === "prioritie" ? !filters.prioritie : false,
      employee: filter === "employee" ? !filters.employee : false,
    });
  };

  const toggleSelection = (value, setSelection, employee) => {
    if (employee) {
      setSelection((prev) => (prev == value ? "" : value));
      return;
    }
    setSelection((prev) => {
      const updatedSelection = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      return updatedSelection;
    });
  };

  return (
    <div className="w-[43rem] px-6 h-[2.75rem] mt-8 flex justify-between rounded-[.625rem] border border-[color:var(--gray-border)]">
      <div className="flex items-center relative">
        <p
          style={{ color: department && "var(--purple)" }}
          onClick={() => toggleFilter("department")}
          className="flex items-center cursor-pointer"
        >
          დეპარტამენტი{" "}
          <img
            className="ml-2"
            src={department ? arrowDown : arrow}
            alt="arrow down"
          />{" "}
        </p>
        <FilterByDepartment
          tasks={tasks}
          setFilteredData={setFilteredData}
          toggleSelection={toggleSelection}
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          show={department}
          departments={departments}
        />
      </div>
      <div className="flex items-center relative">
        <p
          style={{ color: prioritie && "var(--purple)" }}
          onClick={() => toggleFilter("prioritie")}
          className="flex items-center cursor-pointer"
        >
          პრიორიტეტი{" "}
          <img
            className="ml-2"
            src={prioritie ? arrowDown : arrow}
            alt="arrow down"
          />{" "}
        </p>
        <FilterByPriorities
          toggleSelection={toggleSelection}
          setSelectedPriorities={setSelectedPriorities}
          tasks={tasks}
          selectedPriorities={selectedPriorities}
          setFilteredData={setFilteredData}
          show={prioritie}
          priorities={priorities}
        />
      </div>
      <div className="flex items-center relative">
        <p
          style={{ color: employee && "var(--purple)" }}
          onClick={() => toggleFilter("employee")}
          className="flex items-center cursor-pointer"
        >
          თანამშრომელი{" "}
          <img
            className="ml-2"
            src={employee ? arrowDown : arrow}
            alt="arrow down"
          />{" "}
        </p>
        <FilterByEmployee
          tasks={tasks}
          toggleSelection={toggleSelection}
          selectedEmployees={selectedEmployees}
          setFilteredData={setFilteredData}
          setSelectedemployees={setSelectedEmployees}
          show={employee}
          employees={employees}
        />
      </div>
    </div>
  );
};

export default TheFilter;
