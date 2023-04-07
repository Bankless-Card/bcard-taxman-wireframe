import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";
// import TransactionListItemComponent from "../TransactionList/TransactionListItemComponent";
import TransactionModalButtons from "./TransactionModalButtons";

import { copyToClipboard } from "../../../functions/copyToClipboard";

const TransactionModalMobile = (props) => {
  const [, { setShowTransactionModal }] = useUI();

  let txDate = new Date(props.activeItem.metadata.blockTimestamp);

  function viewSenderOnExplorer(){

  }

  function viewTxOnExplorer(){

  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        exit={{ opacity: 0 }}
        className={styles.transaction_modal_container_mobile_top}
      >
        <div
          style={{ height: "100%" }}
          className={styles.transaction_modal_container_mobile}
        >
          <div className={styles.form_inner_container}>
            {/*close modal*/}
            <div className={styles.close_container}>
              <img
                src="./img/close2.svg"
                onClick={() => setShowTransactionModal(false)}
              />
            </div>
            <div
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              {/* <TransactionListItemComponent
                id={1}
                avatar_url="./img/dao.jpg"
                userName="Bankless DAO"
                crypto="20000 BANKS"
                currency="$48.77 CAD"
              /> */}
              <div>
                <p className={styles.transaction_date}>
                  {/* November 20, 2022 | 18:30 EST */}
                  {txDate.toGMTString()}
                </p>
                <button 
                  className={styles.tx_button}
                  onClick={() => window.open("https://etherscan.io/tx/"+props.activeItem.hash, '_blank')}
                >
                  <p className={styles.tx_button_text}>View TX on Etherscan</p>
                </button>
              </div>
              {/* walllet text  */}
              <div>
                <div className={styles.wallet_container} onClick={copyToClipboard(props.activeItem.from)}>
                  <div className={styles.wallet_container_inner}>
                    <p>From:</p>
                    <p className={styles.wallet_container_inner_walletText}>
                      {props.activeItem.from}
                    </p>
                  </div>
                  <img src="./img/copy.svg" />
                </div>

                <button 
                  className={styles.tx_button}
                  onClick={() => window.open("https://etherscan.io/address/"+walletText, '_blank')}
                >
                  <p className={styles.tx_button_text}>View Sender on Etherscan</p>
                </button>
              </div>
              {/* Income switch */}
              <div className={styles.income_switch}>
                <p>
                  <span>
                    <img src="./img/arrow_up.svg" />
                  </span>
                  Not Income
                </p>
                <label className={styles.switch}>
                <input 
                  type="checkbox" 
                  onChange={() => {
                    console.log("toogleIncomeClicked");
                    props.activeItem.incomeState = !props.activeItem.incomeState;
                  }}
                  defaultChecked={props.activeItem.incomeState}
                />
                  <span className={styles.slider}></span>
                </label>
                <p>
                  <span>
                    <img src="./img/arrow_down.svg" />
                  </span>
                  Income
                </p>
              </div>
            </div>
            <TransactionModalButtons />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionModalMobile;
