import React from "react";

const Form = () => {
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

export default Form;
