import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

import { possibleAssets, getTokenLabel } from "../../../functions";

const FormSecondStep = ({ currentStep, activeAssets, setActiveAssets }) => {

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
            Which DAOs are you in and which other tokens have you received for work done?
          </p>

          <div className={styles.daos_scrollable_container}>

            {possibleAssets.map((item) => (
              <div key={item} className={styles.row}>
                <input 
                  type="checkbox" 
                  id={item} 
                  defaultChecked={activeAssets.includes(item)}
                  onChange={(e) => setActiveAssets(e.target.checked ? [...activeAssets, item] : activeAssets.filter((asset) => asset !== item))}
                />
                <label htmlFor={item}>{getTokenLabel(item)} ({item})</label>
              </div>
            ))}

          </div>

          <p className={styles.warning}>
            If your DAO doesn´t appear here. You can tweet us:&nbsp;
            <a target="_blank" href="https://twitter.com/getbcard">@getbcard</a>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormSecondStep;
