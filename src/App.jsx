import React,{useState} from "react";
import TheHeader from "./components/TheHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ModalWrapper from "./components/modal/ModalWrapper";
import CreateTask from "./pages/CreateTask";

const App = () => {
  const [modal, setModal] = useState(null);
  return (
    <div className="overflow-x-hidden">

    <BrowserRouter>
      <TheHeader setModal={setModal} />
      <div className="w-screen h-24"></div>
     {modal!==null&&<ModalWrapper modal={modal} setModal={setModal} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<CreateTask setModal={setModal} />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
