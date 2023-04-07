import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

function setAssets() {

}

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
            Which DAOs are you part of?
          </p>

          <div className={styles.daos_scrollable_container}>
            <div className={styles.row}>
              <input 
                type="checkbox" 
                id="BANK" 
                defaultChecked={activeAssets.includes("BANK")}
                onChange={(e) => setActiveAssets(e.target.checked ? [...activeAssets, "BANK"] : activeAssets.filter((asset) => asset !== "BANK"))}
              />
              <label htmlFor="BANK">Bankless DAO (BANK)</label>
            </div>            
            <div className={styles.row}>
              {/* <input type="checkbox" id="1INCH" /> */}
              <input 
                type="checkbox" 
                id="1INCH" 
                defaultChecked={activeAssets.includes("1INCH")}
                onChange={(e) => setActiveAssets(e.target.checked ? [...activeAssets, "1INCH"] : activeAssets.filter((asset) => asset !== "1INCH"))}
              />
              <label htmlFor="1INCH">1inch (1INCH)</label>
            </div>
            <div className={styles.row}>
              {/* <input type="checkbox" id="ANT" /> */}
              <input 
                type="checkbox" 
                id="ANT" 
                defaultChecked={activeAssets.includes("ANT")}
                onChange={(e) => setActiveAssets(e.target.checked ? [...activeAssets, "ANT"] : activeAssets.filter((asset) => asset !== "ANT"))}
              />
              <label htmlFor="ANT">Aragon (ANT)</label>
            </div>
            <div className={styles.row}>
              {/* <input type="checkbox" id="MKR" /> */}
              <input 
                type="checkbox" 
                id="MKR" 
                defaultChecked={activeAssets.includes("MKR")}
                onChange={(e) => setActiveAssets(e.target.checked ? [...activeAssets, "MKR"] : activeAssets.filter((asset) => asset !== "MKR"))}
              />
              <label htmlFor="MKR">Maker DAO (MKR)</label>
            </div>
            <div className={styles.row}>
              {/* <input type="checkbox" id="POKT" /> */}
              <input 
                type="checkbox" 
                id="POKT" 
                defaultChecked={activeAssets.includes("POKT")}
                onChange={(e) => setActiveAssets(e.target.checked ? [...activeAssets, "POKT"] : activeAssets.filter((asset) => asset !== "POKT"))}
              />
              <label htmlFor="POKT">Pocket DAO (POKT)</label>
            </div>
            <div className={styles.row}>
              {/* <input type="checkbox" id="POOL" /> */}
              <input 
                type="checkbox" 
                id="POOL" 
                defaultChecked={activeAssets.includes("POOL")}
                onChange={(e) => setActiveAssets(e.target.checked ? [...activeAssets, "POOL"] : activeAssets.filter((asset) => asset !== "POOL"))}
              />
              <label htmlFor="POOL">Pool Together (POOL)</label>
            </div>
            <div className={styles.row}>
              <input 
                type="checkbox" 
                id="DAI" 
                defaultChecked={activeAssets.includes("DAI")}
                onChange={(e) => setActiveAssets(e.target.checked ? [...activeAssets, "DAI"] : activeAssets.filter((asset) => asset !== "DAI"))}
              />
              <label htmlFor="DAI">DAI</label>
            </div>
            <div className={styles.row}>
              <input 
                type="checkbox" 
                id="WETH" 
                defaultChecked={activeAssets.includes("WETH")}
                onChange={(e) => setActiveAssets(e.target.checked ? [...activeAssets, "WETH"] : activeAssets.filter((asset) => asset !== "WETH"))}
              />
              <label htmlFor="WETH">WETH</label>
            </div>
          </div>

          <p className={styles.warning}>
            If your DAO doesn´t appear here. You can tweet us:&nbsp;
            <a href="https://twitter.com/BanklessCard">@BanklessCard</a>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormSecondStep;
