import React, { useState, useEffect } from "react";
import TheFilter from "../components/filter/TheFilter";
import TheWrapper from "../components/TheWrapper";
import { useSearchParams, useLocation } from "react-router-dom";
import { applyFilters } from "../services/filterService";
import FilterChips from "../components/filter/FilterChips";
import { useMyContext } from "../context";

const Home = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState(null);
  const { search } = useLocation();
  const { tasks } = useMyContext();
  useEffect(() => {
    const getData = () => {
      try {
        setFilteredData(tasks);
        const departmentsFromQuery =
          searchParams.get("departments")?.split(",") || [];
        const prioritiesFromQuery =
          searchParams.get("priorities")?.split(",") || [];
        const employeesFromQuery =
          searchParams.get("employees")?.split(",") || [];
        setSelectedDepartments(departmentsFromQuery);
        setSelectedPriorities(prioritiesFromQuery);
        setSelectedEmployees(employeesFromQuery);
        applyFilters(
          departmentsFromQuery,
          employeesFromQuery,
          prioritiesFromQuery,
          setFilteredData,
          [...tasks]
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getData();
  }, []);
  useEffect(() => {
    const departmentsFromQuery =
      searchParams.get("departments")?.split(",") || [];
    const prioritiesFromQuery =
      searchParams.get("priorities")?.split(",") || [];
    const employeesFromQuery = searchParams.get("employees")?.split(",") || [];
    setSelectedDepartments(departmentsFromQuery);
    setSelectedPriorities(prioritiesFromQuery);
    setSelectedEmployees(employeesFromQuery);
    applyFilters(
      departmentsFromQuery,
      employeesFromQuery,
      prioritiesFromQuery,
      setFilteredData,
      [...tasks]
    );
  }, [search]);
  const displayData =
    filteredData.length !== 0 ||
    selectedDepartments.length ||
    selectedPriorities.length ||
    selectedEmployees
      ? filteredData
      : tasks;

  return (
    <>
      <div className="px-[7.5rem] mt-6">
        <h1 className="text-[2.1rem] font-semibold">დავალებების გვერდი</h1>
        <TheFilter
          selectedDepartments={selectedDepartments}
          setSelectedDepartments={setSelectedDepartments}
          selectedPriorities={selectedPriorities}
          setSelectedPriorities={setSelectedPriorities}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
        <FilterChips />
      </div>
      <TheWrapper tasks={displayData} />
    </>
  );
};

export default Home;
