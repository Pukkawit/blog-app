import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./blogDetails.scss";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reDirect = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/blogs/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="blogDetails">
      <p className="backArrowStyle" onClick={() => reDirect("/blog")}>
        &#8592;
      </p>
      <p className="author">
        Author: <span className="name">{blog.author}</span>
      </p>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}

export default BlogDetails;
