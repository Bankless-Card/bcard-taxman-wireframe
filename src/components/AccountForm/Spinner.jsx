import React from "react";
import styles from "./styles.module.css";

const Spinner = ({ text = "Loading..." }) => {
  return (
    <div className={styles.spinner_container}>
      <div><img className={styles.spinner_img} src="./img/spinner.png" /></div>
      <div>{text}</div>
    </div>
  );
};

export default Spinner;
