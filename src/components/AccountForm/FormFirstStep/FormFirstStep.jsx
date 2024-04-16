import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { motion, AnimatePresence } from "framer-motion";
// import { useAccount } from 'wagmi';
import { fiatData } from "../../../data/possibleFiat";

const FormFirstStep = ({ currentStep, setAddrOverride, country, setCountry, dates, setDates }) => {

  const [countryNames, setCountryNames] = useState([]);
  useEffect(() => {
    const getCOuntryNames = async () => {
      /*const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      const data = await response.json();*/

      console.log(fiatData);

      // const fiatData = [
      //   {"name":{"common":"Canadian Dollar","official":"CAD","nativeName":{"eng":{"official":"Canada","common":"Canada"},"fra":{"official":"Canada","common":"Canada"}}}}, 
      //   {"name":{"common":"US Dollar","official":"USD","nativeName":{"eng":{"official":"United States of America","common":"United States"}}}},
      //   {"name":{"common":"Euro","official":"EUR","nativeName":{"eng":{"official":"The European Union Currency","common":"Euro"}}}}
      // ]

      //console.log(data);
      // console.log("Order alhabetically by country name:");
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

    // also set default dates? IF NEEDED FOR MORE SIMPLE FORMAT INPUTS TO JS TRANSLATOR

  }, []);

  // set datepicker defaults to 2022
  var curStart = dates.startDate;   // now set on init
  var curEnd = dates.endDate;     // now set on init
  // console.log(curStart, curEnd);
  // var defaultDateStart = curStart.toISOString().substring(0,10);
  // var defaultDateEnd = curEnd.toISOString().substring(0,10);
  // console.log(defaultDateStart, defaultDateEnd);   // OK for format ???

  // confirm dates are valid
  function isValidDate(d) {
    // confirm single entry date is valid (either start or enddate is valid)
    console.log(d);
    return d; // && !isNaN(d);
  }

  function isValidRange(d1, d2) {

    // other tests: is range too big?  
    // is range too small? 
    // is range in future? 
    // is range too far in past (no token data before X)?

    // test for start date before end date
    return (isValidDate(d1) && isValidDate(d2) && (d1 <= d2));
  }

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
                  console.log(e.target.value);
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
                title="Date Selection Coming Soon"
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
                  if(isValidRange(dates.startDate, proposeEnd)){
                    console.log("Valid date range.");
                    setDates({...dates, endDate: proposeEnd});
                  } else {
                    alert("Please enter a valid date range.");
                    console.log("Invalid date range.");
                  }
                }}
                // disabled={true}
                title="Date Selection Coming Soon"
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
