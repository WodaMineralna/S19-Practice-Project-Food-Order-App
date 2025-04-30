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
      {cart.map((cartItem) => (
        <li className="modal-listItem" key={cartItem.id}>
          <button onClick={() => deleteMeal(cartItem.id)}>
            <TrashIcon />
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
              -
            </button>
          </div>
        </li>
      ))}
      <p>
        {cart.length === 0
          ? "Your cart is empty!"
          : `Your total price: ${totalCartPrice}`}
      </p>
      {cart.length > 0 && (
        <button onClick={() => changeModalPage(2)}>Go to checkout</button>
      )}
    </ul>
  );
}
