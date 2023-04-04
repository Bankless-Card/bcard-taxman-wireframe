import React, { useState } from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";
import TransactionListItemComponent from "../TransactionList/TransactionListItemComponent";
import TransactionModalButtons from "./TransactionModalButtons";

const TransactionModal = () => {
  const [, { setShowTransactionModal }] = useUI();

  // wallet state
  const [walletText, setWalletText] = useState(
    "0xb794f5ea0ba39494ce839613fffba74279579268"
  );

  // Function for coying
  function copyToClipboard(text) {
    const tempElement = document.createElement("textarea");
    tempElement.value = text;
    document.body.appendChild(tempElement);

    tempElement.select();
    tempElement.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(tempElement);
  }

  // console.log(item);

  return (
    <>
      <div
        style={{ height: "100%" }}
        className={styles.transaction_modal_container}
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
                November 20, 2022 | 18:30 EST
              </p>
              <button 
                className={styles.tx_button}
                onClick={() => window.open("https://etherscan.io/tx/0xa3f0d915fe0099471d567b2e8b0e540c2c3215563767b18dd000bbecf6a84446", '_blank')}
              >
                <p className={styles.tx_button_text}>View TX on Etherscan</p>
              </button>
            </div>
            {/* walllet text  */}
            <div>
              <div
                className={styles.wallet_container}
                onClick={() => copyToClipboard(walletText)}
              >
                <div className={styles.wallet_container_inner}>
                  <p>From:</p>
                  <p className={styles.wallet_container_inner_walletText}>
                    {walletText}
                  </p>
                </div>
                <img src="./img/copy.svg" alt="Copy icon" />
              </div>

              <button 
                className={styles.tx_button}
                onClick={() => window.open("https://etherscan.io/address/0x522d634b6bffb444fdbcde5932738995a4cfd1f1", '_blank')}
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
                <input type="checkbox" />
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
    </>
  );
};

export default TransactionModal;
