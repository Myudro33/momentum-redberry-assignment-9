import React, { useEffect, useState } from "react";
import axios from "../services/axiosService";
import { getStatusBackgroundColor } from "../services/getColors";
import TheTaskWrapper from "./TheTaskWrapper";

const TheWrapper = ({ tasks }) => {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const statuses = await axios({ endpoint: "/statuses", method: "GET" });
        setStatuses(statuses);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="mt-4 w-screen px-[7.5rem] flex justify-between">
        {statuses.map((item) => (
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
