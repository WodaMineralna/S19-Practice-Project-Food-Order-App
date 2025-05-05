import { createContext, useState } from "react";

export const ModalContext = createContext({
  isModalOpen: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  changeModalPage: (number) => {},
  modalPageToShow: 1,
  modalErrorMessage: null,
  setErrorMessage: (errorMsg) => {},
});

export function ModalContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPageToShow, setModalPageToShow] = useState(1); // 1 - cart, 2 - form, 3 - post-form, 4 - error-page
  const [modalErrorMessage, setModalErrorMessage] = useState(null);

  function handleOpenModal() {
    console.log("Modal Opened");
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    console.log("Modal Closed");
    setIsModalOpen(false);
    setModalPageToShow(1);
  }

  function changeModalPage(number) {
    setModalPageToShow(number);
  }

  function setErrorMessage(errorMsg) {
    setModalErrorMessage(errorMsg);
  }

  const modalValue = {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    changeModalPage,
    modalPageToShow,
    modalErrorMessage,
    setErrorMessage,
  };

  return (
    <ModalContext.Provider value={modalValue}>{children}</ModalContext.Provider>
  );
}
