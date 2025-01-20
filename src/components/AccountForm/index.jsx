import React, { useState, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormFirstStep from "./FormFirstStep/FormFirstStep";
import FormSecondStep from "./FormSecondStep/FormSecondStep";
import FormThirdStep from "./FormThirdStep/FormThirdStep";
import FormFourthStep from "./FormFouthStep/FormFouthStep";
import FormFifthStep from "./FormFifthStep/FormFifthStep";
import FormButton from "./FormButton";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";
import StepsButtons from "./StepsButtons";
import TransactionModal from "./TransactionModal/TransactionModal";
import TransactionModalMobile from "./TransactionModal/TransactionModalMobile";

// import { useAccount } from 'wagmi';   // for connected account

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
  // console.log(showTransactionModal, screenSize);

  const [addrOverride, setAddrOverride] = useState("");
  const [country, setCountry] = useState("CAD");
  // assets default: DAO's on, WETH, DAI off
  const [activeAssets, setActiveAssets] = useState(["BANK", "ENS", "1INCH", "ANT", "MKR", "POKT", "POOL","OP", "ARB", "DEGEN", "DAI", "WETH", "USDC",  "USDT"]);
  const [txData, setTxData] = useState([]);
  const [loading, setLoading] = useState(true); // loading state for tx data
  const [activeItem, setActiveItem] = useState(null);     // this holds usable data
  const [isActiveItem, setIsActiveItem] = useState(showTransactionModal);       // this is a boolean for active state
  const [tax, setTax] = useState(20);

  const [finalExport, setFinalExport] = useState("init");

  // NEW setState for STARTDATE
  // NEW setState for ENDDATE (single object with start and end dates is better)
  // set defaults for state such that the defaults will be for 2023 as coded originally
  const defaultStartDate = new Date(2024, 0, 1);
  const defaultEndDate = new Date(2024, 11, 31);
  var defaultDateStart = defaultStartDate.toISOString().substring(0,10);
  var defaultDateEnd = defaultEndDate.toISOString().substring(0,10);
  // console.log(defaultDateStart, defaultDateEnd);   // OK for format ???

  const [dates, setDates] = useState({startDate: defaultDateStart, endDate: defaultDateEnd});

  // const { address, isConnected } = useAccount();

  useEffect(() => {
    // Check if we have stored data
    try {
      const storedData = localStorage.getItem('txData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setTxData(parsedData);
        setLoading(false);
        setStep(2); // Skip to step 2
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
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
                        dates={dates}
                        setDates={setDates}
                      />}
                    {step === 2 && 
                      <FormThirdStep 
                        currentStep={step} 
                        // address={null}
                        txData={txData} 
                        loading={loading}
                        activeAssets={activeAssets}
                        setActiveItem={setActiveItem} 
                        isActiveItem={isActiveItem}
                        setIsActiveItem={setIsActiveItem}
                      />}
                    {step === 3 && 
                      <FormFourthStep 
                        txData={txData} 
                        country={country} 
                        tax={tax}
                        setTax={setTax}
                        finalExport={finalExport}
                      />}

                    {step === 4 && 
                      <FormFifthStep />}
                      
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
                    setFinalExport={setFinalExport}

                    dates={dates}

                    />
                </div>
              </form>
              {/* <div id="output"></div> */}
              {showTransactionModal && screenSize === "large" && (
                <TransactionModal activeItem={activeItem} isActiveItem={isActiveItem} setIsActiveItem={setIsActiveItem} />
              )}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountForm;
