import { createContext, useContext, useState } from "react";
import axios from "../services/axiosService";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchEmployeeData = async () => {
    return await axios({ method: "GET", endpoint: "/employees" });
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasks, employees, priorities, statuses, departments] =
        await Promise.all([
          axios({ method: "GET", endpoint: "/tasks" }),
          axios({ method: "GET", endpoint: "/employees" }),
          axios({ method: "GET", endpoint: "/priorities" }),
          axios({ method: "GET", endpoint: "/statuses" }),
          axios({ method: "GET", endpoint: "/departments" }),
        ]);
      setTasks(tasks);
      setEmployees(employees);
      setPriorities(priorities);
      setStatuses(statuses);
      setDepartments(departments);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  return (
    <MyContext.Provider
      value={{
        modal,
        setModal,
        employees,
        setEmployees,
        fetchData,
        priorities,
        setPriorities,
        statuses,
        setStatuses,
        departments,
        setDepartments,
        tasks,
        setTasks,
        loading,
        setLoading,
        fetchEmployeeData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
