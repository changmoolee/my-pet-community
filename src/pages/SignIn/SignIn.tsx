import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { Button, Modal, TextInput } from "joseph-ui-kit";
import SignUp from "../../components/SignUp/SignUp";
import styles from "./SignIn.module.scss";

interface SignInProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({ setIsLoggedIn }: SignInProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openSignUpModal = () => {
    setIsModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  const auth = getAuth();

  const onSignIn = (event: any) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
        // setIsLoggedIn(true);
        goToMain();
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const onGoogleClick = (event: any) => {
    const {
      target: { name },
    } = event;

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential && credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token, user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        if (errorCode === "auth/account-exists-with-different-credential") {
          alert(
            "이미 다른 auth 계정에 의해 등록되어 있습니다. 중복된 auth 계정은 사용 불가능합니다."
          );
        }
      });
  };

  const onGithubClick = (event: any) => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential && credential.accessToken;
        console.log(result);
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        if (errorCode === "auth/account-exists-with-different-credential") {
          alert(
            "이미 다른 auth 계정에 의해 등록되어 있습니다. 중복된 auth 계정은 사용 불가능합니다."
          );
        }
      });
  };

  return (
    <>
      <div className={styles.inputlist}>
        <TextInput
          placeholder="아이디 입력"
          type="text"
          label="아이디"
          width="220px"
          maxLength={40}
          onChange={(data) => setEmail(data.value)}
          hideWarn
        />
        <TextInput
          placeholder="비밀번호 입력"
          label="비밀번호"
          type="password"
          width="220px"
          maxLength={40}
          onChange={(data) => setPassword(data.value)}
          hideWarn
        />
      </div>
      <div className={styles.buttonlist}>
        <Button name="로그인" width="200px" onClick={onSignIn} />
        <Button name="회원가입" width="200px" onClick={openSignUpModal} />
        <Button name="google" width="200px" onClick={onGoogleClick} />
        <Button name="github" width="200px" onClick={onGithubClick} />
      </div>
      {isModalOpen ? (
        <Modal
          width="500px"
          height="600px"
          label="회원가입"
          title="회원가입"
          closeModal={closeSignUpModal}
          firstButtonDisabled
          secondaryButtonDisabled
        >
          <SignUp />
        </Modal>
      ) : null}
    </>
  );
};

export default SignIn;
