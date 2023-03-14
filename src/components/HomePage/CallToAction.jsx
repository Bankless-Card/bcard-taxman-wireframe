import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";

const CallToAction = () => {
  const [{ isCTAclicked }, { setIsCTAclicked }] = useUI();

  return (
    <AnimatePresence>
      {!isCTAclicked && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            exit={{ opacity: 0 }}
            className={styles.special_button_container_mobile}
          >
            <div className={styles.special_button_mobile}>
              <img src="./src/img/click-arrow.png" />
              <p>CLICK HERE TO START</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            exit={{ opacity: 0 }}
            className={styles.special_button_container}
          >
            <div
              className={styles.special_button}
              onClick={() => setIsCTAclicked(true)}
            >
              <div>
                <p>
                  <span>
                    {" "}
                    <img src="./src/img/click-arrow.png" />
                  </span>{" "}
                  CLICK HERE TO START
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CallToAction;
