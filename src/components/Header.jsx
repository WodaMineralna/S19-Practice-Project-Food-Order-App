import { use } from "react";

import { MealsContext } from "../store/meals-context";

import imgSrc from "../assets/logo.jpg";

export default function Header() {
  const { cart, debugResetLocalstorage } = use(MealsContext);

  return (
    <header>
      <img src={imgSrc} alt="Logo image" />
      <p>REACTFOOD</p>

      {/* // TODO - cart data fetching functionality, showing a Modal */}
      {/* // ? in this file? */}
      {/* // * Context will be needed */}
      <button className="cart-button">Cart ({cart.length})</button>
      <button className="cart-button" onClick={debugResetLocalstorage}>
        Clear cart (isLocalStorage? -{" "}
        {/* // FIX it shows 'Yes' after page reload, even if it's empty */}
        {localStorage.getItem("cart")?.length > 0 ? "Yes" : "No"})
      </button>
    </header>
  );
}
