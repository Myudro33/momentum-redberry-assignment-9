import React from "react";
import { useNavigate } from "react-router-dom";
import TheButton from "../components/TheButton";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl my-4">გვერდი არ მოიძებნა :(</h1>
      <TheButton solid text="დაბრუნება" onClick={() => navigate("/")} />
    </div>
  );
};

export default NotFound;
