import React from "react";
import styles from "./styles.module.css";
import { useUI } from "../../../context/UIContext";
import TransactionListItemComponent from "./TransactionListItemComponent";

const TransactionListItem = ({ date, transactions }) => {
  const [, { setShowTransactionModal }] = useUI();

  return (
    <div className={styles.list_item_container}>
      <p className={styles.date}>{date}</p>
      {transactions.map((item) => (
        <TransactionListItemComponent
          key={item.id}
          id={item.id}
          avatar_url={item.avatar_url}
          userName={item.userName}
          crypto={item.crypto}
          currency={item.currency}
          onClick={() => setShowTransactionModal(true)}
        />
      ))}
    </div>
  );
};

export default TransactionListItem;
