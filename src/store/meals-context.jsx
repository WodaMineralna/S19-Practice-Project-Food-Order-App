import { createContext, useState, useEffect, useReducer } from "react";

export const MealsContext = createContext({
  availableMeals: [],
  cart: [],
  totalCartPrice: 0,
  clearCart: () => {},
  addMeal: (meal) => {},
  deleteMeal: (id) => {},
  incrementMealQuantity: (id) => {},
  decrementMealQuantity: (id) => {},
  debugResetLocalstorage: () => {}, // DEBUGGING
  isModalOpen: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  isFetchingMeals: false,
  changeModalPage: (number) => {},
  modalPageToShow: 1,
  submitOrder: (order) => {},
  submittedOrder: {},
});

// ?
// ?TODO outsorce to another file? maybe custom hook?
// ^ with all of the functions? (addMeal / clearCart / ...)
export function cartReducer(prevCartState, action) {
  if (action.type === "ADD_MEAL") {
    const existingCartItem = prevCartState.find(
      (item) => item.id === action.payload.id
    );

    if (existingCartItem) {
      return cartReducer(prevCartState, {
        type: "INCREMENT_QUANTITY",
        payload: existingCartItem.id,
      });
    } else {
      return [...prevCartState, { ...action.payload, quantity: 1 }];
    }
  }

  if (action.type === "DELETE_MEAL") {
    // TODO a popup message asking 'are you sure you want to delete this item?'
    return prevCartState.filter(
      (prevCartItem) => prevCartItem.id !== action.payload
    );
  }

  if (action.type === "INCREMENT_QUANTITY") {
    return prevCartState.map((prevCartItem) =>
      prevCartItem.id === action.payload
        ? { ...prevCartItem, quantity: prevCartItem.quantity + 1 }
        : prevCartItem
    );
  }

  if (action.type === "DECREMENT_QUANTITY") {
    const selectedCartItem = prevCartState.find(
      (cartItem) => cartItem.id === action.payload
    );

    if (selectedCartItem.quantity === 1) {
      return cartReducer(prevCartState, {
        type: "DELETE_MEAL",
        payload: selectedCartItem.id,
      });
    } else {
      return prevCartState.map((prevCartItem) =>
        prevCartItem.id === action.payload
          ? { ...prevCartItem, quantity: prevCartItem.quantity - 1 }
          : prevCartItem
      );
    }
  }

  if ((action.type = "CLEAR_CART")) {
    return [];
  }
}

// ?
// TODO in the future
// ?FIX less re-executes of the component
export function MealsContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetchingMeals, setIsFetchingMeals] = useState(false);
  const [modalPageToShow, setModalPageToShow] = useState(1); // 1 - cart, 2 - form, 3 - post-form
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
    });
  }

  console.log(`${typeof cart}, 🔥Cart data: 🔥`, cart);

  // ?
  // ?TODO add to a different file so it doesnt clutter this one so much, custom hook?
  // !
  // ^ also add a error state, availableMeals is already implemented (one of the three data fetching common states)
  // fetch availableMeals data from the backend
  useEffect(() => {
    async function loadAvailableMeals() {
      setIsFetchingMeals(true);
      try {
        // ! USE 192.168.1.31 intead of 'localhost', beacuse data wont fetch on PC otherwise
        const response = await fetch("http://192.168.1.31:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals.");
        }

        const availableMealsData = await response.json();
        setAvailableMeals(availableMealsData); // * we know that in this place we succesfully fetched data
      } catch (error) {
        // TODO add better error handling
        // ? Maybe <ErrorPage> component?
        console.error(
          "Could not fetch available meals, please try again later."
        );
        setIsFetchingMeals(false);
      }
    }

    loadAvailableMeals();
  }, []);

  // update localStorage everytime the cart state updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // DEBUGGING
  function debugResetLocalstorage() {
    localStorage.clear();
    clearCart();
  }

  function handleOpenModal() {
    console.log("Modal opened");
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    console.log("Modal closed");
    setIsModalOpen(false);
  }

  function changeModalPage(number) {
    setModalPageToShow(number);
  }

  // TODO put it elsewere, above other functions
  // ? or maybe in a different file (custom hook?)
  // ? --V
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
      changeModalPage(3);

      return submittedOrder;
    } catch {
      console.error("Failed to submit order:", error.message);
    }
  }

  const mealsValue = {
    availableMeals,
    cart,
    totalCartPrice,
    clearCart,
    addMeal,
    deleteMeal,
    incrementMealQuantity,
    decrementMealQuantity,
    debugResetLocalstorage, // DEBUGGING
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    isFetchingMeals,
    // ? name should be changed?
    changeModalPage,
    modalPageToShow,
    submitOrder,
    submittedOrder,
  };

  return (
    <MealsContext.Provider value={mealsValue}>{children}</MealsContext.Provider>
  );
}
