"use client"
import { UserAuthContextProvider } from "@/context/UserAuthContext";
import { IChildren } from "@/types";
import { SessionProvider } from "next-auth/react";

const AuthProvider: React.FC<IChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <UserAuthContextProvider>
        {children}
      </UserAuthContextProvider>
    </SessionProvider>
  )
};

export default AuthProvider;
