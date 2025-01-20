import React, { useState } from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";
import TransactionListItemComponent from "./TransactionListItemComponent";

const TransactionListItem = ({ title, transactions, setActiveItem, isActiveItem, setIsActiveItem }) => {
  const [, { setShowTransactionModal }] = useUI();

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
          item={item}
          incoming={item.incoming}

          setActiveItem={setActiveItem}
          isActiveItem={isActiveItem}
          setIsActiveItem={setIsActiveItem}

          onClick={() => 
            {
              setShowTransactionModal(true);
              setActiveItem(item);
              setIsActiveItem(true);
            }}
        />
      ))}
    </div>
  );
};

export default TransactionListItem;
