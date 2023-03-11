import React from "react";
import styles from "./styles.module.css";

const TransactionListItem = ({ date, transactions }) => {
  return (
    <div className={styles.list_item_container}>
      <p className={styles.date}>{date}</p>
      {transactions.map((item) => (
        <div key={item.id} className={styles.item_container}>
          <div className={styles.avatar_container}>
            <img src={item.avatar_url} className={styles.avatar_img} />
            <div className={styles.inner_container}>
              <p className={styles.avatar_userName}>{item.userName}</p>
              <p className={styles.income_received}>Income | Received</p>
            </div>
          </div>
          <div>
            <p className={styles.crypto}>{item.crypto}</p>
            <p className={styles.currency}>{item.currency}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionListItem;
