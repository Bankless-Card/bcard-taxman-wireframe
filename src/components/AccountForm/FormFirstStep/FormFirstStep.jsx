import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";

import { useAccount } from 'wagmi';
import { Web3Button } from '@web3modal/react'

const FormFirstStep = ({ currentStep, setAddrOverride, country, setCountry }) => {

  const { address, isConnected } = useAccount();

  // console.log(country);

  const [countryNames, setCountryNames] = useState([]);
  useEffect(() => {
    const getCOuntryNames = async () => {
      /*const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      const data = await response.json();*/

      const data = [
        {"name":{"common":"Canadian Dollar","official":"CAD","nativeName":{"eng":{"official":"Canada","common":"Canada"},"fra":{"official":"Canada","common":"Canada"}}}}, 
        {"name":{"common":"US Dollar","official":"USD","nativeName":{"eng":{"official":"United States of America","common":"United States"}}}},
        {"name":{"common":"Euro","official":"EUR","nativeName":{"eng":{"official":"The European Union Currency","common":"Euro"}}}}
      ]

      //console.log(data);
      // console.log("Order alhabetically by country name:");
      data.sort((a, b) => {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });

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
          <input 
            className={styles.form_first_step_ETH}
            type="text" 
            defaultValue={address}
            onChange={(e) => 
              {
                setAddrOverride(e.target.value)
                console.log(e.target.value);
            }}
          />
          {/* here give fucntionality to connect the wallet to the button */}
          {/* <button className={styles.connect_wallet_button}>
            Connect Wallet
          </button> */}
          {isConnected ? (
            <p></p>
          ) : (
            <Web3Button />
          )}

          <p className={styles.form_first_step_label}>
            Choose your currency of taxation
          </p>
          <div className={styles.select_container}>
            <select 
              value={country}
              onChange={(e) => {
                setCountry(e.target.value)
                console.log(e.target.value)
              }}
            >
              <option>Country</option>

              {countryNames.map((item) => (
                <option
                  key={item?.name?.common}
                  // disabled={(item?.name?.common === "Canada" || item?.name?.common === "United States") ? false : true}
                  value={item?.name?.official}
                >{item?.name?.common}</option>
              ))}
            </select>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormFirstStep;
