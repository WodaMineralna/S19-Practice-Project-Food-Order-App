import { use } from "react";

import { CartContext } from "../../store/cart-context";

export default function ModalPostForm() {
  const { submittedOrder } = use(CartContext);
  return (
    <>
      <h3>Success!</h3>
      <p>Your order has been submitted succesfully.</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes.
      </p>

      <h2>Here are your order details:</h2>
      <h4>Order ID: {submittedOrder.orderId}</h4>

      <ul className="modal-list">
        {Object.entries(submittedOrder.customer).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>

      <h4>Ordered food:</h4>
      <ul className="modal-list">
        {submittedOrder.items.map((orderedMeal) => (
          <li key={orderedMeal.id} className="postForm-listItem">
            <h6 className="postForm-pricePerPiece">
              [${orderedMeal.price} / piece]
            </h6>
            <div>
              {orderedMeal.name} x <strong>{orderedMeal.quantity}</strong> - $
              {(orderedMeal.price * orderedMeal.quantity).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      <h4>{`Total: ${submittedOrder.totalCartPrice}`}</h4>
    </>
  );
}
