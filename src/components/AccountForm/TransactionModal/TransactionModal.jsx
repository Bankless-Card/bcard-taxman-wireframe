import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";
import TransactionListItemComponent from "../TransactionList/TransactionListItemComponent";
import TransactionModalButtons from "./TransactionModalButtons";

const TransactionModal = () => {
  const [, { setShowTransactionModal }] = useUI();
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
            <TransactionListItemComponent
              id={1}
              avatar_url="./img/dao.jpg"
              userName="Bankless DAO"
              crypto="20000 BANKS"
              currency="$48.77 CAD"
            />
            <div>
              <p className={styles.transaction_date}>
                November 20, 2022 | 18:30 EST
              </p>
              <button className={styles.tx_button}>
                <p className={styles.tx_button_text}>View TX on Etherscan</p>
              </button>
            </div>
            {/* walllet text  */}
            <div>
              <div className={styles.wallet_container}>
                <div className={styles.wallet_container_inner}>
                  <p>From:</p>
                  <p className={styles.wallet_container_inner_walletText}>
                    0xb794f5ea0ba39494ce839613fffba74279579268
                  </p>
                </div>
                <img src="./img/copy.svg" />
              </div>

              <button className={styles.tx_button}>
                <p className={styles.tx_button_text}>View TX on Etherscan</p>
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
              <label class={styles.switch}>
                <input type="checkbox" checked />
                <span class={styles.slider}></span>
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
