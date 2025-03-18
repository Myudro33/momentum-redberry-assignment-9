import React from "react";

const TheButton = ({ onClick, style, type, rounded, solid, text }) => {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className={`py-2.5 px-5  cursor-pointer   ${
        solid
          ? "bg-[color:var(--purple)] hover:bg-[color:var(--light-purple)]  text-white"
          : "border border-[color:var(--purple)] hover:border-[color:var(--light-purple)] "
      } ${rounded ? "rounded-[1.3rem]" : "rounded-[.3rem]"} `}
    >
      {text}
    </button>
  );
};

export default TheButton;
