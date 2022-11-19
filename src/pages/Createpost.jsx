import React, { useEffect, useState } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate, useLocation } from "react-router-dom";

const Createpost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const postCollectionRef = collection(db, "posts");

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  const updatePost = async (id) => {
    const itemRef = doc(db, "posts", id);
    await updateDoc(itemRef, {
      title,
      postText,
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  console.log(location.state);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        {location.state === null ? (
          <h1>Create a Post</h1>
        ) : (
          <h1>Edit the Post</h1>
        )}
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
        <button
          onClick={
            location.state === null
              ? () => createPost
              : () => updatePost(location.state.docId)
          }
        >
          Submit Post
        </button>
      </div>
    </div>
  );
};

export default Createpost;
