import React, { useEffect, useState } from "react";
import TheHeader from "./components/TheHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ModalWrapper from "./components/modal/ModalWrapper";
import CreateTask from "./pages/CreateTask";
import Task from "./pages/Task";
import NotFound from "./pages/NotFound";
import { useMyContext } from "./context";

const App = () => {
  const { fetchData, loading } = useMyContext();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <TheHeader />
        <div className="w-screen h-24"></div>
        <ModalWrapper />
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <div className="w-full h-80 flex items-center justify-center text-3xl">
                  loading...
                </div>
              ) : (
                <Home />
              )
            }
          />
          <Route path="/task" element={<CreateTask />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
