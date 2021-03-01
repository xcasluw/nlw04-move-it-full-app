import React from "react";
import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";
import { ChallengesProvider } from "./challenges";

const AppProvider = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <ChallengesProvider>
        {children}
      </ChallengesProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
