import React,{useState} from "react";
import TheHeader from "./components/TheHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ModalWrapper from "./components/modal/ModalWrapper";
import CreateTask from "./pages/CreateTask";
import Task from "./pages/Task";

const App = () => {
  const [modal, setModal] = useState(null);
  const [employees, setEmployees] = useState([]);
  return (
    <div className="overflow-x-hidden">

    <BrowserRouter>
      <TheHeader setModal={setModal} />
      <div className="w-screen h-24"></div>
     {modal!==null&&<ModalWrapper setEmployees={setEmployees} employees={employees} modal={modal} setModal={setModal} />}
      <Routes>
        <Route path="/" element={<Home employees={employees} setEmployees={setEmployees} />} />
        <Route path="/task" element={<CreateTask employees={employees} setEmployees={setEmployees} modal={modal} setModal={setModal} />} />
        <Route path="/task/:id" element={<Task/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
