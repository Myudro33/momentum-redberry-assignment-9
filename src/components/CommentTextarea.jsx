import React, { useState } from "react";
import TheButton from "../components/TheButton";
import axios from "../services/axiosService";

const CommentTextarea = ({
  id,
  parent,
  comments,
  setComments,
  parent_id,
  style,
  setTextarea,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState();
  const click = async () => {
    try {
      if (!value.trim()) {
        setError("სავალდებულო");
        return;
      }
      setError('')
      const newComment = await axios({
        endpoint: `/tasks/${id}/comments`,
        method: "POST",
        body: parent_id ? { text: value, parent_id } : { text: value },
      });
      if (parent) {
        setComments([newComment, ...comments]);
      } else {
        setComments((comments) =>
          comments.map((comment) =>
            comment.id === newComment.parent_id
              ? {
                  ...comment,
                  sub_comments: [...(comment.sub_comments || []), newComment]
                }
              : comment
          )
        );
        setTextarea(false);
      }
      setValue("");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div style={style} className={`relative w-full h-32 pb-14 bg-white rounded-md border border-[var(--gray-border)] ${error&&'border border-red-500'} `}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="resize-none w-full h-full p-2 outline-none"
        />
        <TheButton
          onClick={click}
          style={{ position: "absolute", bottom: 10, right: 10 }}
          type="submit"
          rounded
          solid
          text="დააკომენტარე"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default CommentTextarea;
