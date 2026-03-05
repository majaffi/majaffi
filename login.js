import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {

  const login = async () => {
    await signInWithPopup(auth, provider);
    window.location.href = "/";
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Login</h2>
      <button className="btn btn-dark" onClick={login}>
        Login with Google
      </button>
    </div>
  );
}