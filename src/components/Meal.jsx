import { use } from "react";

import { MealsContext } from "../store/meals-context";

export default function Meal({ id, name, price, description, imgPath }) {
  const { addMealToCart } = use(MealsContext)

  return (
    <>
      <img src={`http://192.168.1.31:3000/${imgPath}`} alt={name} />
      <h3>{name}</h3>
      <span>{price}</span>
      <p>{description}</p>
      <button onClick={() => addMealToCart(id, name, price)}>Add to Cart</button>
    </>
  );
}
