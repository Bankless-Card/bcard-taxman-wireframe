// import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "../../../context/UIContext";
import styles from "./styles.module.css";
import { sumTransactions } from "../../../functions/sumTransactions";
import Spinner from "../Spinner";

const FormFourthStep = ({txData, activeAssets, country, tax, setTax, finalExport}) => {
  const [{ showEmailInput }] = useUI();

  let countryCurrency = country;    // set as assigned
  let txSumOutput = sumTransactions(txData, activeAssets);    // all data in this object
  let txSum = txSumOutput.ALL;   // this is the total income in FIAT

  function handleEmailFix(event){
      
    // console.log('! RETURN KEYPRESS ERROR BUG. FIX THIS !');

    if (event.keyCode === 13) {
      event.preventDefault();   // this is the fix to remove the default behavour

      document.getElementById("formButton").click();   // this instead redirects the return to click on the finish button.
    }

    return true
  }

  function finalExportCase(finalExport) {

    // console.log(finalExport);

    /* sample fix

    document.getElementById("userEmail")
    .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("finalExport").click();
      }
    });

    */

    

    let defaultState = (
      <div id="finalExport" className={styles.email_input}>
        <p>Enter your email to receive a CSV export of all of your DAO income tax transactions (required for most tax jurisdictions)</p>
        <input 
          id="userEmail" 
          type="email" 
          placeholder="Write your email..." 
          onKeyDown={(e) => handleEmailFix(e) }
          /> 
      </div>
    );

    let loadingDisplay = <Spinner />;

    let finishDisplay = (
      <div className={styles.email_input_done}>
        <h2>You have mail! </h2>
        <p>If you found TaxMan useful, please tell your friends.</p>
        <a 
          target="_blank"
          className="twitter-share-button"
          href="https://twitter.com/intent/tweet?text=I%20just%20did%20my%20DAO%20Income%20Taxes%20with%20TaxMan%20from%20@GetBCard%20in%20about%20five%20minutes!%20https://taxman.getbcard.io"
          data-size="large">
            <img src="img/twitter-logo.png" alt="twitter-logo" style={{ width:"80px", margin: "0 20px"}}/>
            <p>Share on Twitter</p>
        </a>
      </div>
    );


    switch(finalExport) {
      case "init":
        return defaultState;
      case "loading":
        return loadingDisplay;
      case "completed":
        return finishDisplay;
      default:
        return loadingDisplay;
    }
  }

  function returnNiceFormat(txSum){
    return parseFloat( txSum ).toFixed(2);
  }

  function TokenRowReturn({tokenSum, tokenName}){

    // console.log(tokenSum, tokenName);

    if(tokenSum > 0) {
      return (
        <div className={styles.row}>
          <p>Total {tokenName}</p>
          <p>{returnNiceFormat(tokenSum)}</p>
        </div>  
      )
    } else {
      return null;
    }
  }


  let niceFormatIncome = returnNiceFormat( txSum );
  let curFormatIncome = parseFloat( txSum ).toLocaleString('en-US', { style: 'currency', currency: countryCurrency });

  let incomeToClaim = tax * niceFormatIncome / 100;     // this is the amount to claim 100% default
  let incomeDisplay = parseFloat( incomeToClaim ).toLocaleString('en-US', { style: 'currency', currency: countryCurrency });

  

  

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ delay: 0.15 }}
        className={styles.fourth_step_container}
      >
        <p className={styles.form_fourth_step_title}>Your Income Claim</p>

        {activeAssets.map((asset, index) => {
          // console.log(asset);
          return (
            <TokenRowReturn key={index} tokenSum={txSumOutput[asset]} tokenName={asset} />
          );
        })}
        
        <hr />

        <div className={styles.row_total}>
          <p>Total Income</p>
          <p>{curFormatIncome}</p>
        </div>

        <div className={styles.row}>
          <p>Tax Rate</p>
          <div className={styles.tax_number_container}>
            <input 
              defaultValue={tax} 
              type="number" 
              step="1" 
              suffix="%" 
              onChange={ (e) => setTax(e.target.value) }
            />
            <p className={styles.porcentage}>%</p>
          </div>
        </div>

        <div className={styles.row_total}>
          <p>TOTAL TAX OWED:</p>
          <p>{incomeDisplay}</p>
        </div>

        {showEmailInput && finalExportCase(finalExport)}

        {/* {(showEmailInput && finalExport === "init") && (
          <div id="finalExport" className={styles.email_input}>
            <p>Enter your email to receive a CSV export of all of your DAO income tax transactions (required for most tax jurisdictions)</p>
            <input id="userEmail" type="email" placeholder="Write your email..." /> 
          </div>
        )} */}
      </motion.div>
    </AnimatePresence>
  );
};

export default FormFourthStep;
