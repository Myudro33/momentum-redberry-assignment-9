import React,{useEffect} from 'react'
import EmployeeModal from './EmployeeModal';

const ModalWrapper = ({modal,setModal}) => {
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
    <div onClick={handleBackdropClick} className='w-full top-0 z-20 h-screen bg-[#0D0F1026] absolute flex justify-center items-center'>
      {modal&&<EmployeeModal setModal={setModal} />}
    </div>
  )
}

export default ModalWrapper
