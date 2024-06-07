import { atom, selector } from "recoil";

export const atomCart = atom({
  key: "atomCart",
  default: 0,
});

let amount = 230;

export const cartAmount = selector({
  key: "cartAmount",
  get: ({ get }) => {
    const cartValue = get(atomCart);

    return cartValue * amount;
  },
});
