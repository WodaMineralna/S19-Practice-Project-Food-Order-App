import { use, useState } from "react";

import { CartContext } from "../store/cart-context";

export default function Meal({ id, name, price, description, imgPath }) {
  const { addMeal } = use(CartContext);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleAddMeal() {
    addMeal(id, name, price);

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  }

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
          className={`general-button mealItem-button ${
            isAnimating ? "mealWasSelected" : ""
          }`}
          onClick={handleAddMeal}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}
