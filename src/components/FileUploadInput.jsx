import React, { useRef, useState } from "react";
import gallery from "../assets/gallery.png";
import trashIcon from "../assets/trash-icon.png";
import checkRed from '../assets/check-red.png'
import { ErrorMessage } from "formik";

const FileUploadInput = (props) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      props.setImage(file);
      props.setFieldValue('avatar', file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    props.setImage(null);
    setPreviewUrl(null);
    props.setFieldValue('avatar', null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const hasError = props.errors;
  const borderColor = hasError ? 'red' : (props.touched ? 'green' : 'var(--gray-border)');

  return (
    <div className="mt-10 h-[8rem]">
      <label className="font-semibold text-sm">ავატარი *</label>
      <div
        className="flex h-[7.5rem] items-center justify-center rounded-lg border border-dotted"
        style={{ borderColor }}
      >
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        {!props.image ? (
          <div
            onClick={onChooseFile}
            className="w-full h-full flex items-center justify-center relative"
          >
            <button
              className="w-56 h-20 flex flex-col items-center justify-center rounded-full absolute"
              type="button"
            >
              ატვირთეთ ფოტო
              <img src={gallery} alt="galleryicon" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={previewUrl}
              alt="profilepic"
            />
            <button
              className="w-8 h-8 flex items-center justify-center text-white rounded-full absolute -bottom-2 -right-2"
              type="button"
              onClick={handleRemoveImage}
            >
              <img className="cursor-pointer" src={trashIcon} alt="trashicon" />
            </button>
          </div>
        )}
      </div>
      <p className="text-red-500 h-10 flex items-center">
             {hasError && (
               <img className="shrink-0 mr-1" src={checkRed} alt="check" />
             )}
             <ErrorMessage name={props.name} />
           </p>
    </div>
  );
};

export default FileUploadInput;
