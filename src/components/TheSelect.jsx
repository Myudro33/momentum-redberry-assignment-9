import React, { useEffect, useState } from "react";
import { ErrorMessage } from "formik";
import EmployeeCard from "./EmployeeCard";
import plusIcon from "../assets/plus-icon.png";
import axios from "../services/axiosService";
import checkRed from "../assets/check-red.png";
import solidArrow from "../assets/arrow-down-solid.png";
import arrowDown from "../assets/arrow-down.png";
import { useLocalStorage } from "../services/useLocalStorage";
import { useNavigate } from "react-router-dom";

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
  store,
  dropdown,
  setDropdown,
}) => {
  const [selected, setSelected] = useState();
  const { setItem, getItem } = useLocalStorage(name);

  const handleChange = (item) => {
    if (name === "status") {
      axios({
        method: "PUT",
        endpoint: `/tasks/${id}`,
        body: { status_id: item.id },
      });
    }

    setSelected(item);
    if (name === "department_id" || name === "employee_id") {
      setSelectedValue(item);
    }
    setFieldValue(name, item.id);
    if (setFilteredEmployees) {
      const filter = employees.filter((empl) => empl.department.id === item.id);
      setFilteredEmployees(filter);
    }
    if (store) {
      setItem(name, item);
    }
    setDropdown(null);
  };

  useEffect(() => {
    if (defaultValue) {
      if (name !== "status") {
        setFieldValue(name, defaultValue.id);
      }
      setSelected(defaultValue);
    }
    if (getItem(name)) {
      setSelectedValue(getItem("employee_id") && getItem("employee_id"));
      setFieldValue("employee_id", getItem("employee_id")?.id);
      setFieldValue("department_id", getItem("department_id")?.id);
      setSelected(getItem(name));
    }
  }, [defaultValue, name, setFieldValue]);

  const renderEmployeeCard = (item) => (
    <EmployeeCard
      avatar={item?.avatar}
      name={item?.name}
      surname={item?.surname}
      page={name}
    />
  );
  const router = useNavigate();
  const showModal = () => {
    router("/");
    setModal(true);
  };
  const hasError = errors && touched;
  const borderColor = hasError
    ? "red"
    : touched
    ? "green"
    : "var(--gray-border)";

  const handleDropdownToggle = () => {
    console.log(name);

    setDropdown(name);
  };
  const isOpen = dropdown === name; 

  return (
    <div style={{ width }} className="h-25 flex flex-col">
      <label className="font-semibold text-sm">{label}</label>
      <div
        onClick={handleDropdownToggle}
        className="relative inline-block h-11 w-full p-2 shrink-0 rounded-md border"
        style={{ borderColor }}
      >
        <button
          type="button"
          className="flex items-center text-sm h-8 w-full relative"
        >
          {selected?.icon && (
            <img className="mr-2" src={selected.icon} alt="icon" />
          )}
          {name === "employee_id"
            ? renderEmployeeCard(selectedValue)
            : selected?.name}
          <img
            className={`absolute right-0 ${
              !isOpen && "rotate-180"
            } transition-all `}
            src={isOpen ? solidArrow : arrowDown}
            alt="arrow"
          />
        </button>
        {isOpen && (
          <ul className="w-full left-0 mt-5 top-6 absolute list-none bg-white border border-[var(--purple)] rounded-md z-20 p-2">
            {name === "employee_id" && (
              <button
                className="text-[color:var(--purple)] z-0 cursor-pointer flex items-center w-full p-2"
                type="button"
                onClick={() => showModal()}
              >
                <img className="mr-2" src={plusIcon} alt="icon" /> დაამატე
                თანამშრომელი
              </button>
            )}
            {data &&
              data.map((item) => (
                <li
                  className="flex items-center hover:bg-blue-50 p-1 cursor-pointer"
                  key={item.id}
                  onClick={() => handleChange(item)}
                >
                  {item.icon && (
                    <img className="mr-2" src={item.icon} alt="icon" />
                  )}
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
