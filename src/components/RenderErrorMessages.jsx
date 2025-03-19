import React from "react";
import getErrorClass from "../services/getErrorClass";

const RenderErrorMessages = ({errorMessage,errors,touched,fieldName}) => {
  const { className, icon } = getErrorClass(
    errorMessage,
    errors,
    touched,
    fieldName
  );
  return (
    <p className={`flex text-xs items-center ${className}`}>
      <img className="mr-1 shrink-0" src={icon} alt="check" /> {errorMessage}
    </p>
  );
};

export default RenderErrorMessages;
