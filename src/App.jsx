import Header from "./components/Header";
import Meals from "./components/Meals";
import Modal from "./components/Modal/Modal";

// TODO fix possible (xd) re-executes in all components
// ? outsorce some logic into different files - 85% not, would be too much, not needed
// ^ no need to outsorce function logic into a custom hook, when it WON'T be re-used anywhere

// CSS
// TODO - styling for everything
// * change modal classnames / the amount of them etc - better reusability
// ^ prob change the name matching the modal state (eg.: .cart-listItem, not .modal-listItem)

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
