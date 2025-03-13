import React, { useRef, useState } from "react";
import gallery from "../assets/gallery.png";
import trashIcon from "../assets/trash-icon.png";

const ProfilePhotoSelector = (props) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      props.setImage(file);
      props.setFieldValue('avatar',file)
    }
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };
  const handleRemoveImage = () => {
    props.setImage(null);
    setPreviewUrl(null);
    props.setFieldValue('avatar',null)
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };
  return (
    <div className="mt-10 h-[8rem]">
    <label className="font-semibold text-sm">ავატარი *</label>
    <div className="flex h-[7.5rem] items-center  justify-center  rounded-lg border border-[color:var(--border-color)] border-dotted">
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
          className="w-full h-full  flex items-center justify-center  relative"
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
    <p className="text-red-500">{props.error}</p>
    </div>
  );
};

export default ProfilePhotoSelector;
