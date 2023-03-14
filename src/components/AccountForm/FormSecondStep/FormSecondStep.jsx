import React from "react";
import styles from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

const FormSecondStep = ({ currentStep }) => {
  return (
    <AnimatePresence>
      {currentStep == 2 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ delay: 0.15 }}
          className={styles.form_second_step}
        >
          <p className={styles.form_second_step_title}>
            Which DAOs are you part of?
          </p>
          <div className={styles.row}>
            <input type="checkbox" id="BANK" />
            <label>Bankless DAO (BANK)</label>
          </div>
          <div className={styles.row}>
            <input type="checkbox" id="1INCH" />
            <label>1inch (1INCH)</label>
          </div>
          <div className={styles.row}>
            <input type="checkbox" id="ANT" />
            <label>Aragon (ANT)</label>
          </div>
          <div className={styles.row}>
            <input type="checkbox" id="MKR" />
            <label>Maker DAO (MKR)</label>
          </div>
          <div className={styles.row}>
            <input type="checkbox" id="POKT" />
            <label>Pocket DAO (POKT)</label>
          </div>
          <div className={styles.row}>
            <input type="checkbox" id="POOL" />
            <label> Pool Together (POOL)</label>
          </div>
          <p className={styles.warning}>
            If your DAO doesnt appear here. You can write us:
            links@banklesscard.xzy
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormSecondStep;
