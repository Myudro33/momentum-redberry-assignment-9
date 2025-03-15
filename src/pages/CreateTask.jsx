import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import TheInput from "../components/TheInput";
import { taskInitialSchema, taksValidation } from "../utils/formValidations";
import TheTextarea from "../components/TheTextarea";
import TheSelect from "../components/TheSelect";
import TheDatePicker from "../components/TheDatePicker";
import TheButton from "../components/TheButton";
import axios from "../services/axiosService";
import { useNavigate } from "react-router-dom";

const CreateTask = ({setModal}) => {
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const router = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priorities, statuses, departments, employees] = await Promise.all([
          axios({method: 'GET', endpoint: "/priorities"}),
          axios({method: 'GET', endpoint: "/statuses"}),
          axios({method: 'GET', endpoint: "/departments"}),
          axios({method: 'GET', endpoint: "/employees"}),
        ]);
        setPriorities(priorities);
        setStatuses(statuses);
        setDepartments(departments);
        setEmployees(employees);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-[7.5rem] mt-5">
      <h1 className="text-2xl font-semibold">შექმენი ახალი დავალება</h1>
      <Formik
        initialValues={taskInitialSchema}
        validationSchema={taksValidation}
        onSubmit={(values) => {
          axios({method: 'POST', endpoint: "/tasks", body: values});
          router('/')
        }}
      >
        {({
          values,
          setFieldValue,
          errors,
          handleSubmit,
          handleBlur,
          handleChange,
        }) => (
          <Form
            className="w-full flex flex-col items-end p-10 mt-5"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex justify-between">
              <div className="w-[43%] h-[25rem] flex flex-col justify-between">
                <TheInput
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  label="სათაური"
                  width="100%"
                />
                <TheTextarea
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
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
                      label="პრიორიტეტი"
                      width="47%"
                      data={priorities}
                      setFieldValue={setFieldValue}
                      defaultValue={priorities[1]}
                      setSelectedValue={setSelectedValue}
                    />
                  )}
                  {statuses?.length > 0 && (
                    <TheSelect
                      name="status_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.status_id}
                      label="სტატუსი"
                      width="47%"
                      data={statuses}
                      setFieldValue={setFieldValue}
                      defaultValue={statuses[0]}
                      setSelectedValue={setSelectedValue}
                    />
                  )}
                </div>
              </div>
              <div className="w-[43%] h-[23.6rem] flex flex-col justify-between">
                <div className="h-[12.5rem] flex flex-col justify-between">
                  <TheSelect
                    name="department_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department_id}
                    label="დეპარტამენტი"
                    width="100%"
                    data={departments}
                    setFieldValue={setFieldValue}
                    employees={employees}
                    filteredEmployees={filteredEmployees}
                    setFilteredEmployees={setFilteredEmployees}
                    setSelectedValue={setSelectedValue}
                  />
                  <TheSelect
                    name="employee_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.employee_id}
                    label="პასუხისმგებელი თანამშრომელი"
                    selectedValue={selectedValue}
                    width="100%"
                    data={filteredEmployees}
                    setFieldValue={setFieldValue}
                    setSelectedValue={setSelectedValue}
                    setModal={setModal}
                  />
                </div>
                <TheDatePicker
                  name="due_date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.due_date}
                  label="დედლაინი"
                  width="50%"
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
