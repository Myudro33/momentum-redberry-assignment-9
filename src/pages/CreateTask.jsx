import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import TheInput from "../components/TheInput";
import { taskInitialSchema, taksValidation } from "../utils/formValidations";
import TheTextarea from "../components/TheTextarea";
import TheSelect from "../components/TheSelect";
import TheDatePicker from "../components/TheDatePicker";
import TheButton from "../components/TheButton";
import { useNavigate } from "react-router-dom";
import addTask from "../api/addTask";
import { useMyContext } from "../context";

const CreateTask = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdown, setDropdown] = useState(null);
  const [disableSelect, setDisableSelect] = useState(true);
  const { priorities, statuses, departments, tasks, setTasks } = useMyContext();
  const handleDropdownToggle = (name) => {
    setDropdown((prev) => (prev === name ? null : name));
  };
  const router = useNavigate();
  useEffect(() => {
    if (!selectedValue && !localStorage.getItem("department_id")) {
      setDisableSelect(false);
    } else {
      setDisableSelect(true);
    }
  }, [selectedValue]);

  return (
    <div className="px-[7.5rem] mt-5">
      <h1 className="text-2xl font-semibold">შექმენი ახალი დავალება</h1>
      <Formik
        initialValues={taskInitialSchema}
        validationSchema={taksValidation}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={async (values) => {
          const newTask = await addTask(values);
          setTasks([...tasks, newTask]);
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
                <div className="flex w-full justify-between mt-36 ">
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
              <div className="w-[43%] h-[27.4rem] flex flex-col justify-between">
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
                    filteredEmployees={filteredEmployees}
                    setFilteredEmployees={setFilteredEmployees}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    errors={errors.department_id}
                    touched={touched.department_id}
                    store
                    dropdown={dropdown}
                    setDropdown={handleDropdownToggle}
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
                    errors={errors.employee_id}
                    touched={touched.employee_id}
                    store
                    dropdown={dropdown}
                    setDropdown={handleDropdownToggle}
                    disabled={disableSelect}
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
