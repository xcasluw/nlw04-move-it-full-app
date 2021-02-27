import React, { createContext, useContext, useCallback, useState } from "react";
import { v4 } from "uuid";
import ToastContainer from "../components/ToastContainer";

const ToastContext = createContext({});

const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addToast = useCallback(
    ({ type, title, description }) => {
      const id = v4();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((state) => [...state, toast]);
    },
    []
  );

  const removeToast = useCallback((id) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast precisa ser usado por dentro de um ToastProvider"
    );
  }

  return context;
}

export { ToastProvider, useToast };
