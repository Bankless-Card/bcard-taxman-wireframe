import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";

const TransactionModalButtons = ({setIsActiveItem}) => {

  const [, { setShowTransactionModal }] = useUI();

  function closeModalandMarkInactive() {
    setShowTransactionModal(false);
    setIsActiveItem(false);
  }

  return (
    <div className={styles.transaction_modal_buttons_container}>
      <button 
        onClick={() => closeModalandMarkInactive()}
        className={styles.cancel_button} 
        type="button"
      >
        Cancel
      </button>
      <button 
        className={styles.save_button}
        type="button"
        onClick={() => closeModalandMarkInactive()}
      >
        Save</button>
    </div>
  );
};

export default TransactionModalButtons;
