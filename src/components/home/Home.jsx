import React from "react";
import Cart from "../cart/Cart";
import "./home.scss";
import { atomCart, cartAmount } from "../../atoms/cart";
import { useRecoilValue } from "recoil";
import useGetInitials from "../../customHooks/getInitials";

const Home = () => {
  const amountInCart = useRecoilValue(cartAmount);
  let { initials, fullName } = useGetInitials("Pukkawit's", "Blog");

  return (
    <div className="homeStyle">
      <div className="cart">
        <Cart />
      </div>
      <div>
        <p className="cart-amount">
          The amount in the cart is:
          <span className="amount"> N{amountInCart}</span>
        </p>
        <p style={{ textAlign: "center" }}>
          The Full name of this blog is {fullName}, and the Initials of this
          blog is <span style={{ fontWeight: "bold" }}>{initials}</span>
        </p>
      </div>
      <hr />
      <div>
        <h1>Welcome to Our Blog Haven!</h1>
        <p>
          Enter into a world of captivating stories, insightful articles, and
          engaging content crafted just for you. At Pukkawit's Blog, we
          specialize in delivering blog posts that entertain, inform, and
          inspire.
        </p>
        <p>
          Whether you're looking for the latest trends, expert tips, or
          heartwarming tales, our skilled writers have you covered. Explore our
          diverse topics and let us take you on a journey through the art of
          storytelling. Your next favorite read is just a click away!
        </p>
        <h2>Discover a Variety of Topics</h2>
        <p>
          Our blog covers a wide range of subjects to cater to all interests.
          From travel adventures and culinary delights to tech innovations and
          wellness tips, there’s something here for everyone. Our dedicated team
          of writers ensures each post is rich in quality and packed with
          valuable insights.
        </p>
        <h2>Engage with Our Community</h2>{" "}
        <p>
          Join our vibrant community of readers and engage in thoughtful
          discussions. Share your thoughts in the comments, connect with
          like-minded individuals, and be part of a space where ideas flourish.
          Your voice matters, and we love hearing from you!
        </p>
        <h2>Stay Updated</h2>
        <p>
          Never miss out on our latest posts by subscribing to our newsletter.
          Get updates delivered straight to your inbox, so you’re always in the
          loop with the newest content. Follow us on social media for real-time
          updates and sneak peeks into what’s coming next.
        </p>
        <h2>Your Journey Starts Here</h2>{" "}
        <p>
          Whether you’re here for a quick read or a deep dive into a topic,
          Pukkawit is your go-to source for high-quality blog posts. Sit back,
          relax, and enjoy exploring our collection. Your next great read is
          just a scroll away.
        </p>
      </div>
    </div>
  );
};

export default Home;
