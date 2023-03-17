import React, { useState, useLayoutEffect } from "react";
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

  const classForTransactionModal = showTransactionModal
    ? styles.form_container_with_modal
    : styles.form_container;

  return (
    <AnimatePresence>
      {isCTAclicked && (
        <>
          {screenSize === "small" && showTransactionModal ? (
            <TransactionModalMobile />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              exit={{ opacity: 0 }}
              className={classForTransactionModal}
            >
              <form style={{ height: "100%" }}>
                <div className={styles.form_inner_container}>
                  <StepsButtons currentStep={step} stepChange={setStep} />
                  <div style={{ flex: "1" }}>
                    {step === 1 && <FormFirstStep currentStep={step} />}
                    {step === 2 && <FormSecondStep currentStep={step} />}
                    {step === 3 && <FormThirdStep currentStep={step} />}
                    {step === 4 && <FormFourthStep />}
                  </div>
                  <FormButton currentStep={step} stepChange={setStep} />
                </div>
              </form>
              {showTransactionModal && screenSize === "large" && (
                <TransactionModal />
              )}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountForm;
