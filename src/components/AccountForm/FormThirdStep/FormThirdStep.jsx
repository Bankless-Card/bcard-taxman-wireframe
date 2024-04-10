import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import TransactionList from "../TransactionList/TransactionList";
import Spinner from "../Spinner";

// I recommend to add a loader spiner while the data is loaading on Transaction List, this is an example
// this settimeOut is to simulate this behavior

const FormThirdStep = ({ currentStep, txData, setActiveItem, loading, activeAssets }) => { 

  // console.log(address);

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
            <span>Your transactions</span>
          </p>
          <p className={styles.form_third_step_label}>
            Click any line to view details and mark if it's 'Not Income'. Click Save to go to next line.
          </p>
          <>{loading ? <Spinner /> : <TransactionList txData={txData} setActiveItem={setActiveItem} />}</>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default FormThirdStep;
