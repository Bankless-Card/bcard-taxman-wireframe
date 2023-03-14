import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormFirstStep from "./FormFirstStep/FormFirstStep";
import FormSecondStep from "./FormSecondStep/FormSecondStep";
import FormThirdStep from "./FormThirdStep/FormThirdStep";
import FormFourthStep from "./FormFouthStep/FormFouthStep";
import FormButton from "./FormButton";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";
import StepsButtons from "./StepsButtons";

const AccountForm = () => {
  const [{ isCTAclicked }] = useUI();
  const [step, setStep] = useState(1);

  return (
    <AnimatePresence>
      {isCTAclicked && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          exit={{ opacity: 0 }}
          className={styles.form_container}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountForm;
