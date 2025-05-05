import { use } from "react";

import { CartContext } from "../../store/cart-context";

export default function ModalPostForm() {
  const { submittedOrder } = use(CartContext);
  return (
    <>
      <h1 className="postForm-successMessage">Success!</h1>
      <p className="postForm-subMessage">
        Your order has been submitted succesfully.
      </p>
      <p className="postForm-subMessage">
        We will get back to you with more details via email within the next few
        minutes.
      </p>

      <h2 className="postForm-orderDetailsTitle">
        Here are your order details:
      </h2>
      <h4 className="postForm-orderID">Order ID: {submittedOrder.orderId}</h4>

      <ul className="postForm-list list-animation">
        {Object.entries(submittedOrder.customer).map(([key, value]) => (
          <li key={key} className="postForm-listItem">
            {value}
          </li>
        ))}
      </ul>

      <h4 className="postForm-orderDetailsTitle">Ordered food:</h4>
      <ul className="postForm-list list-animation">
        {submittedOrder.items.map((orderedMeal) => (
          <li key={orderedMeal.id} className="postForm-listItem">
            <h6 className="postForm-pricePerPiece">
              [${orderedMeal.price} / piece]
            </h6>
            <div className="postForm-foodDetails">
              {orderedMeal.name} x <strong>{orderedMeal.quantity}</strong> - $
              {(orderedMeal.price * orderedMeal.quantity).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      <h4 className="postForm-total">{`Total: ${submittedOrder.totalCartPrice}`}</h4>
    </>
  );
}
