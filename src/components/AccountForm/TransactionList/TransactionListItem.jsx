import React, { useState } from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";
import TransactionListItemComponent from "./TransactionListItemComponent";

const TransactionListItem = ({ title, transactions, setActiveItem }) => {
  const [, { setShowTransactionModal }] = useUI();

  // const [activeItem, setActiveItem] = useState(null);

  return (
    <div className={styles.list_item_container}>
      <p className={styles.date}>{title}</p>
      {transactions.map((item) => (
        <TransactionListItemComponent
          key={item.uniqueId}
          id={item.uniqueId}
          img_url={item.img_url}
          tokenLabel={item.tokenLabel}
          crypto={item.crypto}
          currency={item.currency}
          incomeState={item.incomeState}
          onClick={() => 
            {
              setShowTransactionModal(true);
              console.log(item);  // need to add his item to the modal 
              setActiveItem(item);
            }}
        />
      ))}
    </div>
  );
};

export default TransactionListItem;
