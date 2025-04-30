export default function ModalError({ message }) {
  return (
    <div className="modal-error">
      <h2>An error has occured!</h2>
      <p>{message}</p>
    </div>
  );
}
