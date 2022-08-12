import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import styles from "./SignOut.module.scss";

const SignOut = () => {
  const auth = getAuth();

  const onClick = () =>
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  return <button onClick={onClick}>SignOut</button>;
};

export default SignOut;
