import React, { useEffect, useState } from "react";
import { ErrorMessage } from "formik";
import EmployeeCard from "./EmployeeCard";
import plusIcon from "../assets/plus-icon.png";
import axios from "../services/axiosService";
import checkRed from "../assets/check-red.png";
import solidArrow from '../assets/arrow-down-solid.png'
import arrowDown from '../assets/arrow-down.png'

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
  id,
  errors,
  touched,
}) => {
  const [selected, setSelected] = useState();
  const [dropdown, setDropdown] = useState(false);

  const handleChange = (item) => {
    if (name === "status") {
      axios({
        method: "PUT",
        endpoint: `/tasks/${id}`,
        body: { status_id: item.id },
      });
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
      if (name !== "status") {
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
      page={name}
    />
  );

  const hasError = errors && touched;
  const borderColor = hasError
    ? "red"
    : touched
    ? "green"
    : "var(--gray-border)";

  return (
    <div style={{ width }} className="h-25 flex flex-col">
      <label className="font-semibold text-sm">{label} *</label>
      <div
        onClick={() => setDropdown((prev) => !prev)}
        className="relative inline-block dropdown h-11 w-full p-2 shrink-0 rounded-md border"
        style={{ borderColor }}
      >
        <button type="button" className="flex items-center text-sm h-8 w-full relative">
          {selected?.icon && (
            <img className="mr-2" src={selected.icon} alt="icon" />
          )}
          {name === "employee_id"
            ? renderEmployeeCard(selectedValue)
            : selected?.name}
            <img className={`absolute right-0 ${!dropdown&&'rotate-180'} transition-all `} src={dropdown?solidArrow:arrowDown} alt="arrow" />
        </button>
        {dropdown && (
          <ul className="w-full left-0 mt-5 top-6 absolute list-none bg-white border border-[var(--purple)] rounded-md z-10 p-2">
            {name === "employee_id" && (
              <button
                className="text-[color:var(--purple)] cursor-pointer flex items-center w-full p-2"
                type="button"
                onClick={() => setModal("employee")}
              >
                <img className="mr-2" src={plusIcon} alt="icon" /> დაამატე
                თანამშრომელი
              </button>
            )}
            {data &&
              data.map((item) => (
                <li className="flex items-center hover:bg-blue-50 p-1 cursor-pointer" key={item.id} onClick={() => handleChange(item)}>
                  {item.icon && <img src={item.icon} alt="icon" />}
                  {name === "employee_id"
                    ? renderEmployeeCard(item)
                    : item.name}
                </li>
              ))}
          </ul>
        )}
      </div>
      {hasError && (
        <p className="text-red-500 flex items-center">
          <img className="h-5 w-5 shrink-0 mr-1" src={checkRed} alt="check" />
          <ErrorMessage name={name} />
        </p>
      )}
    </div>
  );
};

export default TheSelect;
