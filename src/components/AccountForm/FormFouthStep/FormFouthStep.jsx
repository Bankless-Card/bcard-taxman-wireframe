import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransactionList from "../TransactionList/TransactionList";
import styles from "./styles.module.css";

const FormFourthStep = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ delay: 0.15 }}
        className={styles.fourth_step_container}
      >
        <p className={styles.form_fourth_step_title}>Your 2022 Income</p>
        <TransactionList />
        <div className={styles.row}>
          <p>Total Income</p>
          <p>$751.29 CAD</p>
        </div>
        <div className={styles.row}>
          <p>Tax Rate</p>
          <p>29%</p>
        </div>
        <div className={styles.row_total}>
          <p>TOTAL TAX OWNED</p>
          <p>$217.87 CAD</p>
        </div>
        <input type="email" placeholder="Write your email..." />
      </motion.div>
    </AnimatePresence>
  );
};

export default FormFourthStep;
