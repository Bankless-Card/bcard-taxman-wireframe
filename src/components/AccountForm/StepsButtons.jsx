import React from "react";
import styles from "./styles.module.css";

const StepsButtons = ({ currentStep, stepChange }) => {
  const steps = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const selectCurrentButtonClass = (id) => {
    return currentStep === id ? styles.step_button_current : styles.step_button;
  };

  return (
    <div className={styles.steps_buttons_contaier}>
      {steps.map((step) => (
        <div
          onClick={() => stepChange(step.id)}
          className={selectCurrentButtonClass(step.id)}
          key={step.id}
        ></div>
      ))}
    </div>
  );
};

export default StepsButtons;
