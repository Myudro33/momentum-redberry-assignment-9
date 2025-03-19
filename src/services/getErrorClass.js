import checkRed from "../assets/check-red.png";
import checkGreen from "../assets/check-green.png";
import checkGray from "../assets/check-gray.png";

const getErrorClass = (errorMessage, errors, touched, field) => {
  if (errors[field] === errorMessage || (errors[field] === "სავალდებულო" && touched[field])) {
    return { className: "text-[var(--red)]", icon: checkRed };
  } else if (touched[field]) {
    return { className: "text-[var(--green)]", icon: checkGreen };
  } else {
    return { className: "text-[var(--gray)]", icon: checkGray };
  }
};

export default getErrorClass;