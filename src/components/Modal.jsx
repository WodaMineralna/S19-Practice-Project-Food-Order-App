import { use } from "react";
import { createPortal } from "react-dom";

import { MealsContext } from "../store/meals-context";

export default function Modal() {
  const { cart, isModalOpen, handleCloseModal } = use(MealsContext);

  const totalCartPrice = cart.reduce(
    (totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity,
    0
  );

  if (!isModalOpen) return null;

  // ! IMPORTANT FUTURE IMPLEMENTATION
  // TODO useReducer() will be needed here
  // ? implementation in meals-context.jsx ?
  // * Modal will render stuff based on if we're at the checkout, at the form, or post-form (when we submit it)
  return createPortal(
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleCloseModal}>
          ×
        </button>
        <ul className="modal-list">
          {cart.map((cartItem) => (
            <li className="modal-listItem" key={cartItem.id}>
              <p>{`${cartItem.name} - ${cartItem.quantity} X $${cartItem.price}`}</p>
              <div className="modal-listItem-buttonsParent">
                {/* // ? or just re-factor the addMealToCart function, so it's a useReducer one? */}
                {/* // TODO add a new useReducer() to meals-context.jsx that will handle +/- food quantity */}
                <button className="modal-listItem-button">+</button>
                {cartItem.quantity}
                <button className="modal-listItem-button">-</button>
              </div>
            </li>
          ))}
          {/* // TODO add CSS styling */}
          {cart.length === 0 ? "Your cart is empty!" : `Your total price: $${totalCartPrice}`}
        </ul>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
