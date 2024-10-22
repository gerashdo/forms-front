import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "@tanstack/react-router";
import { AuthState } from "@/state/auth";


interface ProtectedPageProps {
  children: ReactNode
}

export const ProtectedPage = ({children}: ProtectedPageProps) => {
  const authState = useRecoilValue(AuthState);
  const navigation = useNavigate();
  useEffect(() => {
    if (!authState.user) {
      navigation({to: '/auth'});
    }
  }, [authState, navigation]);

  return (
    <>
      {children}
    </>
  );
}
