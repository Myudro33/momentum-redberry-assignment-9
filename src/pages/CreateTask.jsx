import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import TheInput from "../components/TheInput";
import { taskInitialSchema, taksValidation } from "../utils/formValidations";
import TheTextarea from "../components/TheTextarea";
import TheSelect from "../components/TheSelect";
import TheDatePicker from "../components/TheDatePicker";
import TheButton from "../components/TheButton";
import axios from "../services/axiosService";
import { useNavigate } from "react-router-dom";
import addTask from "../api/addTask";

const CreateTask = ({ setModal, modal, employees, setEmployees }) => {
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdown, setDropdown] = useState(null);
  const handleDropdownToggle = (name) => {
    setDropdown((prev) => (prev === name ? null : name));
  };
  const router = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priorities, statuses, departments] = await Promise.all([
          axios({ method: "GET", endpoint: "/priorities" }),
          axios({ method: "GET", endpoint: "/statuses" }),
          axios({ method: "GET", endpoint: "/departments" }),
        ]);
        setPriorities(priorities);
        setStatuses(statuses);
        setDepartments(departments);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employee = await axios({ method: "GET", endpoint: "/employees" });
      setEmployees(employee);
    };
    fetchEmployees();
  }, []);

  return (
    <div className="px-[7.5rem] mt-5">
      <h1 className="text-2xl font-semibold">შექმენი ახალი დავალება</h1>
      <Formik
        initialValues={taskInitialSchema}
        validationSchema={taksValidation}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values) => {
          addTask(values);
          router("/");
        }}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          handleChange,
        }) => (
          <Form
            className="w-full flex flex-col items-end p-10 mt-5"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex justify-between">
              <div className="w-[43%] h-[26rem] flex flex-col justify-between">
                <Field store name="name" component={TheInput} label="სათაური" />
                <Field
                  store
                  name="description"
                  component={TheTextarea}
                  label="აღწერა"
                  width="100%"
                />
                <div className="flex w-full justify-between mt-28">
                  {priorities?.length > 0 && (
                    <TheSelect
                      name="priority_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.priority_id}
                      label="პრიორიტეტი *"
                      width="47%"
                      data={priorities}
                      setFieldValue={setFieldValue}
                      defaultValue={priorities[1]}
                      selectedValue={selectedValue}
                      setSelectedValue={setSelectedValue}
                      errors={errors.priority_id}
                      touched={touched.priority_id}
                      store
                      dropdown={dropdown}
                      setDropdown={handleDropdownToggle}
                    />
                  )}
                  {statuses?.length > 0 && (
                    <TheSelect
                      name="status_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.status_id}
                      label="სტატუსი *"
                      width="47%"
                      data={statuses}
                      setFieldValue={setFieldValue}
                      defaultValue={statuses[0]}
                      selectedValue={selectedValue}
                      setSelectedValue={setSelectedValue}
                      errors={errors.status_id}
                      touched={touched.status_id}
                      store
                      dropdown={dropdown}
                      setDropdown={handleDropdownToggle}
                    />
                  )}
                </div>
              </div>
              <div className="w-[43%] h-[25.2rem] flex flex-col justify-between">
                <div className="h-[12.5rem] flex flex-col justify-between">
                  <TheSelect
                    name="department_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department_id}
                    label="დეპარტამენტი *"
                    width="100%"
                    data={departments}
                    setFieldValue={setFieldValue}
                    employees={employees}
                    filteredEmployees={filteredEmployees}
                    setFilteredEmployees={setFilteredEmployees}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    errors={errors.department_id}
                    touched={touched.department_id}
                    store
                    dropdown={dropdown}
                    setDropdown={handleDropdownToggle}
                    modal={modal}
                  />
                  <TheSelect
                    name="employee_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.employee_id}
                    label="პასუხისმგებელი თანამშრომელი *"
                    selectedValue={selectedValue}
                    width="100%"
                    data={filteredEmployees}
                    setFieldValue={setFieldValue}
                    setSelectedValue={setSelectedValue}
                    setModal={setModal}
                    errors={errors.employee_id}
                    touched={touched.employee_id}
                    store
                    dropdown={dropdown}
                    setDropdown={handleDropdownToggle}
                  />
                </div>
                <Field
                  name="due_date"
                  component={TheDatePicker}
                  label="დედლაინი"
                />
              </div>
            </div>
            <div className="mt-20">
              <TheButton solid text="დავალების შექმნა" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTask;
