import React from "react";
import { Formik, Form } from "formik";
import TheInput from "../components/TheInput";
import { taskInitialSchema, taksValidation } from "../utils/formValidations";
import TheTextarea from "../components/TheTextarea";
import TheSelect from "../components/TheSelect";
import TheDatePicker from "../components/TheDatePicker";
import TheButton from "../components/TheButton";
const CreateTask = () => {
  return (
    <div className="px-[7.5rem] mt-5">
      <h1 className="text-2xl font-semibold">შექმენი ახალი დავალება</h1>
      <Formik
        initialValues={taskInitialSchema}
        validationSchema={taksValidation}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
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
            className="w-full flex flex-col items-end p-10  mt-5"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex justify-between">
              <div className="w-[43%] h-[25rem] flex flex-col justify-between ">
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
                <div className="flex w-full justify-between mt-28 ">
                  <TheSelect
                    name="priority_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.priority_id}
                    label="პრიორიტეტი"
                    width="47%"
                  />
                  <TheSelect
                    name="status_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status_id}
                    label="სტატუსი"
                    width="47%"
                  />
                </div>
              </div>
              <div className="w-[43%] h-[25rem]  flex flex-col justify-between">
                <div className="h-[12rem] flex flex-col justify-between ">
                  <TheSelect
                    name="department_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.department_id}
                    label="დეპარტამენტი"
                    width="100%"
                  />
                  <TheSelect
                    name="employee_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.employee_id}
                    label="პასუხისმგებელი თანამშრომელი"
                    width="100%"
                  />
                </div>
                <TheDatePicker
                  name="due_date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.due_date}
                  label="დეპარტამენტი"
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
