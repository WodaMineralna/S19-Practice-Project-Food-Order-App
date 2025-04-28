import { use } from "react";
import { createPortal } from "react-dom";

import { MealsContext } from "../store/meals-context";

export default function Modal() {
  const {
    cart,
    deleteMeal,
    incrementMealQuantity,
    decrementMealQuantity,
    isModalOpen,
    handleCloseModal,
  } = use(MealsContext);

  const totalCartPrice = cart.reduce(
    (totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity,
    0
  );

  if (!isModalOpen) return null;

  // ! IMPORTANT FUTURE IMPLEMENTATION
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
              {/* // TODO add the <svg> to a separate file */}
              {/* // ^ after implementing all the different stuff that a Modal will render */}
              <button onClick={() => deleteMeal(cartItem.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-trash"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6l-2 14H7L5 6"></path>
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                  <path d="M9 6V4h6v2"></path>
                </svg>
              </button>
              <p>{`${cartItem.name} - ${cartItem.quantity} X $${cartItem.price}`}</p>
              <div className="modal-listItem-buttonsParent">
                <button
                  className="modal-listItem-button"
                  onClick={() => incrementMealQuantity(cartItem.id)}
                >
                  +
                </button>
                {cartItem.quantity}
                <button
                  className="modal-listItem-button"
                  onClick={() => decrementMealQuantity(cartItem.id)}
                >
                  {" "}
                  -
                </button>
              </div>
            </li>
          ))}
          {/* // TODO add CSS styling */}
          {cart.length === 0
            ? "Your cart is empty!"
            : `Your total price: $${totalCartPrice.toFixed(2)}`}
        </ul>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
