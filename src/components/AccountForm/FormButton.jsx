import React from "react";
import styles from "./styles.module.css";
const FormButton = ({ stepChange, currentStep }) => {
  return (
    <button
      onClick={() => stepChange(currentStep + 1)}
      className={styles.next_step_button}
      type="button"
    >
      Next Step
    </button>
  );
};

export default FormButton;
