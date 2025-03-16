import React from "react";
import TheTaskCard from "./TheTaskCard";

const TheTaskWrapper = ({ tasks }) => {
  const setData = (id) => {
    return tasks.filter((task) => task.status.id === id);
  };
  return (
    <div className="w-screen px-[7.5rem] flex justify-between ">
      <div className="w-[19rem]">
        {setData(1).map((item) => (
          <TheTaskCard key={item.id} item={item} index={0} />
        ))}
      </div>
      <div className="w-[19rem]">
        {setData(2).map((item) => (
          <TheTaskCard key={item.id} item={item} index={1} />
        ))}
      </div>
      <div className="w-[19rem]">
        {setData(3).map((item) => (
          <TheTaskCard key={item.id} item={item} index={2} />
        ))}
      </div>
      <div className="w-[19rem]">
        {setData(4).map((item) => (
          <TheTaskCard key={item.id} item={item} index={3} />
        ))}
      </div>
    </div>
  );
};

export default TheTaskWrapper;
