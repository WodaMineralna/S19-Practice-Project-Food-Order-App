import { use } from "react";

import { CartContext } from "../store/cart-context";

export default function Meal({ id, name, price, description, imgPath }) {
  const { addMeal } = use(CartContext);

  return (
    <>
      <img src={`http://192.168.1.31:3000/${imgPath}`} alt={name} />
      <h3>{name}</h3>
      <span>${price}</span>
      <p>{description}</p>
      <button onClick={() => addMeal(id, name, price)}>Add to Cart</button>
    </>
  );
}
