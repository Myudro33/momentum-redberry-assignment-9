import React from "react";

const EmployeeCard = ({ avatar, name, surname, props }) => {
  return (
    <>
      {props.name === "employee_id" && avatar && (
        <>
          <img className="w-6 h-6 mr-2 rounded-full" src={avatar} alt="avatar" />
          {name} {surname && surname}
        </>
      )}
      {props.name === 'task' && (
        <div className="flex justify-between items-center w-[55%] ">
          <img  className="w-6 h-6 mr-2 rounded-full" src={avatar} alt="avatar" />
          <div>
          <p className="text-xs">{props.department}</p>
          <p className="text-black">{name} {surname}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeCard;
