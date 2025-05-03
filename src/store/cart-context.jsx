import { createContext, useState, useReducer, useEffect } from "react";

import cartReducer from "./reducers/cartReducer.js";

export const CartContext = createContext({
  cart: [],
  totalCartPrice: 0,
  clearCart: (initialCart) => {},
  addMeal: (meal) => {},
  deleteMeal: (id) => {},
  incrementMealQuantity: (id) => {},
  decrementMealQuantity: (id) => {},
  resetCart: () => {},
  submitOrder: (order) => {},
  submittedOrder: {},
  mealWasSelected: "",
});

export function CartContextProvider({ children }) {
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [mealWasSelected, setMealWasSelected] = useState("");

  let initialCartState = [];

  // get localstorage 'cart' data and set it as initialCartState
  function initCartFunction(initialCartState) {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    } else return initialCartState;
  }

  const [cart, cartDispatch] = useReducer(
    cartReducer,
    initialCartState,
    initCartFunction
  );

  // ?
  // ?FIX check if it's not re-executed too many times for no reason
  const totalCartPrice =
    "$" +
    cart
      .reduce(
        (totalPrice, cartItem) =>
          totalPrice + cartItem.price * cartItem.quantity,
        0
      )
      .toFixed(2);

  function addMeal(id, name, price) {
    cartDispatch({
      type: "ADD_MEAL",
      payload: { id, name, price },
    });

    // ?
    // ?FIX - might cause problems with re-renders?? CHECK
    setMealWasSelected("");
    setTimeout(() => {setMealWasSelected(id)}, 0)
  }

  function deleteMeal(id) {
    cartDispatch({
      type: "DELETE_MEAL",
      payload: id,
    });
  }

  function incrementMealQuantity(id) {
    cartDispatch({
      type: "INCREMENT_QUANTITY",
      payload: id,
    });
  }

  function decrementMealQuantity(id) {
    cartDispatch({
      type: "DECREMENT_QUANTITY",
      payload: id,
    });
  }

  function clearCart() {
    cartDispatch({
      type: "CLEAR_CART",
      payload: initialCartState,
    });
  }

  // update localStorage everytime the cart state updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function resetCart() {
    localStorage.clear();
    clearCart(initialCartState);
  }

  console.log(`${typeof cart}, 🔥Cart data: 🔥`, cart); // DEBUG

  // submitting customers order to the backend
  async function submitOrder(customer) {
    const newOrder = { customer, items: cart };

    try {
      const response = await fetch("http://192.168.1.31:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to submit order: ", errorData.message);
        return errorData.message || "Failed to submit order.";
      }

      const orderData = await response.json();

      console.log("SUBMITTED ORDER: ", orderData); // DEBUG
      setSubmittedOrder({ ...orderData, totalCartPrice });
      clearCart(initialCartState);
    } catch (error) {
      console.error("Failed to submit order:", error.message);
      return error.message || "An unexpected error has occured.";
    }
  }

  const cartValue = {
    cart,
    totalCartPrice,
    clearCart,
    addMeal,
    deleteMeal,
    incrementMealQuantity,
    decrementMealQuantity,
    resetCart,
    submitOrder,
    submittedOrder,
    mealWasSelected,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
