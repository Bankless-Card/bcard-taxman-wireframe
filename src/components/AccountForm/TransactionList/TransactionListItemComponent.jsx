import React from "react";
import styles from "./styles.module.css";

const TransactionListItemComponent = ({
  id,
  avatar_url,
  userName,
  crypto,
  currency,
  onClick,
}) => {
  return (
    <div key={id} className={styles.item_container} onClick={onClick}>
      <div className={styles.avatar_container}>
        <img src={avatar_url} className={styles.avatar_img} />
        <div className={styles.inner_container}>
          <p className={styles.avatar_userName}>{userName}</p>
          <p className={styles.income_received}>Income | Received</p>
        </div>
      </div>
      <div>
        <p className={styles.crypto}>{crypto}</p>
        <p className={styles.currency}>{currency}</p>
      </div>
    </div>
  );
};

export default TransactionListItemComponent;
