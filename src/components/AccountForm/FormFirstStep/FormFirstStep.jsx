import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";
// import { useAccount } from 'wagmi';
import { fiatData } from "../../../data/possibleFiat";

const FormFirstStep = ({ currentStep, setAddrOverride, country, setCountry, dates, setDates }) => {

  const [countryNames, setCountryNames] = useState([]);
  useEffect(() => {
    const getCOuntryNames = async () => {

      fiatData.sort((a, b) => {
        if (a.name.common < b.name.common) {
          return -1;
        }
        if (a.name.common > b.name.common) {
          return 1;
        }
        return 0;
      });

      setCountryNames(fiatData);
    };
    getCOuntryNames();

  }, []);

  var curStart = dates.startDate;   // now set on init
  var curEnd = dates.endDate;     // now set on init

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
          <div>
            <p className={styles.form_first_step_label}>
              What’s your ETH address?
            </p>
            <input 
              className={styles.form_first_step_ETH}
              type="text" 
              defaultValue={null}
              placeholder="Paste your ETH address here (read only)"
              onChange={(e) => 
                {
                  setAddrOverride(e.target.value)
              }}
            />
          </div>
          {/* here give fucntionality to connect the wallet to the button */}
          <div>
            <p className={styles.form_first_step_label}>
              What's your tax currency?
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
                  >{item?.name?.common} ({item?.name?.official})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Add In UI Elements for STARTDATE and ENDDATE picker */}
          <div className={styles.datepickerContainer}>

            <div className={styles.dateSide}>
              <p className={styles.form_first_step_label}>
                What is your year start date?
              </p>
              <input
                className={styles.form_first_step_date}
                type="date"
                placeholder="Start Date"
                defaultValue={curStart}
                onChange={(e) => {
                  console.log("Current Start Date : "+dates.startDate);
                  console.log("Set Start Date to: "+e.target.value);
                  setDates({...dates, startDate: e.target.value});
                }}
                // disabled={true}
                title="Date Selection Now Available"
              />
            </div>
            {/* calendar-picker UI icon */}

            <div style={{clear: "both"}}></div>

            <div className={styles.dateSide}>
              <p className={styles.form_first_step_label}>
              What is your year end date?
              </p>
              <input
                className={styles.form_first_step_date}
                type="date"
                placeholder="End Date"
                defaultValue={curEnd}
                onChange={(e) => {
                  console.log("Current End Date : " + dates.endDate);
                  console.log("Set End Date to: " + e.target.value);
                  // verify range is valid

                  let proposeEnd = e.target.value;
                  console.log("Proposed End Date : " + proposeEnd);

                  setDates({...dates, endDate: proposeEnd});

                  // if(isValidRange(dates.startDate, proposeEnd)){
                  //   console.log("Valid date range.");
                  //   setDates({...dates, endDate: proposeEnd});
                  // } else {
                  //   // alert("Please enter a valid date range.");
                  //   console.log("Invalid date range.");
                  //   setDates({startDate: curStart, endDate: curEnd});
                  // }
                }}
                // disabled={true}
                title="Date Selection Now Available"
              />
            </div>
            {/* calendar-picker UI icon */}

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormFirstStep;
