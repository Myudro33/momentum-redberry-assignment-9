import React, { useEffect } from "react";
import EmployeeModal from "./EmployeeModal";

const ModalWrapper = ({ modal, setModal, employees, setEmployees }) => {
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
