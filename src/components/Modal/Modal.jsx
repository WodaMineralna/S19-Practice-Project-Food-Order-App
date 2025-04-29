import { use } from "react";
import { createPortal } from "react-dom";

import { ModalContext } from "../../store/modal-context";

import { ModalCart, ModalForm, ModalPostForm } from ".";

const MODAL_PAGES = {
  CART: 1,
  FORM: 2,
  POST_FORM: 3,
};

export default function Modal() {
  const { isModalOpen, handleCloseModal, modalPageToShow } = use(ModalContext);

  if (!isModalOpen) return null;

  let modalContent;

  if (modalPageToShow === MODAL_PAGES.CART) modalContent = <ModalCart />;
  if (modalPageToShow === MODAL_PAGES.FORM) modalContent = <ModalForm />;
  if (modalPageToShow === MODAL_PAGES.POST_FORM)
    modalContent = <ModalPostForm />;

  return createPortal(
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleCloseModal}>
          ×
        </button>
        {modalContent}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
