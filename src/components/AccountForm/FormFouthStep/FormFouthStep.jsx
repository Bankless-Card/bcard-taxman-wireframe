// import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "../../../context/UIContext";
// import TransactionListItem from "../TransactionList/TransactionListItem";
import styles from "./styles.module.css";

// import { finishButton } from "../../../functions";
import { sumTransactions } from "../../../functions/sumTransactions";

import Spinner from "../Spinner";


const FormFourthStep = ({txData, activeAssets, country, tax, setTax, finalExport}) => {
  const [{ showEmailInput }] = useUI();

  let countryCurrency = country;    // set as assigned
  // if(country === "CAD"){
  //   countryCurrency = "CAD";
  // } else if(country === "United States"){
  //   countryCurrency = "USD";
    
  // } else {
  //   countryCurrency = "CAD";  // default
  // }

  let txSumOutput = sumTransactions(txData, activeAssets)
  let txSum = txSumOutput[0];   // this is the total income in FIAT
  let bankSum = txSumOutput[1]; // this is the total BANK income
  let oneInchSum = txSumOutput[2]; // this is the total 1INCH income
  let antSum = txSumOutput[3]; // this is the total ANT income
  let mkrSum = txSumOutput[4]; // this is the total MKR income
  let poktSum = txSumOutput[5]; // this is the total POKT income
  let poolSum = txSumOutput[6]; // this is the total POOL income
  let ensSum = txSumOutput[7]; // this is the total ENS income

  let wethSum = txSumOutput[8]; // this is the total WETH income
  let daiSum = txSumOutput[9]; // this is the total DAI income
  let usdcSum = txSumOutput[10]; // this is the total USDC income

  console.log(txSumOutput, usdcSum);

  function returnNiceFormat(txSum){
    return parseFloat( txSum ).toFixed(2);;
  }


  let niceFormatIncome = returnNiceFormat( txSum );
  let curFormatIncome = parseFloat( txSum ).toLocaleString('en-US', { style: 'currency', currency: countryCurrency });

  let incomeToClaim = tax * niceFormatIncome / 100;     // this is the amount to claim 100% default
  let incomeDisplay = parseFloat( incomeToClaim ).toLocaleString('en-US', { style: 'currency', currency: countryCurrency });

  function finalExportCase(finalExport) {

    console.log(finalExport);

    /* sample fix

    document.getElementById("userEmail")
    .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("finalExport").click();
      }
    });

    */

    function handleEmailFix(event){
      
      // console.log('! RETURN KEYPRESS ERROR BUG. FIX THIS !');

      if (event.keyCode === 13) {
        event.preventDefault();   // this is the fix to remove the default behavour

        document.getElementById("formButton").click();   // this instead redirects the return to click on the finish button.
      }

      return true
    }

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
          href="https://twitter.com/intent/tweet?text=I%20just%20did%20my%20DAO%20Income%20Taxes%20with%20TaxMan%20from%20@BanklessCard%20in%20about%20five%20minutes!%20https://taxman.banklesscard.xyz"
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
        {/* <TransactionListItem transactions={transactionsData[0].transactions} /> */}
        
        {bankSum > 0 && (
          <div className={styles.row}>
            <p>Total BANK</p>
            <p>{returnNiceFormat(bankSum)}</p>
          </div>  
        )}

        {oneInchSum > 0 && (
          <div className={styles.row}>
            <p>Total 1INCH</p>
            <p>{returnNiceFormat(oneInchSum)}</p>
          </div>
        )}

        {antSum > 0 && (
          <div className={styles.row}>
            <p>Total ANT</p>
            <p>{returnNiceFormat(antSum)}</p>
          </div>
        )}

        {mkrSum > 0 && (
          <div className={styles.row}>
            <p>Total MKR</p>
            <p>{returnNiceFormat(mkrSum)}</p>
          </div>
        )}

        {poktSum > 0 && (
          <div className={styles.row}>
            <p>Total POKT</p>
            <p>{returnNiceFormat(poktSum)}</p>
          </div>
        )}

        {poolSum > 0 && (
          <div className={styles.row}>
            <p>Total POOL</p>
            <p>{returnNiceFormat(poolSum)}</p>
          </div>
        )}

        {ensSum > 0 && (
          <div className={styles.row}>
            <p>Total ENS</p>
            <p>{returnNiceFormat(ensSum)}</p>
          </div>
        )}

        {wethSum > 0 && (
          <div className={styles.row}>
            <p>Total WETH</p>
            <p>{returnNiceFormat(wethSum)}</p>
          </div>
        )}

        {daiSum > 0 && (
          <div className={styles.row}>
            <p>Total DAI</p>
            <p>{returnNiceFormat(daiSum)}</p>
          </div>
        )}

        {usdcSum > 0 && (
          <div className={styles.row}>
            <p>Total USDC</p>
            <p>{returnNiceFormat(usdcSum)}</p>
          </div>  
        )}
        
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
