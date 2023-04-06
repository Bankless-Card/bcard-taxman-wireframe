import React, { useState, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormFirstStep from "./FormFirstStep/FormFirstStep";
import FormSecondStep from "./FormSecondStep/FormSecondStep";
import FormThirdStep from "./FormThirdStep/FormThirdStep";
import FormFourthStep from "./FormFouthStep/FormFouthStep";
import FormButton from "./FormButton";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";
import StepsButtons from "./StepsButtons";
import TransactionModal from "./TransactionModal/TransactionModal";
import TransactionModalMobile from "./TransactionModal/TransactionModalMobile";

import { useAccount } from 'wagmi';   // for connected account

const AccountForm = () => {
  const [screenSize, setScreenSize] = useState("");
  // This hook is to get the screen size and its used because  its the best way I foun to render the modal on mobile devices
  useLayoutEffect(() => {
    function updateScreenSize() {
      if (window.innerWidth < 768) {
        setScreenSize("small");
      } else {
        setScreenSize("large");
      }
    }

    updateScreenSize(); // Actualiza el estado inicialmente

    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const [{ isCTAclicked, showTransactionModal }] = useUI();
  const [step, setStep] = useState(1);

  const [addrOverride, setAddrOverride] = useState("");
  const [country, setCountry] = useState("Canada");
  const [activeAssets, setActiveAssets] = useState(["BANK","WETH", "DAI"]);
  const [txData, setTxData] = useState([]);
  const [loading, setLoading] = useState(true); // loading state for tx data
  const [activeItem, setActiveItem] = useState(null);
  const [tax, setTax] = useState(100);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    // this obsoleted on index load - triggered on arrival at step 2
    async function fetchData() {

      console.log(address);
      console.log(addrOverride);

      let walletAddress = address;    // this will be 'undefined' if not connected

      if(addrOverride){
        console.log("Using inserted wallet address.");
        walletAddress = addrOverride;
      } else if(typeof address === 'undefined') {
        // set default address to use
        console.log("Using default wallet address.");
        walletAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";   // vitalik
      }

      const txDataTemp = await callAlchemyGo(walletAddress, addrOverride);

      // read and parse data first:
      setTxData(txDataTemp);
      // setLoading(false);
      console.log(txDataTemp);

    }
    //fetchData();
  }, []);

  const classForTransactionModal = showTransactionModal
    ? styles.form_container_with_modal
    : styles.form_container;

  return (
    <AnimatePresence>
      {isCTAclicked && (
        <>
          {screenSize === "small" && showTransactionModal ? (
            <TransactionModalMobile activeItem={activeItem} />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              exit={{ opacity: 0 }}
              className={classForTransactionModal}
            >
              <form style={{ height: "100%" }} title={addrOverride} >
                <div className={styles.form_inner_container}>
                  <StepsButtons currentStep={step} stepChange={setStep} />
                  <div style={{ flex: "1" }}>
                    {step === 1 && 
                      <FormFirstStep 
                        currentStep={step} 
                        setAddrOverride={setAddrOverride} 
                        country={country} 
                        setCountry={setCountry} 
                      />}
                    {step === 2 && 
                      <FormSecondStep 
                        currentStep={step} 
                        activeAssets={activeAssets}
                        setActiveAssets={setActiveAssets}
                      />
                    }
                    {step === 3 && 
                      <FormThirdStep 
                        currentStep={step} 
                        txData={txData} 
                        loading={loading}
                        setActiveItem={setActiveItem} 
                      />}
                    {step === 4 && 
                      <FormFourthStep 
                        txData={txData} 
                        activeAssets={activeAssets}
                        country={country} 
                        tax={tax}
                        setTax={setTax}
                      />}
                  </div>
                  <FormButton 
                    currentStep={step} 
                    stepChange={setStep} 
                    addrOverride={addrOverride} 
                    setLoading={setLoading}
                    txData={txData} 
                    setTxData={setTxData} 
                    activeAssets={activeAssets}
                    country={country}
                    tax={tax}
                    />
                </div>
              </form>
              {/* <div id="output"></div> */}
              {showTransactionModal && screenSize === "large" && (
                <TransactionModal activeItem={activeItem} />
              )}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountForm;
