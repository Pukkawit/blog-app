import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Portfolio from "./components/portfolio/Portfolio";
import Blog from "./components/blog/Blog";
import { Routes } from "react-router-dom";
import Error_URL from "./components/error_URL/Error_URL";
import BlogDetails from "./components/blogDetails/BlogDetails";
import CreateBlog from "./components/createBlog/CreateBlog";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import Cart from "./components/cart/Cart";

function App() {
  let [cart, setCart] = useState(0);
  return (
    <>
      <Nav /* cart={cart} */ />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/creatBlog" element={<CreateBlog />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Signout" element={<CreateBlog />} />
          <Route path="/" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="*" element={<Error_URL />} />
          {/* <Route path="/cart" element={<Cart setCart={setCart} />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
