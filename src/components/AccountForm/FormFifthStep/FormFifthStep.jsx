import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";

const FormFifthStep = ({txData, activeAssets, country, tax, setTax, finalExport}) => {
    return(
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ delay: 0.15 }}
          className={styles.form_fifth_step}
        >
            <div className={styles.email_input_done}>
                <h2>You have mail! </h2>
                <p>If you found TaxMan useful, please tell your friends.</p>
                <a 
                  target="_blank"
                  className="twitter-share-button"
                  href="https://twitter.com/intent/tweet?text=I%20just%20did%20my%20crypto%20Income%20Taxes%20with%20TaxMan%20from%20@GetBCard%20in%20about%20five%20minutes!%20https://taxman.getbcard.io"
                  data-size="large">
                      <img src="img/twitter-logo.png" alt="twitter-logo" style={{ width:"80px", margin: "0 20px"}}/>
                      <p>Share on Twitter</p>
                </a>
                <br/>
                <a 
                  target="_blank"
                  className="twitter-share-button"
                  href="https://warpcast.com/~/compose?text=I%20just%20did%20my%20crypto%20Income%20Taxes%20with%20TaxMan%20from%20/BCard%20in%20about%20five%20minutes!&embeds[]=https://taxman.getbcard.io"
                  data-size="large">
                      <img src="img/warpcast_logo_white.png" alt="warpcast-logo" style={{ width:"80px", margin: "0 20px"}} /> 
                      <p>Share on Warpcast</p>
                </a>
            </div>
        </motion.div>
      </AnimatePresence>
    )
}   

export default FormFifthStep;
