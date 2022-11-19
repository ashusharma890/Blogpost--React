import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const Homepage = ({ isAuth }) => {
  let navigate = useNavigate();
  const [postLists, setPostLists] = useState([]);
  const postCollectionRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postCollectionRef);
    setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    await getPosts();
  };

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <>
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      {" "}
                      &#128465;{" "}
                    </button>
                    <button
                      onClick={() => {
                        // updatePost(post.id);
                        navigate("/createpost", {
                          state: {
                            id: "edit",
                            docId: post.id,
                          },
                        });
                      }}
                    >
                      {" "}
                      &#x270E;{" "}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>@{post.author?.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
