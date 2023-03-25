import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

const FormFirstStep = ({ currentStep }) => {
  const [countryNames, setCountryNames] = useState([]);
  useEffect(() => {
    const getCOuntryNames = async () => {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      const data = await response.json();
      setCountryNames(data);
    };
    getCOuntryNames();
  }, []);

  return (
    <AnimatePresence>
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ delay: 0.15 }}
          className={styles.form_first_step}
        >
          <p className={styles.form_first_step_title}>
            Let’s start with some questions!
          </p>
          <p className={styles.form_first_step_label}>
            What’s your ETH address?
          </p>
          <input type="text" />
          {/* here give fucntionality to connect the wallet to the button */}
          <button className={styles.connect_wallet_button}>
            Connect Wallet
          </button>
          <p className={styles.form_first_step_label}>
            Choose your country for pay taxes
          </p>
          <div className={styles.select_container}>
            <select>
              <option value="">Country</option>

              {countryNames.map((item) => (
                <option>{item?.name?.common}</option>
              ))}
            </select>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormFirstStep;
