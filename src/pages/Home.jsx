import React from "react";
import TheFilter from "../components/TheFilter";
import TheWrapper from "../components/TheWrapper";

const Home = () => {
  return (
    <>
      <div className="px-[7.5rem] mt-6">
        <h1 className="text-[2.1rem] font-semibold">დავალებების გვერდი</h1>
        <TheFilter />
      </div>
      <TheWrapper />
    </>
  );
};

export default Home;
