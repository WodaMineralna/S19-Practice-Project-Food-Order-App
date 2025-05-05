import Header from "./components/Header";
import Meals from "./components/Meals";
import Modal from "./components/Modal/Modal";

// TODO fix possible (xd) unwanted component re-executes in all components
// ^ should be good tho, should check (make sure) tho

import { MealsContextProvider } from "./store/meals-context";
import { CartContextProvider } from "./store/cart-context";
import { ModalContextProvider } from "./store/modal-context";

function App() {
  return (
    <MealsContextProvider>
      <CartContextProvider>
        <ModalContextProvider>
          <Header />
          <Meals />
          <Modal />
        </ModalContextProvider>
      </CartContextProvider>
    </MealsContextProvider>
  );
}

export default App;
