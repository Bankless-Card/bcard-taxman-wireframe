import React, { useState } from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";
import TransactionListItemComponent from "./TransactionListItemComponent";

const TransactionListItem = ({ title, transactions, setActiveItem }) => {
  const [, { setShowTransactionModal }] = useUI();

  // console.log(transactions);

  return (
    <div className={styles.list_item_container}>
      <p className={styles.date}>{title}</p>
      {transactions.map((item) => (
        <TransactionListItemComponent
          key={item.uniqueId}
          id={item.uniqueId}
          img_url={item.img_url}
          tokenLabel={item.tokenLabel}
          asset={item.asset}
          crypto={item.crypto}
          currency={item.currency}
          incomeState={item.incomeState}

          onClick={() => 
            {
              setShowTransactionModal(true);
              console.log(item);  // need to add this item to the state 
              setActiveItem(item);
            }}
        />
      ))}
    </div>
  );
};

export default TransactionListItem;
