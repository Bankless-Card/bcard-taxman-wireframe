import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";

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
    const txData = await callAlchemyGo(address, addrOverride, country, dates);

    // Store in localStorage with address and timestamp as part of the key
    const storageKey = `txData`;
    try {
      localStorage.setItem(storageKey, JSON.stringify(txData));
    } catch (error) {
      console.error('Error storing data in localStorage:', error);
    }

    // read and parse data first:
    setTxData(txData);
    setLoading(false);    // clear spinner

    return txData;

  }

  function isValidDate(d) {
    // confirm single entry date is valid (either start or enddate is valid)
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
  

  const handleFormButton = (currentStep) => {

    console.log(currentStep);

    if(currentStep === 1){
      if(isValidRange(dates.startDate, dates.endDate)){
        // can proceed to next step
        localStorage.removeItem('txData');
        setTxData([]);
        setLoading(true);     
        fetchData(addrOverride);   

        stepChange(currentStep + 1);
      } else {
        alert("Please enter valid dates for the range.");
        return currentStep;
      }


    } else if(currentStep === 2){
      // display transactions & toggles on screen
      stepChange(currentStep + 1);

    } else if(currentStep === 3){
      const emailInput = document.getElementById("userEmail");
      if (emailInput) {
        const emailValue = emailInput.value;
        if (emailValue && isValidEmail(emailValue)) {
          handleSendEmail(emailValue).then(() => {
            stepChange(currentStep + 1);
          });
        } else {
          alert("Please enter a valid email.");
          return currentStep;
        }
      }

    } else if(currentStep === 4){
        
    }

    if(currentStep === 4){
      // LAST STEP: reset the form
      console.log("Handle step 4 and exit. reset.");
      stepChange(1);
      setFinalExport("init");
    }

    return currentStep;
  };

  async function handleSendEmail(emailValue) {
    // set state of email area to loading
    setFinalExport("loading");

    // BUILD THE CSV DATA OF THE CURRENT INCOME TRASNACTIONS
    let csvData = exportData(country, txData);
    console.log(csvData);
    
    // CALL HERE TO SEND EMAIL DATA TO USER
    let emailOutcome = emailData(country, emailValue, txData, csvData);

    setFinalExport("completed");
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
        currentStep === 3 ? "Send CSV to my email" : 
          currentStep === 4 ? "Try Another Address" : "Next Step"
      }
    </button>
  );
};

export default FormButton;
