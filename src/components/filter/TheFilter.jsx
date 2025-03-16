import React, { useEffect, useState } from "react";
import arrow from "../../assets/arrow-down.png";
import arrowDown from "../../assets/arrow-down-solid.png";
import axios from "../../services/axiosService";
import FilterByDepartment from "./FilterByDepartment";
import FilterByPriorities from "./FilterByPriorities";
import FilterByEmployee from "./FilterByEmployee";

const TheFilter = () => {
  const [filters, setFilters] = useState({
    department: false,
    prioritie: false,
    employee: false,
  });
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { department, prioritie, employee } = filters;

  const toggleFilter = (filter) => {
    setFilters({
      department: filter === "department" ? !filters.department : false,
      prioritie: filter === "prioritie" ? !filters.prioritie : false,
      employee: filter === "employee" ? !filters.employee : false,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const departments = await axios({
        endpoint: "/departments",
        method: "GET",
      });
      const priorities = await axios({
        endpoint: "/priorities",
        method: "GET",
      });
      const employees = await axios({
        endpoint: "/employees",
        method: "GET",
      });
      setPriorities(priorities);
      setDepartments(departments);
      setEmployees(employees);
    };
    fetchData();
  }, []);

  return (
    <div className="w-[43rem] px-6 h-[2.75rem] mt-8 flex justify-between rounded-[.625rem] border border-[color:var(--light-border)]">
      <div className="flex items-center relative">
        <p
          style={{ color: department && "var(--solid-button)" }}
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
        <FilterByDepartment show={department} departments={departments} />
      </div>
      <div className="flex items-center relative">
        <p
          style={{ color: prioritie && "var(--solid-button)" }}
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
        <FilterByPriorities show={prioritie} priorities={priorities} />
      </div>
      <div className="flex items-center relative">
        <p
          style={{ color: employee && "var(--solid-button)" }}
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
        <FilterByEmployee show={employee} employees={employees} />
      </div>
    </div>
  );
};

export default TheFilter;
