import React, { useEffect } from "react";
import EmployeeModal from "./EmployeeModal";
import { useMyContext } from "../../context";

const ModalWrapper = () => {
  const { modal, setModal, employees, setEmployees } = useMyContext();

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setModal(null);
    }
  };

  if (modal === null) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="w-full top-0 z-60 h-screen fixed flex justify-center items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(13, 15, 16, 0.15)",
        backdropFilter: "blur(4px)",
      }}
    >
      <p>Modal Content: {modal}</p>
      <button onClick={() => setModal(null)}>Close Modal</button>
      {modal && (
        <EmployeeModal
          employees={employees}
          setEmployees={setEmployees}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default ModalWrapper;
