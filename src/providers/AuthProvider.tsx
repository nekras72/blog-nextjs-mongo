"use client"
import { IChildren } from "@/types";
import { SessionProvider } from "next-auth/react";

const AuthProvider: React.FC<IChildren> = ({children}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
};

export default AuthProvider
