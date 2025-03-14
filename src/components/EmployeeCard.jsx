import React from "react";

const EmployeeCard = ({ avatar, name, surname ,props}) => {
  return (
    props.name === "employee_id" &&
    avatar && (
      <>
        <img className="w-6 h-6 mr-2 rounded-full" src={avatar} alt="avatar" />
        {name} {surname && surname}
      </>
    )
  );
};

export default EmployeeCard;
