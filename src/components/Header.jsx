import { use } from "react";

import { CartContext } from "../store/cart-context";
import { ModalContext } from "../store/modal-context";

import imgSrc from "../assets/logo.jpg";

export default function Header() {
  const { cart, resetCart } = use(CartContext);
  const { handleOpenModal } = use(ModalContext);

  return (
    <header>
      <img src={imgSrc} alt="Logo image" />
      <h3>REACTFOOD</h3>
      <button className="cart-button" onClick={handleOpenModal}>
        Cart ({cart.length})
      </button>
      <button className="cart-button" onClick={resetCart}>
        Clear cart
      </button>
    </header>
  );
}
