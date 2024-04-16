import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";
// import { useAccount } from "wagmi";

import { 
  callAlchemyGo,
  exportData,
  convertKitEmail,
  emailData
 } from "../../functions";  // import functions


const FormButton = ({ stepChange, currentStep, addrOverride, setLoading, txData, setTxData, country, activeAssets, tax, setFinalExport, dates }) => {
  const [{ showTransactionModal }, { setShowEmailInput }] = useUI();

  // const { address, isConnected } = useAccount();

  const isButtonDisabled = showTransactionModal
    ? styles.next_step_button_disabled
    : styles.next_step_button;

  function isValidEmail(addr){
    return addr.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
  }

  async function fetchData(address) {

    console.log("Fetching data for: " + address);

    // address may be null - if so, use the override address in callAlchemyGo

    // country needed for pricing data - default to Canada
    const txData = await callAlchemyGo(address, addrOverride, country, activeAssets, dates);

    // read and parse data first:
    setTxData(txData);
    console.log("Updating transaction data.");
    console.log(txData);

    setLoading(false);    // clear spinner

    return txData;

  }
  

  const handleFormButton = (currentStep) => {

    if(currentStep === 1){
      console.log("SET Address (Override) & Country Code: "+country+" this page.");


    } else if(currentStep === 2){
      console.log("Handle step 2 - DAO selection boxes - filter Income TXs for display.");

      // console.log(addrOverride)
      fetchData(addrOverride);

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

    if(currentStep === 5){
      // LAST STEP: reset the form
      console.log("Handle step 5 and exit. reset.");
      stepChange(1);
      setFinalExport("init");
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

        // set state of email area to loading
        setFinalExport("loading");

        // determine address of connected wallet
        // console.log(address);  // ok for address
        // let localAddr = address;    // local storage of address variable
        // if(!isConnected){
        //   localAddr = "NOT CONNECTED";
        // }

        console.log(activeAssets);

        // BUILD THE CSV DATA OF THE CURRENT INCOME TRASNACTIONS
        let csvData = exportData(country, txData, activeAssets, tax);
        // console.log(csvData);   // OK

        
        
        // CALL HERE TO SEND EMAIL DATA TO USER
        let emailOutcome = emailData(country, userEmail, activeAssets, txData, tax, csvData, setFinalExport);
        console.log(emailOutcome);

        
        
        // CAPTURE EMAIL WITH CONVERTKIT
        // console.log(userEmail);    // ok for validity conditions
        let storeEmail = await convertKitEmail(userEmail, addrOverride);  // flip to convertkit
        console.log(storeEmail); 

        setFinalExport("completed");

        // set button text to DONE step 5
        stepChange(currentStep + 1);

  

      } else {
        // no email available
        alert("Please enter a valid email address to receive your CSV file.");
      }
    }     
  
    return userEmail;
  
  }

  if(currentStep === 4) {
    // console.log("Sum Up Transactions - handled with a function");

    // console.log("globalTxList: ", globalTxList);
  }

  return (
    <button
      id="formButton"
      onClick={() => handleFormButton(currentStep)}
      className={isButtonDisabled}
      type="button"
      disabled={showTransactionModal}
    >
      {
        currentStep === 4 ? "Send CSV to my email" : 
          currentStep === 5 ? "Done" : "Next Step"
      }
    </button>
  );
};

export default FormButton;
