import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";
import { motion, AnimatePresence } from "framer-motion";

const TitleContent = () => {
  const [{ isCTAclicked }, { setIsCTAclicked }] = useUI();
  return (
    <AnimatePresence>
      {!isCTAclicked && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          exit={{ opacity: 0 }}
          className={styles.homepage_container}
        >
          <div className={styles.title_container}>
            <h1>Taxman</h1>
            <h2>&nbsp;&nbsp; Crypto Income Tax Helper</h2>
          </div>
          <div className={styles.title_paragraph_container}>
            <p className={styles.title_paragraph}>Taxman automatically converts your crypto income to your local currency.</p>
            <ul className={styles.title_benefit_list}>
              <li>
                <b>FAST</b> - calculate your income in 5 minutes
              </li>
              <li>
                <b>FREE</b> - No payment required
              </li>
              <li>
                <b>FLEXIBLE</b> - download a CSV for your tax calculation
              </li>
            </ul>
          </div>
        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            exit={{ opacity: 0 }}
            className={styles.special_button_container_mobile}
            onClick={() => setIsCTAclicked(true)}
          >
            <div className={styles.special_button_mobile}>
              <img src="./img/click-arrow.png" />
              <p>CLICK HERE TO START</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TitleContent;
