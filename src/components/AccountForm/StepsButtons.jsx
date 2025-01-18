import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";

const StepsButtons = ({ currentStep, stepChange }) => {
  const steps = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const [{ showTransactionModal }] = useUI();

  const selectCurrentButtonClass = (id) => {
    return currentStep === id ? styles.step_button_current : styles.step_button;
  };

  return (
    <div className={styles.steps_buttons_contaier}>
      {steps.map((step) => (
        <button
          disabled={showTransactionModal}
          onClick={(event) => {
            // dont remove this is to prevent refresh of form on button click
            event.preventDefault();
            stepChange(step.id);
          }}
          className={selectCurrentButtonClass(step.id)}
          key={step.id}
        ></button>
      ))}
    </div>
  );
};

export default StepsButtons;
