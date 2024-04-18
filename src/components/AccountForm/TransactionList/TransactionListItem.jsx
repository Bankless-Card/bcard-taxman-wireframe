import React, { useState } from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";
import TransactionListItemComponent from "./TransactionListItemComponent";

const TransactionListItem = ({ title, transactions, setActiveItem, isActiveItem, setIsActiveItem }) => {
  const [, { setShowTransactionModal }] = useUI();
  // const [isActive, setIsActive] = useState(false);

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

          isActiveItem={isActiveItem}
          setIsActiveItem={setIsActiveItem}

          onClick={(e) => 
            {
              setShowTransactionModal(true);
              console.log(item);  // need to add this item to the state 
              setActiveItem(item);
              setIsActiveItem(true);
            }}
        />
      ))}
    </div>
  );
};

export default TransactionListItem;
