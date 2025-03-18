import React,{useEffect} from 'react'
import EmployeeModal from './EmployeeModal';

const ModalWrapper = ({modal,setModal,employees,setEmployees}) => {
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
          setModal(null)
        }
      };
  return (
    <div 
      onClick={handleBackdropClick} 
      className='w-full top-0 z-60 h-screen bg-[#0D0F1026] fixed flex justify-center items-center'
      style={{ position: 'fixed', top: 0, left: 0 }}
    >
      {modal && <EmployeeModal employees={employees} setEmployees={setEmployees} setModal={setModal} />}
    </div>
  )
}

export default ModalWrapper
