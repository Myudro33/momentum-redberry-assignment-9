import React from "react";
import {
  getPriorityBackgroundColor,
  getStatusBackgroundColor,
} from "../services/getColors";
import { getDepartmentInfo } from "../services/departmentFunctions";
import {DateFormatter} from "../services/dateFormater";
import comment from "../assets/comment-icon.png";
import { Link } from "react-router-dom";

const TheTaskCard = ({item,index}) => {
  function description(text, limit = 100) {
    return text?.length > limit ? text?.slice(0, limit) + "..." : text;
}
  return (
    <Link to={`/task/${item.id}`} >
    <div
      key={item.id}
      style={{ borderColor: getStatusBackgroundColor()[index] }}
      className="w-full my-6 rounded-[.938rem] h-[13.563rem] p-5 border "
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <div
            style={{
              borderColor: getPriorityBackgroundColor(item.priority.id),
              color: getPriorityBackgroundColor(item.priority.id),
            }}
            className="w-[5.9rem] h-[1.625rem] flex justify-center items-center border p-1 rounded-[.25rem]"
          >
            <img src={item.priority.icon} alt="priority icon" />
            <p className="text-xs">{item.priority.name}</p>
          </div>
          <p
            className="px-2 text-xs  h-6 text-white flex justify-center items-center rounded-2xl ml-2"
            style={{
              backgroundColor: getDepartmentInfo(item.department.id).color,
            }}
          >
            {getDepartmentInfo(item.department.id).name}
          </p>
        </div>
        <p className="text-xs">{DateFormatter(item.due_date)}</p>
      </div>
      <div className="mx-3 mt-5">
        <h1 className="font-bold">{item.name}</h1>
        <p className="text-[#343A40] h-8 text-xs mt-4 overflow-y-clip">
          {description(item?.description)}
        </p>
      </div>
      <div className="flex justify-between items-center w-full mt-6">
        <img
          className="w-8 h-8 rounded-full"
          src={item.employee.avatar}
          alt="avatar"
        />
        <div className="flex items-center">
          <img src={comment} alt="icon" />
          <p className="ml-1">{item.total_comments}</p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default TheTaskCard;
