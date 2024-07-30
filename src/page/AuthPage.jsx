import React from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <div>{authScreenState === "signUp" ? <Login /> : <SignUp />}</div>;
};

export default AuthPage;
