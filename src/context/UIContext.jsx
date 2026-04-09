import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export default function UIProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = (type, data = {}) => setModal({ type, ...data });
  const closeModal = () => setModal(null);

  return (
    <UIContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
