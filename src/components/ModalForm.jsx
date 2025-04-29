import { useActionState, use } from "react";

import { MealsContext } from "../store/meals-context";

import InputField from "./InputField";

import {
  isEmpty,
  isEmailAdress,
  isLongEnough,
  isPostalCodeValid,
} from "../util/validation";

const ERROR_MESSAGES = {
  fullName: "Please enter your Full Name.",
  email: "E-Mail Adress must contain an '@' symbol.",
  street: "Please enter a street.",
  postalCode: "Postal Code must be in a XX-XXX pattern.",
  city: "Please enter a city.",
};

export default function ModalForm() {
  const { changeModalPage } = use(MealsContext)

  function submitOrderAction(prevFormState, formData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const street = formData.get("street");
    const postalCode = formData.get("postalCode");
    const city = formData.get("city");

    const errors = [];

    if (isEmpty(fullName) || !isLongEnough(fullName, 4))
      errors.push(ERROR_MESSAGES.fullName);
    if (!isEmailAdress(email)) errors.push(ERROR_MESSAGES.email);
    if (isEmpty(street)) errors.push(ERROR_MESSAGES.street);
    if (!isPostalCodeValid(postalCode)) errors.push(ERROR_MESSAGES.postalCode);
    if (isEmpty(city)) errors.push(ERROR_MESSAGES.city);

    console.log(
      `Full Name: ${fullName}, Email: ${email}, Street: ${street}, Postal Code: ${postalCode}, City: ${city}`
    ); // DEBUG

    console.log(errors);

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          fullName,
          email,
          street,
          postalCode,
          city,
        },
      };
    }

    // TODO fetch data
    // * Data fetching will be right there - to be implemented
    // ! After the data is succesfully fetched, execute changeModalPage(3)

    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(submitOrderAction, {
    errors: null,
  });

  return (
    <form action={formAction}>
      <div className="form-inputFields">
        <InputField
          label="Full Name"
          id="fullName"
          name="fullName"
          type="text"
          defaultValue={formState.enteredValues?.fullName}
        />

        <InputField
          label="E-Mail Adress"
          id="email"
          name="email"
          type="email"
          defaultValue={formState.enteredValues?.email}
        />

        <InputField
          label="Street"
          id="street"
          name="street"
          type="text"
          defaultValue={formState.enteredValues?.street}
        />

        <InputField
          label="Postal Code"
          id="postalCode"
          name="postalCode"
          type="text"
          placeholder="XX-XXX"
          defaultValue={formState.enteredValues?.postalCode}
        />

        <InputField
          label="City"
          id="city"
          name="city"
          type="text"
          defaultValue={formState.enteredValues?.city}
        />
      </div>
      <div className="formButtons">
        <button onClick={() => changeModalPage(1)}>Go back</button>
        <button type="submit">Submit Order</button>
      </div>
      {formState.errors && (
        <ul className="form-errors">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </form>
  );
}
