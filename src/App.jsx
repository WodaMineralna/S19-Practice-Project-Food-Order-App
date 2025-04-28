import Header from "./components/Header";
import Meals from "./components/Meals";
import Modal from "./components/Modal";

import { MealsContextProvider } from "./store/meals-context";

function App() {
  return (
    <MealsContextProvider>
      <Header />
      <Meals />
      <Modal />
    </MealsContextProvider>
  );
}

export default App;
