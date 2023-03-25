import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";

const FormButton = ({ stepChange, currentStep }) => {
  const [{ showTransactionModal }, { setShowEmailInput }] = useUI();

  const isButtonDisabled = showTransactionModal
    ? styles.next_step_button_disabled
    : styles.next_step_button;

  const handleFormButton = (currentStep) => {
    return currentStep != 4
      ? stepChange(currentStep + 1)
      : setShowEmailInput(true);
  };

  return (
    <button
      onClick={() => handleFormButton(currentStep)}
      className={isButtonDisabled}
      type="button"
      disabled={showTransactionModal}
    >
      {currentStep === 4 ? "Send to my email" : "Next Step"}
    </button>
  );
};

export default FormButton;
