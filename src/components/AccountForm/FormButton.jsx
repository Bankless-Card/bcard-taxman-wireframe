import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";
import { useAccount } from "wagmi";

import { callAlchemyGo } from "../../functions/callAlchemyGo";  // get tx data on chain for user
import { exportData } from "../../functions/exportData";      // export data to csv
import { convertKitEmail } from "../../functions/convertkit";   // capture user email and address
import { emailData } from "../../functions/emailData";        // send to user email


const FormButton = ({ stepChange, currentStep, addrOverride, setLoading, txData, setTxData, country, activeAssets, tax }) => {
  const [{ showTransactionModal }, { setShowEmailInput }] = useUI();

  const { address, isConnected } = useAccount();

  const isButtonDisabled = showTransactionModal
    ? styles.next_step_button_disabled
    : styles.next_step_button;

  function isValidEmail(addr){
    return addr.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
  }

  async function fetchData(address) {

    console.log("Fetching data for: " + address);

    // country needed for pricing data - default to Canada
    const txDataTemp = await callAlchemyGo(address, addrOverride, country, activeAssets);

    // read and parse data first:
    setTxData(txDataTemp);
    console.log("Updating transaction data.");
    console.log(txDataTemp);

    setLoading(false);    // clear spinner

    return txDataTemp;

  }
  

  const handleFormButton = (currentStep) => {

    if(currentStep === 1){
      console.log("SET Address & Country Code this page.");

      console.log(country);


    } else if(currentStep === 2){
      console.log("Handle step 2 - DAO selection boxes - filter Income TXs for display.");

      // console.log(activeAssets)
      fetchData(address);

    } else if(currentStep === 3){
      
      // display transactions & toggles on screen

      

    } else if(currentStep === 4){
      console.log("Handle step 4 - Sum and Finish.");
        handleStepFour();
    }

    // step counter
    if(currentStep != 4) {
      stepChange(currentStep + 1);
    } 

    return currentStep;
  };

  async function handleStepFour() {

    setShowEmailInput(true);
    console.log("SHOW EMAIL INPUT - FIRST PASS");

    let userEmail = "NO EMAIL";
  
    if( document.getElementById("userEmail") ){
      let emailInput = document.getElementById("userEmail");
      let userEmail = emailInput.value;


      if(userEmail != "" && userEmail != null && isValidEmail(userEmail) ){

        console.log("CAPTURE FROM EMAIL INPUT - SECOND PASS");

        // determine address of connected wallet
        console.log(address);  // ok for address
        let localAddr = address;    // local storage of address variable
        if(!isConnected){
          localAddr = "NOT CONNECTED";
        }

        console.log(activeAssets);

        // BUILD THE CSV DATA OF THE CURRENT INCOME TRASNACTIONS
        let csvData = exportData(country, txData, activeAssets, tax);
        console.log(csvData);   // OK

        
        
        // CALL HERE TO SEND EMAIL DATA TO USER
        let emailOutcome = emailData(country, userEmail, activeAssets, txData, tax, csvData);
        console.log(emailOutcome);

        
        
        // CAPTURE EMAIL WITH CONVERTKIT
        // console.log(userEmail);    // ok for validity conditions
        let storeEmail = await convertKitEmail(userEmail, localAddr);  // flip to convertkit
        console.log(storeEmail); 

  

      }
    } else {
      // no email available
      
    }
    
  
    return userEmail;
  
  }

  if(currentStep === 4) {
    console.log("Sum Up Transactions - handled with a function");

    // console.log("globalTxList: ", globalTxList);
  }

  return (
    <button
      onClick={() => handleFormButton(currentStep)}
      className={isButtonDisabled}
      type="button"
      disabled={showTransactionModal}
    >
      {currentStep === 4 ? "Send to my email" : "Next Step"}
    </button>
  );
};

export default FormButton;
