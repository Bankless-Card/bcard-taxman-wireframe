import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import TransactionList from "../TransactionList/TransactionList";
import Spinner from "../Spinner";

// I recommend to add a loader spiner while the data is loaading on Transaction List, this is an example
// this settimeOut is to simulate this behavior

const FormThirdStep = ({ txData, setActiveItem, loading, isActiveItem, setIsActiveItem, statusText }) => { 

  // console.log(txData);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ delay: 0.15 }}
          className={styles.form_third_step}
        >
          <p className={styles.form_third_step_title}>
            <span>Taxable transactions</span>
          </p>
          <p className={styles.form_third_step_label}>
            Click a line to view details. Mark 'Not Income" if not taxable. Save to record changes.
          </p>
          <>{loading ? <Spinner text={statusText} /> : <TransactionList txData={txData} setActiveItem={setActiveItem} isActiveItem={isActiveItem} setIsActiveItem={setIsActiveItem} />}</>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default FormThirdStep;
