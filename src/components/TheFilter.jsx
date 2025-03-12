import React from "react";
import arrow from "../assets/arrow-down.png";

const TheFilter = () => {
  return (
    <div className="w-[43rem] px-6 h-[2.75rem] mt-8 flex justify-between rounded-[.625rem] border border-[color:var(--light-border)]">
      <p className="flex items-center">
        დეპარტამენტი <img className="ml-2" src={arrow} alt="arrow down" />{" "}
      </p>
      <p className="flex items-center">
        პრიორიტეტი <img className="ml-2" src={arrow} alt="arrow down" />{" "}
      </p>
      <p className="flex items-center">
        თანამშრომელი <img className="ml-2" src={arrow} alt="arrow down" />{" "}
      </p>
    </div>
  );
};

export default TheFilter;
