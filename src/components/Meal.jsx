export default function Meal({ name, price, description, imgPath }) {
  return (
    <>
    <img src={`http://192.168.1.31:3000/${imgPath}`} alt={name} />
      <h3>{name}</h3>
      <span>{price}</span>
      <p>{description}</p>
    </>
  );
}
