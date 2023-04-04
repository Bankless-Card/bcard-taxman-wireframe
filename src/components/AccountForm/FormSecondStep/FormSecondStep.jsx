import React, { useState, useEffect } from "react";
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

          <div className={styles.daos_scrollable_container}>
            <div className={styles.row}>
              <input type="checkbox" id="BANK" checked />
              <label htmlFor="BANK">Bankless DAO (BANK)</label>
            </div>
            <div className={styles.row}>
              <input type="checkbox" id="DAI" checked />
              <label htmlFor="DAI">DAI</label>
            </div>
            <div className={styles.row}>
              <input type="checkbox" id="WETH" checked />
              <label htmlFor="WETH">WETH</label>
            </div>
            <div className={styles.row}>
              <input type="checkbox" id="1INCH" />
              <label htmlFor="1INCH">1inch (1INCH)</label>
            </div>
            <div className={styles.row}>
              <input type="checkbox" id="ANT" />
              <label htmlFor="ANT">Aragon (ANT)</label>
            </div>
            <div className={styles.row}>
              <input type="checkbox" id="MKR" />
              <label htmlFor="MKR">Maker DAO (MKR)</label>
            </div>
            <div className={styles.row}>
              <input type="checkbox" id="POKT" />
              <label htmlFor="POKT">Pocket DAO (POKT)</label>
            </div>

            <div className={styles.row}>
              <input type="checkbox" id="POOL" />
              <label htmlFor="POOL"> Pool Together (POOL)</label>
            </div>
          </div>

          <p className={styles.warning}>
            If your DAO doesn´t appear here. You can tweet @us:
            twitter.com/BanklessCard
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormSecondStep;
