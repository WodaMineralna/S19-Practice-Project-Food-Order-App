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
  debugResetLocalstorage: () => {}, // DEBUGGING
  submitOrder: (order) => {},
  submittedOrder: {},
});

export function CartContextProvider({ children }) {
  const [submittedOrder, setSubmittedOrder] = useState(null);

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

  // DEBUGGING
  function debugResetLocalstorage() {
    console.log("🔥TEST 🔥 TEST🔥");
    localStorage.clear();
    clearCart(initialCartState);
  }

  console.log(`${typeof cart}, 🔥Cart data: 🔥`, cart); // DEBUG

  // TODO better error handling (using some state?)
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
        return;
      }

      const orderData = await response.json();

      console.log("SUBMITTED ORDER: ", orderData); // DEBUG
      setSubmittedOrder(orderData);
      clearCart(initialCartState)
    } catch (error) {
      console.error("Failed to submit order:", error.message);
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
    debugResetLocalstorage, // DEBUGGING
    submitOrder,
    submittedOrder,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}
