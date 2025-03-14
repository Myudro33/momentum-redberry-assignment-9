import * as Yup from "yup";
const FILE_SIZE = 600 * 1024; // 600kb
import { addDays, startOfDay } from "date-fns";
const employeeInitialSchema = {
  firstName: "",
  lastName: "",
  avatar: "",
  department_id: "",
};
const taskInitialSchema = {
  name: "",
  description: "",
  due_date: "",
  status_id: "",
  employee_id: "",
  priority_id: "",
  department_id:""
};
const taksValidation = Yup.object({
  name: Yup.string()
    .required("სავალდებულო")
    .min(2, "უნდა იყის 2 სიმბოლოზე მეტი")
    .max(255, "უნდა იყოს 255 სიმბოლოზე ნაკლები"),
  description: Yup.string()
    .trim()
    .max(255, "უნდა იყოს 255 სიმბოლოზე ნაკლები")
    .test(
      "min-words",
      "შეიყვანეთ მინიმუმ 4 სიტყვა",
      (value) => !value || value.trim().split(/\s+/).length >= 4
    ),
    priority_id:Yup.string().required('სავალდებულო'),
    status_id:Yup.string().required('სავალდებულო'),
    department_id:Yup.string().required('სავალდებულო'),
    employee_id:Yup.string().required('სავალდებულო'),
    due_date:Yup.date().required('სავალდებულო')
    .typeError("არასწორი ფორმატი") 
    .min(addDays(startOfDay(new Date()), 1),'მიუთითეთ თარიღი მომავლიდან')
});

const employeeValidation = Yup.object({
  firstName: Yup.string()
    .required("სავალდებულო")
    .min(2, "უნდა იყის 2 სიმბოლოზე მეტი")
    .max(255, "უნდა იყოს 255 სიმბოლოზე ნაკლები")
    .matches(/^[a-zA-Zა-ჰ]+$/, "მხოლოდ ქართ და ინგლ სიმბოლოები"),
  lastName: Yup.string()
    .required("სავალდებულო")
    .min(2, "უნდა იყის 2 სიმბოლოზე მეტი")
    .max(255, "უნდა იყოს 255 სიმბოლოზე ნაკლები")
    .matches(/^[a-zA-Zა-ჰ]+$/, "მხოლოდ ქართ და ინგლ სიმბოლოები"),
  avatar: Yup.mixed()
    .required("ფოტო სავალდებულოა")
    .test(
      "fileSize",
      "ფოტო დიდია (მაქს. 600kb)",
      (file) => !file || file.size <= FILE_SIZE
    ),
  department_id: Yup.number().required("სავალდებულო"),
});

export { employeeValidation, employeeInitialSchema,taksValidation,taskInitialSchema };
