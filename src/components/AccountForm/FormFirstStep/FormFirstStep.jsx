import React from "react";
import styles from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

const FormFirstStep = ({ currentStep }) => {
  return (
    <AnimatePresence>
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ delay: 0.15 }}
          className={styles.form_first_step}
        >
          <p className={styles.form_first_step_title}>
            Let’s start with some questions!
          </p>
          <p className={styles.form_first_step_label}>
            What’s your ETH address?
          </p>
          <input type="text" />
          <p className={styles.form_first_step_label}>
            Choose your country for pay taxes
          </p>
          <input type="text" />
          <p className={styles.form_first_step_label}>And city...</p>
          <input type="text" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormFirstStep;
