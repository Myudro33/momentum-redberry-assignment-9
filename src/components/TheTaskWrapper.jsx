import React, { useEffect, useState } from "react";
import getTasks from "../services/getTasks";
import TheTaskCard from "./TheTaskCard";

const TheTaskWrapper = () => {
  const [tasks, setTasks] = useState([]);
  const [priority1Tasks, setPriority1Tasks] = useState([]);
  const [priority2Tasks, setPriority2Tasks] = useState([]);
  const [priority3Tasks, setPriority3Tasks] = useState([]);
  const [priority4Tasks, setPriority4Tasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const tasks = await getTasks();
        setPriority1Tasks(tasks.filter((task) => task.status.id === 1));
        setPriority2Tasks(tasks.filter((task) => task.status.id === 2));
        setPriority3Tasks(tasks.filter((task) => task.status.id === 3));
        setPriority4Tasks(tasks.filter((task) => task.status.id === 4));
        setTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getData();
  }, []);
  return (
    <div className="w-screen px-[7.5rem] flex justify-between">
      <div className="w-[20rem]">
        {priority1Tasks.map((item) => (
         <TheTaskCard key={item.id} item={item} index={0} />
        ))}
      </div>
      <div className="w-[20rem]">
        {priority2Tasks.map((item) => (
         <TheTaskCard key={item.id} item={item} index={1} />
        ))}
      </div>
      <div className="w-[20rem]">
        {priority3Tasks.map((item) => (
         <TheTaskCard key={item.id} item={item} index={2} />
        ))}
      </div>
      <div className="w-[20rem]">
        {priority4Tasks.map((item) => (
         <TheTaskCard key={item.id} item={item} index={3} />
        ))}
      </div>
    </div>
  );
};

export default TheTaskWrapper;
