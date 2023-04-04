import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "../../../context/UIContext";
import TransactionListItem from "../TransactionList/TransactionListItem";
import styles from "./styles.module.css";

import { finishButton } from "../../../functions";

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



const FormFourthStep = ({txData}) => {
  const [{ showEmailInput }] = useUI();

  // let finishBtnOutput = finishButton("CAD");
  // console.log(finishBtnOutput);

  console.log(txData);    // ok here

  function finishButtonOutput() {
    return finishButton(txData)[0];
  }

  //let num = FinishButtonOutput();

  let niceFormat = parseFloat( finishButtonOutput() ).toFixed(3);

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
          <p>${niceFormat} CAD</p>
        </div>
        <div className={styles.row}>
          <p>Tax Rate</p>
          <div className={styles.tax_number_container}>
            <input defaultValue={100} type="number" step="1" suffix="%" />
            <p className={styles.porcentage}>%</p>
          </div>
        </div>
        <div className={styles.row_total}>
          <p>TOTAL DAO INCOME TO CLAIM FOR TAX</p>
          <p>${niceFormat} CAD</p>
        </div>
        {/* <FinishButtonOutput /> Total Income */}
        {showEmailInput && (
          <input type="email" placeholder="Write your email..." />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FormFourthStep;
