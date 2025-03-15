import React, { useEffect, useState } from "react";
import { ErrorMessage } from "formik";
import EmployeeCard from "./EmployeeCard";
import plusIcon from "../assets/plus-icon.png";
import axios from '../services/axiosService'

const TheSelect = ({
  name,
  label,
  width = "22rem",
  data,
  defaultValue,
  setFieldValue,
  setSelectedValue,
  setFilteredEmployees,
  employees,
  selectedValue,
  setModal,
  id
}) => {
  const [selected, setSelected] = useState();

  const handleChange = (item) => {
    

    if(name=="status"){
       axios({ method: "PUT", endpoint: `/tasks/${id}`, body: {status_id:item.id} });       
    }
    
    setSelected(item);
    setSelectedValue(item);
    setFieldValue(name, item.id);
    if (name === "employee_id") {
      setFieldValue(name, item.id);
    }
 

    if (setFilteredEmployees) {
      setSelectedValue("");
      setFieldValue("employee_id", null);
      const filter = employees.filter((empl) => empl.department.id === item.id);
      setFilteredEmployees(filter);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      if(name!=='status'){
        setFieldValue(name, defaultValue.id);
      }
      setSelected(defaultValue);
    }
  }, [defaultValue, name, setFieldValue]);

  const renderEmployeeCard = (item) => (
    <EmployeeCard
      avatar={item.avatar}
      name={item.name}
      surname={item.surname}
      props={{ name, selectedValue }}
    />
  );

  return (
    <div style={{ width }} className="h-25 flex flex-col">
      <label className="font-semibold text-sm">{label}</label>
      <div className="relative inline-block dropdown h-11 w-full p-2 shrink-0 rounded-md border border-[color:var(--border-color)]">
        <button type="button" className="flex items-center text-sm h-8 w-full">
          {selected?.icon && (
            <img className="mr-2" src={selected.icon} alt="icon" />
          )}
          {name === "employee_id"
            ? renderEmployeeCard(selectedValue)
            : selected?.name}
        </button>
        <ul className="dropdown-menu w-full left-0 mt-5 top-6">
          {name === "employee_id" && (
            <button
              className="text-[color:var(--solid-button)] cursor-pointer flex items-center w-full p-2"
              type="button"
              onClick={() => setModal("employee")}
            >
              <img className="mr-2" src={plusIcon} alt="icon" /> დაამატე
              თანამშრომელი
            </button>
          )}
          {data &&
            data.map((item) => (
              <li key={item.id} onClick={() => handleChange(item)}>
                {item.icon && <img src={item.icon} alt="icon" />}
                {name === "employee_id" ? renderEmployeeCard(item) : item.name}
              </li>
            ))}
        </ul>
      </div>
      <span className="text-red-500">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export default TheSelect;
