import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms";

interface ProtectedProps {
  children: React.ReactNode;
}
export function UserProtectedRoute({ children }: ProtectedProps) {
  const user = useRecoilValue(userState);

  if (user?.role != "user") {
    return <Navigate to={"/"} />;
  } else {
    return <>{children};</>;
  }
}
