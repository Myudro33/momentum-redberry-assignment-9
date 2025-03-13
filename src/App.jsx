import React,{useState} from "react";
import TheHeader from "./components/TheHeader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ModalWrapper from "./components/modal/ModalWrapper";

const App = () => {
  const [modal, setModal] = useState('employee');
  return (
    <div className="overflow-x-hidden">
    <BrowserRouter>
      <TheHeader />
     {modal!==null&&<ModalWrapper modal={modal} setModal={setModal} />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
