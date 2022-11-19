import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const UpdatePost = ({ id }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  let navigate = useNavigate();

  const postCollectionRef = collection(db, "posts");

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Update Post</h1>
        <div className="inputGp">
          <label htmlFor="">Title:</label>
          <input
            type="text"
            placeholder="Enter Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="">Post:</label>
          <textarea
            placeholder="Enter your post"
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          />
        </div>
        <button onClick={createPost}>Update Post</button>
      </div>
    </div>
  );
};

export default UpdatePost;
