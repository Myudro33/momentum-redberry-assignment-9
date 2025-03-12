import React from "react";
import TheFilter from "../components/TheFilter";
import TheTaskWrapper from "../components/TheTaskWrapper";

const Home = () => {
  return (
    <>
      <div className="w-screen h-24"></div>
      <div className="px-[7.5rem] mt-6">
        <h1 className="text-[2.1rem] font-semibold">დავალებების გვერდი</h1>
        <TheFilter />
      </div>
      <TheTaskWrapper />
    </>
  );
};

export default Home;
