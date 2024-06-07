import React from "react";
import { Link } from "react-router-dom";
import "./blogNav.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo } from "../../atoms/user";
const BlogNav = () => {
  let [user, setUser] = useRecoilState(userInfo);

  function handleSignout() {
    setUser({ isLoggedIn: false, data: {} });
  }
  return (
    <div>
      <ul className="blog-nav-content">
        <li style={{ display: user.data.role != "admin" ? "none" : "flex" }}>
          <Link to="/creatBlog">Create Blog</Link>
        </li>
        <li style={{ display: user.isLoggedIn ? "none" : "flex" }}>
          <Link to="/Signin">Sign In</Link>
        </li>
        <li style={{ display: user.isLoggedIn ? "none" : "flex" }}>
          <Link to="/Signup">Sign Up</Link>
        </li>
        <li style={{ display: user.isLoggedIn ? "flex" : "none" }}>
          <Link onClick={handleSignout} to="#">
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogNav;
