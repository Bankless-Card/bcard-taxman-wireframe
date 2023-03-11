import React from "react";
import styles from "./styles.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinner_container}>
      <img className={styles.spinner_img} src="./src/img/spinner.png" />
    </div>
  );
};

export default Spinner;
