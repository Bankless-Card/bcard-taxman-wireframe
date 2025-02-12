import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUI } from "../../../context/UIContext";
import styles from "./styles.module.css";
import { sumTransactions } from "../../../functions/sumTransactions";
import Spinner from "../Spinner";

const FormFourthStep = ({txData, country, finalExport}) => {
  const [{ showEmailInput }] = useUI();

  const [ showClaimInfo, setShowClaimInfo ] = useState(false);


  let countryCurrency = country;    // set as assigned
  let txSums = sumTransactions(txData);    // all data in this object
  let txSumOutput = txSums[0];
  let fiatSumOutput = txSums[1];
  let txSum = txSumOutput.ALL;   // this is the total income in FIAT

  function handleEmailFix(event){
      
    // console.log('! RETURN KEYPRESS ERROR BUG. FIX THIS !');

    if (event.keyCode === 13) {
      event.preventDefault();   // this is the fix to remove the default behavour

      document.getElementById("formButton").click();   // this instead redirects the return to click on the finish button.
    }

    return true
  }

  function finalExportCase() {

    return (
      <div id="finalExport" className={styles.email_input}>
        <p>Enter your email to receive a CSV export of your transactions</p>
        <input 
          id="userEmail" 
          type="email" 
          placeholder="Write your email..." 
          onKeyDown={(e) => handleEmailFix(e) }
          /> 
      </div>
    );

  }

  function returnNiceFormat(txSum){
    return parseFloat( txSum ).toFixed(2);
  }

  function TokenRowReturn({tokenSum, tokenName, fiatSum}){

    // console.log(tokenSum, tokenName);

    if(tokenSum > 0) {
      return (
        <div className={styles.row}>
          <p>{returnNiceFormat(tokenSum)} {tokenName}</p>
          <p>{parseFloat( fiatSum ).toLocaleString('en-US', { style: 'currency', currency: countryCurrency })}</p>
        </div>  
      )
    } else {
      return null;
    }
  }

  let curFormatIncome = parseFloat( txSum ).toLocaleString('en-US', { style: 'currency', currency: countryCurrency });
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ delay: 0.15 }}
        className={styles.fourth_step_container}
      >
        <p className={styles.form_fourth_step_title}>Your Income</p>
        <div className={styles.token_income_list}>
        {Object.entries(txSumOutput).map(([asset, tokenSum]) => (
          ( asset != "ALL" ) ? 
          <TokenRowReturn key={asset} tokenSum={tokenSum} tokenName={asset} fiatSum={fiatSumOutput[asset]} />
          : null
        ))}
        </div>
        <hr />

        <div className={styles.row_total}>
          <p>Total Taxable Income</p>
          <p>{curFormatIncome}</p>
        </div>

        {showEmailInput && finalExportCase(finalExport)}

      </motion.div>
    </AnimatePresence>
  );
};

export default FormFourthStep;
