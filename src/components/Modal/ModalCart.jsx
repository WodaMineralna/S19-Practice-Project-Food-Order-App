import { use } from "react";

import { CartContext } from "../../store/cart-context";
import { ModalContext } from "../../store/modal-context";
import TrashIcon from "../../assets/icons/TrashIcon";

export default function ModalCart() {
  const {
    cart,
    totalCartPrice,
    deleteMeal,
    incrementMealQuantity,
    decrementMealQuantity,
  } = use(CartContext);
  const { changeModalPage } = use(ModalContext);

  return (
    <ul className="modal-list">
      <h2 className="modal-listTitle">Your Cart</h2>
      {cart.map((cartItem) => (
        <li className="modal-listItem" key={cartItem.id}>
          <button
            className="modal-listItem-trashIconButton"
            onClick={() => deleteMeal(cartItem.id)}
          >
            <TrashIcon />
          </button>
          <p className="modal-listItem-mealDetails">{`${cartItem.name} - ${cartItem.quantity} X $${cartItem.price}`}</p>
          <div className="modal-listItem-plusMinusButtonsParent">
            <button
              className="modal-listItem-button symbol-minus"
              onClick={() => decrementMealQuantity(cartItem.id)}
            >
              <span>-</span>
            </button>
            <span className="modal-listItem-quantity">{cartItem.quantity}</span>
            <button
              className="modal-listItem-button"
              onClick={() => incrementMealQuantity(cartItem.id)}
            >
              <span>+</span>
            </button>
          </div>
        </li>
      ))}
      <p className="modal-totalPrice">
        {cart.length === 0 ? "Your cart is empty!" : `Total: ${totalCartPrice}`}
      </p>
      {cart.length > 0 && (
        <button
          className="general-button modal-checkoutButton"
          onClick={() => changeModalPage(2)}
        >
          Go to checkout
        </button>
      )}
    </ul>
  );
}
