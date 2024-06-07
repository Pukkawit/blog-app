import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { atomCart } from "../../atoms/cart";

const Cart = () => {
  const [cart, setCart] = useRecoilState(atomCart);
  return (
    <div style={{ display: "flex", columnGap: "15px" }}>
      <button onClick={() => setCart((previousValue) => previousValue + 1)}>
        + Add to Cart
      </button>
      <button
        onClick={() =>
          setCart((previousValue) =>
            !previousValue <= 0 ? previousValue - 1 : (previousValue = 0)
          )
        }
      >
        - Remove from Cart
      </button>
    </div>
  );
};

export default Cart;
