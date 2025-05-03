import { use } from "react";

import { CartContext } from "../store/cart-context";

export default function Meal({ id, name, price, description, imgPath }) {
  const { addMeal, mealWasSelected } = use(CartContext);

  return (
    <>
      <img
        src={`http://192.168.1.31:3000/${imgPath}`}
        alt={name}
        className="mealItem-image"
      />
      <div className="mealItem-subContainer">
        <h2 className="mealItem-name">{name}</h2>
        <strong className="mealItem-price">${price}</strong>
        <p className="mealItem-description">{description}</p>
        <button
          className={`mealItem-button ${
            mealWasSelected === id ? "mealWasSelected" : ""
          }`}
          onClick={() => addMeal(id, name, price)}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
