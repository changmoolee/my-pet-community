import React from "react";
import styles from "./Header.module.scss";
import { Button } from "joseph-ui-kit";
import { getAuth } from "firebase/auth";
import WritingIcon from "../../assets/icons/WritingIcon";
import MyProfileIcon from "../../assets/icons/MyProfileIcon";

const Header = () => {
  const auth = getAuth();

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.container}>
          <a
            className={styles.logo}
            href="/"
            style={{ textDecoration: "none", color: "black" }}
          >
            joseph
            <br />
            noticeboard
          </a>
          {auth.currentUser !== null ? (
            <div className={styles.rightIconContainer}>
              <a
                className={styles.icon}
                href="/writing"
                style={{ textDecoration: "none", color: "black" }}
              >
                <WritingIcon />
              </a>
              <a
                className={styles.icon}
                href="/myprofile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MyProfileIcon />
              </a>
            </div>
          ) : (
            <div className={styles.rightIconContainer}>
              <a
                href="/signin"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button
                  kind="ghost"
                  name="로그인"
                  width="80px"
                  padding="0"
                  position="center"
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
