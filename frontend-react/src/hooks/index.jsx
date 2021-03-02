import React from "react";
import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";
import { ChallengesProvider } from "./challenges";
import { CountdownProvider } from "./countdown";

const AppProvider = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <ChallengesProvider>
        <CountdownProvider>
          {children}
        </CountdownProvider>
      </ChallengesProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
