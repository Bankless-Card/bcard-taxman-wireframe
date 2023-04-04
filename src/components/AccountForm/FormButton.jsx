import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";

// import { alchemyGo } from "../../functions/alchemyGo";

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

  if(currentStep === 4) {
    console.log("Sum Up Transactions - import a function");

    // console.log("globalTxList: ", globalTxList);
  }

  return (
    <button
      onClick={() => handleFormButton(currentStep)}
      className={isButtonDisabled}
      type="button"
      disabled={showTransactionModal}
    >
      {currentStep === 1 ? console.log("SET Address & Country Code.") : ""}
      {currentStep === 2 ? console.log("RUN Alchemy GO for TX list."): "" }
      {currentStep === 3 ? console.log("Get DAOs selected -> call tx list") : ""}
      {currentStep === 4 ? "Send to my email" : "Next Step"}
    </button>
  );
};

export default FormButton;
