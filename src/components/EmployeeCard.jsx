import React from "react";

const EmployeeCard = ({ avatar, name, surname, page, department }) => {
  return (
    <>
      {page === "filter" && avatar && (
        <div className="flex items-center">
          <img
            className="w-6 h-6 mr-2 rounded-full"
            src={avatar}
            alt="avatar"
          />
          {name} {surname && surname}
        </div>
      )}
      {page === "employee_id" && avatar && (
        <>
          <img
            className="w-6 h-6 mr-2 rounded-full"
            src={avatar}
            alt="avatar"
          />
          {name} {surname && surname}
        </>
      )}
      {page === "task" && (
        <div className="flex items-center w-[55%] ">
          <img
            className="w-6 h-6 mr-2 rounded-full"
            src={avatar}
            alt="avatar"
          />
          <div>
            <p className="text-xs">{department}</p>
            <p className="text-black text-sm">
              {name} {surname}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeCard;
