import React, { useState, useEffect } from "react";
import TheFilter from "../components/filter/TheFilter";
import TheWrapper from "../components/TheWrapper";
import axios from "../services/axiosService";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const tasks = await axios({ endpoint: "/tasks", method: "GET" });
        setTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getData();
  }, []);
  return (
    <>
      <div className="px-[7.5rem] mt-6">
        <h1 className="text-[2.1rem] font-semibold">დავალებების გვერდი</h1>
        <TheFilter tasks={tasks} />
      </div>
      <TheWrapper tasks={tasks} />
    </>
  );
};

export default Home;
