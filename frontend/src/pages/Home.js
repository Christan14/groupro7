import React, { useEffect, useState } from "react";
import Post from "../components/post";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let userAuth = JSON.parse(localStorage.getItem("userAuth"));

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [imgfile, uploadimg] = useState([]);
  const [post, setPost] = useState("");

  const formData = new FormData();
  formData.apprend("post_image", imgfile);
  formData.apprend("message", post);
  formData.apprend("posterId", userAuth ? userAuth._id : userAuth);
  console.log(formData);

  function imgFilehandler(e) {
    return uploadimg(e.target.files[0]);
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/posts", {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log({ error: err });
      });
  }, []);

  const postIn = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/posts/", {
      method: "POST",
      body: formData,
      withCredentials: true,
      credentials: "same-origin",
    })
      .then((data) => {
        alert("Your post has been successfully posted.");
        navigate(0);
        console.log(data);
      })
      .catch((err) => {
        console.log({ error: err });
      });
  };

  return (
    <div className="container profile-page">
      <div className="row center-profil">
        <div className="col-xl-6 col-lg-7 col-md-12">
          {userAuth ? (
            <div>
              <form onSubmit={postIn} encType="multipart/form-data">
                <h1>The Wall</h1>
                <div className="form-group row">
                  <label htmCRLFor="message" className="col-4 col-form-label">
                    Message
                  </label>
                  <div className="col-8">
                    <textarea
                      id="message"
                      name="message"
                      cols="40"
                      rows="5"
                      className="form-control"
                      defaultValue={post}
                      onChange={(event) => setPost(event.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmCRLFor="picture" className="col-4 col-form-label">
                    Picture
                  </label>
                  <div className="col-8">
                    <input
                      id="picture"
                      name="post_image"
                      type="file"
                      className="form-control"
                      onChange={imgFilehandler}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-4 col-8">
                    <button
                      name="submit"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
              {posts.map((post) => (
                <Post
                  key={post._id}
                  idPost={post._id}
                  posterId={post.posterId}
                  message={post.message}
                  picture={post.picture}
                  comments={post.comments}
                  likers={post.likers}
                  time={post.createdAt}
                />
              ))}
            </div>
          ) : (
            <div>
              <h1>The Wall</h1>
              {posts.map((post) => (
                <Post
                  key={post._id}
                  posterId={post.posterId}
                  message={post.message}
                  picture={post.picture}
                  comments={post.comments}
                  likers={post.likers}
                  time={post.createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
