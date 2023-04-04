import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";

const TransactionModalButtons = () => {

  const [, { setShowTransactionModal }] = useUI();

  return (
    <div className={styles.transaction_modal_buttons_container}>
      <button 
        onClick={() => setShowTransactionModal(false)}
        className={styles.cancel_button} 
        type="button"
      >
        Cancel
      </button>
      <button 
        className={styles.save_button}
        type="button"
        onClick={() => setShowTransactionModal(false)}
      >
        Save</button>
    </div>
  );
};

export default TransactionModalButtons;
