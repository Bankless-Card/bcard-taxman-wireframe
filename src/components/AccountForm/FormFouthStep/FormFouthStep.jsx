// import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "../../../context/UIContext";
// import TransactionListItem from "../TransactionList/TransactionListItem";
import styles from "./styles.module.css";

// import { finishButton } from "../../../functions";
import { sumTransactions } from "../../../functions/sumTransactions";




const FormFourthStep = ({txData, activeAssets, country, tax, setTax}) => {
  const [{ showEmailInput }] = useUI();

  let countryCurrency = "CAD";
  if(country === "Canada"){
    countryCurrency = "CAD";
  } else if(country === "United States"){
    countryCurrency = "USD";
    
  } else {
    countryCurrency = "CAD";  // default
  }

  let txSum = sumTransactions(txData, activeAssets)[0];   // this is the total income

  let niceFormatIncome = parseFloat( txSum ).toFixed(2);
  let curFormatIncome = parseFloat( txSum ).toLocaleString('en-US', { style: 'currency', currency: countryCurrency });

  let incomeToClaim = tax * niceFormatIncome / 100;     // this is the amount to claim 100% default
  let incomeDisplay = parseFloat( incomeToClaim ).toLocaleString('en-US', { style: 'currency', currency: countryCurrency });

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
        {/* <TransactionListItem transactions={transactionsData[0].transactions} /> */}
        <div className={styles.row}>
          <p>Total Income</p>
          <p>{curFormatIncome}</p>
        </div>
        <div className={styles.row}>
          <p>Tax Rate</p>
          <div className={styles.tax_number_container}>
            <input 
              defaultValue={tax} 
              type="number" 
              step="1" 
              suffix="%" 
              onChange={ (e) => setTax(e.target.value) }
            />
            <p className={styles.porcentage}>%</p>
          </div>
        </div>
        <div className={styles.row_total}>
          <p>INCOME TO CLAIM:</p>
          <p>{incomeDisplay}</p>
        </div>
        {showEmailInput && (
          <input id="userEmail" type="email" placeholder="Write your email..." />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FormFourthStep;
