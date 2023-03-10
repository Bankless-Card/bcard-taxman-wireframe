import React from "react";
import styles from "./styles.module.css";

const AppContainer = ({ children }) => {
  return (
    <div className={styles.app_container}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default AppContainer;
