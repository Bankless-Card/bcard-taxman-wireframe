import React, { useState } from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";
// import TransactionListItemComponent from "../TransactionList/TransactionListItemComponent";
import TransactionModalButtons from "./TransactionModalButtons";

import { copyToClipboard } from "../../../functions/copyToClipboard";

const TransactionModal = (props) => {
  const [, { setShowTransactionModal }] = useUI();

  // if it is shown already showTransactionModal = true
  // then we need to close the curren tinstance before opening a new one.

  console.log(props.isActiveItem);      // gets the active item ID from the props
  // console.log(props.activeItem);    // gets the active item DATA from the props

  let txDate = new Date(props.activeItem.metadata.blockTimestamp);

  // wallet state
  const [walletText, setWalletText] = useState(props.activeItem.from);

  // // Function for copying
  // function copyToClipboard(text) {
  //   const tempElement = document.createElement("textarea");
  //   tempElement.value = text;
  //   document.body.appendChild(tempElement);

  //   tempElement.select();
  //   tempElement.setSelectionRange(0, 99999);

  //   document.execCommand("copy");

  //   document.body.removeChild(tempElement);
  // }

  // function toggleIncomeClick(){
  //   // also need to buffer the state of the income switch in case CANCEL is pressed and we need to revert

  //   // console.log(props.activeItem.incomeState);
  //   props.activeItem.incomeState = !props.activeItem.incomeState;

  // }

  // console.log(item);

  // NEEDS

  // wallet address for sender link
  // etherscan link - needs tx hash
  // tx date (nice format)

  let txChain = props.activeItem.chain;
  let txHash = props.activeItem.hash;
  let txLink = "https://etherscan.io/tx/" + txHash;   //default eth
  let txText = "View TX on Etherscan";
  let fromAddress = props.activeItem.from;
  let fromLink = "https://etherscan.io/address/" + fromAddress;  //default eth
  let fromText = "View Sender on Etherscan";
  
  // prepare the links per chain
  if(txChain === "Polygon"){
    txLink = "https://polygonscan.com/tx/" + txHash;
    txText = "View TX on Polygonscan";
    fromLink = "https://polygonscan.com/address/" + fromAddress;
    fromText = "View Sender on Polygonscan";
  } else if(txChain === "Optimism"){
    txLink = "https://optimistic.etherscan.io/tx/" + txHash;
    txText = "View TX on OP Etherscan";
    fromLink = "https://optimistic.etherscan.io/address/" + fromAddress;
    fromText = "View Sender on OP Etherscan";
  }


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
              onClick={() => {
                setShowTransactionModal(false);
                console.log("IF not income, highlight in main display list?");
                props.setIsActiveItem(false);
              }}
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
            <div>
              <p className={styles.transaction_date}>
                { txDate.toGMTString() }
              </p>
              <button 
                className={styles.tx_button}
                onClick={() => window.open(txLink, '_blank')}
              >
                <p className={styles.tx_button_text}>
                  {txText}
                </p>
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
                onClick={() => window.open(fromLink, '_blank')}
              >
                <p className={styles.tx_button_text}>
                  {fromText}
                </p>
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
          <TransactionModalButtons setIsActiveItem={props.setIsActiveItem} />
        </div>
      </div>
    </>
  );
};

export default TransactionModal;
