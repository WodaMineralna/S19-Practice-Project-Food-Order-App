import { use } from "react";

import { MealsContext } from "../store/meals-context";
import TrashIcon from "../assets/icons/TrashIcon";

export default function ModalCart() {
  const { cart, deleteMeal, incrementMealQuantity, decrementMealQuantity } =
    use(MealsContext);

  const totalCartPrice = cart.reduce(
    (totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity,
    0
  );

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
      {/* // TODO add CSS styling */}
      <p>
        {cart.length === 0
          ? "Your cart is empty!"
          : `Your total price: $${totalCartPrice.toFixed(2)}`}
      </p>
    </ul>
  );
}
