import React, { useEffect, useState } from "react";
import closeIcon from "../../assets/close-icon.png";
import TheInput from "../TheInput";
import FileUploadInput from "../FileUploadInput";
import TheSelect from "../TheSelect";
import TheButton from "../TheButton";
import axios from "../../services/axiosService";
import { Formik, Form, Field } from "formik";
import {
  employeeValidation,
  employeeInitialSchema,
} from "../../utils/formValidations";
import addEmployee from "../../api/addEmployee";

const EmployeeModal = ({ setModal, employees, setEmployees }) => {
  const [image, setImage] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [dropdown, setDropdown] = useState(null);
  const handleDropdownToggle = (name) => {
    setDropdown((prev) => (prev === name ? null : name));
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const departments = await axios({
          endpoint: "/departments",
          method: "GET",
        });
        setDepartments(departments);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    getData();
  }, []);
  return (
    <Formik
      initialValues={employeeInitialSchema}
      validationSchema={employeeValidation}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={async (values) => {
        const user = await addEmployee(values);
        setEmployees([...employees, user]);
        setModal(null);
      }}
    >
      {({
        values,
        setFieldValue,
        errors,
        touched,
        handleSubmit,
        handleBlur,
        handleChange,
      }) => (
        <div className="w-[57.063rem] h-[47.875rem] rounded-xl bg-white shadow-xs flex flex-col pt-10 pb-14 px-12">
          <div className="w-full flex justify-end">
            <img
              onClick={() => setModal(null)}
              className="cursor-pointer"
              src={closeIcon}
              alt="closeicon"
            />
          </div>
          <h1 className="text-center text-[2rem] mt-5 font-semibold">
            თანამშრომლის დამატება
          </h1>
          <Form onSubmit={handleSubmit}>
            <div className="mt-8 w-full mb-12">
              <div className="flex justify-between">
                <Field name="firstName" component={TheInput} label="სახელი" />
                <Field name="lastName" component={TheInput} label="გვარი" />
              </div>
              <FileUploadInput
                name="avatar"
                onChange={handleChange}
                onBlur={handleBlur}
                setFieldValue={setFieldValue}
                value={values.avatar}
                image={image}
                setImage={setImage}
                errors={errors.avatar}
                touched={touched.avatar}
              />
            </div>
            <TheSelect
              name="department_id"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.department_id}
              data={departments}
              style="3rem"
              label="დეპარტამენტი *"
              setFieldValue={setFieldValue}
              setSelectedValue={setSelectedValue}
              errors={errors.department_id}
              touched={touched.department_id}
              dropdown={dropdown}
              setDropdown={handleDropdownToggle}
            />
            <div className="flex justify-end mt-20">
              <div className="w-[24rem] flex justify-between">
                <TheButton
                  type="button"
                  onClick={() => setModal(null)}
                  text="გაუქმება"
                />
                <TheButton type="submit" solid text="დაამატე თანამშრომელი" />
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default EmployeeModal;
