import React from "react";
import BlogNav from "../blogNav/BlogNav";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateBlog from "../createBlog/CreateBlog";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./blogDiv.scss";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../atoms/user";

function Blog() {
  let user = useRecoilValue(userInfo);

  let redirect = useNavigate();
  useEffect(() => {
    if (!user.isLoggedIn) {
      redirect("../signIn");
    }
  }, [user.isLoggedIn]);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/blogs")
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div>
      <BlogNav />
      <div
        style={{
          margin: "20px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Blog Page</h1>
        <div>
          <ol>
            {blogs.map((blog) => (
              <li
                key={blog.id}
                style={{ marginLeft: "20px" }}
                className="blog-div"
              >
                <Link to={`/blogs/${blog.id}`}>
                  <h2>{blog.title}</h2>
                  <p>{blog.content.substring(0, 100)}...</p>
                  <p style={{ fontStyle: "italic", fontWeight: "700" }}>
                    Author: {blog.author}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Blog;
