import React from "react";
import styles from "./styles.module.css";

const TransactionModalButtons = () => {
  return (
    <div className={styles.transaction_modal_buttons_container}>
      <button className={styles.cancel_button} type="button">
        Cancel
      </button>
      <button className={styles.save_button}>Save</button>
    </div>
  );
};

export default TransactionModalButtons;
