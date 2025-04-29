import { use } from "react";
import { createPortal } from "react-dom";

import { MealsContext } from "../store/meals-context";
import ModalCart from "./ModalCart";
import ModalForm from "./ModalForm";

export default function Modal() {
  const { isModalOpen, handleCloseModal } = use(MealsContext);

  if (!isModalOpen) return null;

  // ! IMPORTANT FUTURE IMPLEMENTATION
  // ? implementation in meals-context.jsx ?
  // * Modal will render stuff based on if we're at the checkout, at the form, or post-form (when we submit it)
  return createPortal(
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleCloseModal}>
          ×
        </button>
        <ModalCart />
        {/* <ModalForm /> */}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
