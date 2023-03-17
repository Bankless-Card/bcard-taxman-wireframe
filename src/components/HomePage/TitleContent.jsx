import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";
import { motion, AnimatePresence } from "framer-motion";

const TitleContent = () => {
  const [{ isCTAclicked }, { setIsCTAclicked }] = useUI();
  return (
    <AnimatePresence>
      {!isCTAclicked && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.title_container}>
            <h1>Taxman</h1>
            <div>
              <h2>DAO Income</h2>
              <h2>Tax Helper</h2>
            </div>
          </div>
          <p className={styles.title_paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id
            pellentesque augue. Nam semper nisi vitae pulvinar faucibus.
            Suspendisse tempor ultrices sodales.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            exit={{ opacity: 0 }}
            className={styles.special_button_container_mobile}
            onClick={() => setIsCTAclicked(true)}
          >
            <div className={styles.special_button_mobile}>
              <img src="./img/click-arrow.png" />
              <p>CLICK HERE TO START</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TitleContent;
