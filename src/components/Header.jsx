import imgSrc from "../assets/logo.jpg"

export default function Header() {
  return (
    <header>
      <img src={imgSrc} alt="Logo image" />
      <p>REACTFOOD</p>

      {/* // TODO - cart data fetching functionality, showing a Modal */}
      {/* // ? in this file? */}
      {/* // * Context will be needed */}
      <button className="cart-button">See cart</button>
    </header>
  )
}
