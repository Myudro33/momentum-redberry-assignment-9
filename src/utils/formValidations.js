import * as Yup from "yup";
const FILE_SIZE = 600 * 1024; // 600kb
const employeeInitialSchema = {
  firstName: "",
  lastName: "",
  avatar: "",
  department_id: "",
};

const employeeValidation = Yup.object({
  firstName: Yup.string()
    .required("სავალდებულო")
    .min(2, "უნდა იყის 2 სიმბოლოზე მეტი")
    .max(255, "უნდა იყოს 15 სიმბოლოზე ნაკლები")
    .matches(/^[a-zA-Zა-ჰ]+$/, "მხოლოდ ქართ და ინგლ სიმბოლოები"),
  lastName: Yup.string()
    .required("სავალდებულო")
    .min(2, "უნდა იყის 2 სიმბოლოზე მეტი")
    .max(255, "უნდა იყოს 15 სიმბოლოზე ნაკლები")
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

export { employeeValidation, employeeInitialSchema };
