import React, { useEffect, useState } from "react";
import { ErrorMessage } from "formik";
import EmployeeCard from "./EmployeeCard";
import plusIcon from "../assets/plus-icon.png";
import axios from "../services/axiosService";
import checkRed from "../assets/check-red.png";
import solidArrow from "../assets/arrow-down-solid.png";
import arrowDown from "../assets/arrow-down.png";
import { useLocalStorage } from "../services/useLocalStorage";
import { useMyContext } from "../context";

const TheSelect = ({
  name,
  label,
  width = "22rem",
  data,
  defaultValue,
  setFieldValue,
  setSelectedValue,
  setFilteredEmployees,
  selectedValue,
  id,
  errors,
  touched,
  store,
  dropdown,
  setDropdown,
  disabled,
}) => {
  const [selected, setSelected] = useState();
  const { setItem, getItem } = useLocalStorage(name);
  const { modal, setModal, employees, setTasks } = useMyContext();

  const handleChange = async (item) => {
    if (name === "status") {
      const res = await axios({
        method: "PUT",
        endpoint: `/tasks/${id}`,
        body: { status_id: item.id },
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? res : task))
      );
      setDropdown(null);
      setSelected(item);
      return;
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

  useEffect(() => {
    if (
      name === "department_id" &&
      getItem("department_id")?.id &&
      modal === null
    ) {
      const fetchEmployees = async () => {
        const filter = employees.filter(
          (empl) => empl.department.id === getItem("department_id")?.id
        );
        setFilteredEmployees(filter);
      };
      fetchEmployees();
    }
  }, [modal]);
  const renderEmployeeCard = (item) => (
    <EmployeeCard
      avatar={item?.avatar}
      name={item?.name}
      surname={item?.surname}
      page={name}
    />
  );
  const showModal = () => {
    setDropdown(null);
    setModal(true);
  };
  const hasError = errors && touched;
  const borderColor = hasError
    ? "red"
    : touched
      ? "green"
      : name === "employee_id" && !disabled
        ? "var(--light-border) "
        : "var(--gray-border)";

  const handleDropdownToggle = () => {
    setDropdown(name);
  };
  return (
    <div style={{ width }} className="h-25 flex flex-col">
      <label
        className={`font-semibold text-sm  ${name === "employee_id" && !disabled && "text-[var(--light-border)]"}`}
      >
        {label}
      </label>
      <div
        className="relative inline-block h-11 w-full p-2 shrink-0 rounded-md border"
        style={{ borderColor }}
      >
        <button
          onClick={handleDropdownToggle}
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
              !dropdown === name && "rotate-180"
            } transition-all `}
            src={
              dropdown === name
                ? name === "employee_id" && !disabled
                  ? arrowDown
                  : solidArrow
                : arrowDown
            }
            alt="arrow"
          />
        </button>
        {dropdown === name && (
          <ul
            className={`w-full left-0 mt-5 top-6 absolute list-none bg-white border border-[var(--purple)] rounded-md z-20 p-2 ${name === "employee_id" && !disabled && "hidden"} `}
          >
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
        <p className="text-red-500 text-xs flex items-center">
          <img className="shrink-0 mr-1" src={checkRed} alt="check" />
          <ErrorMessage name={name} />
        </p>
      )}
    </div>
  );
};

export default TheSelect;
