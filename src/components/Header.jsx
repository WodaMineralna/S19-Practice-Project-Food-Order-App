import { use } from "react";

import { CartContext } from "../store/cart-context";
import { ModalContext } from "../store/modal-context";

import imgSrc from "../assets/logo.jpg";

export default function Header() {
  const { cart } = use(CartContext);
  const { handleOpenModal } = use(ModalContext);

  return (
    <header>
      <div className="header-subContainer">
        <img src={imgSrc} alt="Logo image" />
        <h3 className="header-title">REACTFOOD</h3>
      </div>
      <button className="header-button" onClick={handleOpenModal}>
        Cart ({cart.length})
      </button>
    </header>
  );
}
