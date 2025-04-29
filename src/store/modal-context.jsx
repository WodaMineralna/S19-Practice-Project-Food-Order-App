import { createContext, useState } from "react";

export const ModalContext = createContext({
  isModalOpen: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  changeModalPage: (number) => {},
  modalPageToShow: 1,
});

export function ModalContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPageToShow, setModalPageToShow] = useState(1); // 1 - cart, 2 - form, 3 - post-form

  function handleOpenModal() {
    console.log("Modal opened");
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    console.log("Modal closed");
    setIsModalOpen(false);
  }

  function changeModalPage(number) {
    setModalPageToShow(number);
  }

  const modalValue = {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    changeModalPage,
    modalPageToShow,
  };

  return (
    <ModalContext.Provider value={modalValue}>{children}</ModalContext.Provider>
  );
}
