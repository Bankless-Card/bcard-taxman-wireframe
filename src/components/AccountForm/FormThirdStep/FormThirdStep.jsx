import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import TransactionList from "../TransactionList/TransactionList";
import Spinner from "../Spinner";

// I recommend to add a loader spiner while the data is loaading on Transaction List, this is an example
// this settimeOut is to simulate this behavior

const FormThirdStep = ({ currentStep, txData }) => {
  const [loading, setLoading] = useState(true);  

  useEffect(() => {

    // loading timeout - sample not real
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []);
  

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
            We’ve automatically classified your transactions
          </p>
          <p className={styles.form_third_step_label}>
            Verify that each one is correct.
          </p>
          <>{loading ? <Spinner /> : <TransactionList txData={txData} />}</>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default FormThirdStep;
