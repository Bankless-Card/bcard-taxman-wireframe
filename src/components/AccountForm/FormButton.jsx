import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";

const FormButton = ({ stepChange, currentStep }) => {
  const [{ showTransactionModal }] = useUI();

  const isButtonDisabled = showTransactionModal
    ? styles.next_step_button_disabled
    : styles.next_step_button;

  return (
    <button
      onClick={() => stepChange(currentStep + 1)}
      className={isButtonDisabled}
      type="button"
      disabled={showTransactionModal}
    >
      {currentStep === 4 ? "Send to my email" : "Next Step"}
    </button>
  );
};

export default FormButton;
