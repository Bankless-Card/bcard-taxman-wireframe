import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";

const AppContainer = ({ children }) => {
  const [{ isCTAclicked }] = useUI();

  const backGroundClass = isCTAclicked
    ? styles.app_container_account
    : styles.app_container;

  return (
    <div className={backGroundClass}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AppContainer;
