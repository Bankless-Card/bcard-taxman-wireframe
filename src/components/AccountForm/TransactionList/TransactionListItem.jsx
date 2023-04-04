import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";
import TransactionListItemComponent from "./TransactionListItemComponent";

const TransactionListItem = ({ title, transactions }) => {
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
          crypto={item.crypto}
          currency={item.currency}
          onClick={() => setShowTransactionModal(true)}
        />
      ))}
    </div>
  );
};

export default TransactionListItem;
