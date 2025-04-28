import { use } from "react";
import { MealsContext } from "../store/meals-context";

import Meal from "./Meal";

export default function Meals() {
  const { availableMeals } = use(MealsContext);

  // console.log(
  //   `Type: ${typeof availableMeals}, 🔥Fetched availableMeals: `,
  //   availableMeals
  // ); // DEBUG

  // TODO show a notification to the user, while the data is being fetched
  return (
    <ul className="meals-list">
      {availableMeals.map((meal) => (
        <li className="mealItem" key={meal.id}>
          <Meal
            id={meal.id}
            name={meal.name}
            price={meal.price}
            description={meal.description}
            imgPath={meal.image}
          />
        </li>
      ))}
    </ul>
  );
}
