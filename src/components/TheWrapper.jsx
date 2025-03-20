import React, { useEffect } from "react";
import { getStatusBackgroundColor } from "../services/getColors";
import TheTaskWrapper from "./TheTaskWrapper";
import { useMyContext } from "../context";

const TheWrapper = ({ tasks }) => {
  const { statuses } = useMyContext();

  return (
    <>
      <div className="mt-4 w-screen px-[7.5rem] flex justify-between">
        {statuses?.map((item) => (
          <div
            key={item.id}
            style={{ backgroundColor: getStatusBackgroundColor()[item.id - 1] }}
            className={`w-[19rem] rounded-xl text-xl text-white flex items-center justify-center h-[3.375rem]`}
          >
            {item.name}
          </div>
        ))}
      </div>
      <TheTaskWrapper tasks={tasks} />
    </>
  );
};

export default TheWrapper;
