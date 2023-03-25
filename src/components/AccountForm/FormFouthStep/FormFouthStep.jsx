import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "../../../context/UIContext";
import TransactionListItem from "../TransactionList/TransactionListItem";
import styles from "./styles.module.css";

const transactionsData = [
  {
    id: 1,
    date: "",
    transactions: [
      {
        id: 1,
        avatar_url: "./img/dao.jpg",
        userName: "Bankless DAO",
        crypto: "20000 BANKS",
        currency: "$48.77 CAD",
      },
    ],
  },
];
const FormFourthStep = () => {
  const [{ showEmailInput }] = useUI();

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
        <TransactionListItem transactions={transactionsData[0].transactions} />
        <div className={styles.row}>
          <p>Total Income</p>
          <p>$751.29 CAD</p>
        </div>
        <div className={styles.row}>
          <p>Tax Rate</p>
          <div className={styles.tax_number_container}>
            <input defaultValue={0} type="number" step="0.1" suffix="%" />
            <p className={styles.porcentage}>%</p>
          </div>
        </div>
        <div className={styles.row_total}>
          <p>TOTAL TAX OWNED</p>
          <p>$217.87 CAD</p>
        </div>
        {showEmailInput && (
          <input type="email" placeholder="Write your email..." />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FormFourthStep;
