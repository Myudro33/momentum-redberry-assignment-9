import React, { useState } from "react";
import arrow from "../assets/left-arrow.png";
import CommentTextarea from "./CommentTextarea";

const TheComment = ({
  author_avatar,
  author_nickname,
  text,
  id,
  parent_id,
  subcoments,
  setComments,
  comments,
}) => {
  const [textarea, setTextarea] = useState(false);
  return (
    <div className="w-full flex mt-6">
      <img
        className="w-9 h-9 rounded-full mr-2"
        src={author_avatar}
        alt="avatar"
      />
      <div className="w-full">
        <h1 className="text-lg">{author_nickname}</h1>
        <p className="text-[color:var(--gray)]"> {text}</p>
        <div
          onClick={() => setTextarea(true)}
          className="flex items-center text-[color:var(--solid-button)] cursor-pointer mt-2"
        >
          <img className="mr-2" src={arrow} alt="arrow" />
          უპასუხე
        </div>
        <div className="mt-2">
          {subcoments?.map((item) => (
            <div key={item.id} className="flex">
              <img
                className="w-9 h-9 rounded-full mr-2"
                src={item.author_avatar}
                alt="avatar"
              />
              <div className="">
                <h1 className="text-lg">{item.author_nickname}</h1>
                <p className="text-[color:var(--gray)]"> {item.text}</p>
              </div>
            </div>
          ))}
        </div>
        {textarea && (
          <CommentTextarea
            comments={comments}
            setComments={setComments}
            setTextarea={setTextarea}
            id={id}
            style={{ width: "100%", marginTop: "10px" }}
            parent_id={parent_id}
          />
        )}
      </div>
    </div>
  );
};

export default TheComment;
