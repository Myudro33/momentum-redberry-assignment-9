import React, { useEffect, useState } from "react";
import closeIcon from "../../assets/close-icon.png";
import TheInput from "../TheInput";
import FileUploadInput from "../FileUploadInput";
import TheSelect from "../TheSelect";
import TheButton from "../TheButton";
import getDepartments from "../../services/getDepartments";

const EmployeeModal = ({ setModal }) => {
  const [image, setImage] = useState(null);
  const [departments, setDepartments] = useState([]);
  useEffect(()=>{
    const getData = async () => {
        try {
          const departments = await getDepartments();
          setDepartments(departments);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
      getData();
  },[])
  return (
    <div className="w-[57.063rem] h-[47.875rem] rounded-xl bg-white shadow-xs flex flex-col pt-10 pb-14 px-12">
      <div className="w-full flex justify-end">
        <img
          onClick={() => setModal(null)}
          className="cursor-pointer"
          src={closeIcon}
          alt="closeicon"
        />
      </div>
      <h1 className="text-center text-[2rem] mt-5 font-semibold">
        თანამშრომლის დამატება
      </h1>
      <div className="mt-8 w-full">
        <div className="flex justify-between">
          <TheInput label="სახელი" />
          <TheInput label="გვარი" />
        </div>
        <FileUploadInput image={image} setImage={setImage} />
      </div>
      <TheSelect data={departments} style="3rem" label="დეპარტამენტი" />
      <div className="flex justify-end mt-20">
        <div className="w-[24rem] flex justify-between">
          <TheButton onClick={() => setModal(null)} text="გაუქმება" />
          <TheButton solid text="დაამატე თანამშრომელი" />
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
