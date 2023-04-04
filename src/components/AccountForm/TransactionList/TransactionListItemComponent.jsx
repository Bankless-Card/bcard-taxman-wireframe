import React from "react";
import styles from "./styles.module.css";

const tokenLabelList = [
  "Bankless DAO",
  "Wrapped Ether",
  "DAI Stablecoin",
  "Bankless DAO",
  "Bankless DAO",
  "Bankless DAO",
  "Bankless DAO",
];

const TransactionListItemComponent = ({
  id,
  img_url,
  tokenLabel,
  crypto,
  currency,
  onClick,
}) => {
  if(tokenLabelList.includes(tokenLabel)){

    // console.log(img_url,tokenLabel,crypto,currency);
    // render the item
    return (
      <div key={id} className={styles.item_container} onClick={onClick}>
        <div className={styles.avatar_container}>
          <img src={img_url} className={styles.avatar_img} />
          <div className={styles.inner_container}>
            <p className={styles.avatar_userName}>{tokenLabel}</p>
            <p className={styles.income_received}>
              <span>
                {" "}
                <img
                  style={{ width: "10px" }}
                  src="./img/inBadge.png"
                  alt="icon"
                />
              </span>{" "}
              Income | Received
            </p>
          </div>
        </div>
        <div>
          <p className={styles.crypto}>{crypto}</p>
          <p className={styles.currency}>{currency}</p>
        </div>
      </div>
    );
  } else {
    // skip them all
    return (<></>);
  }
};


export default TransactionListItemComponent;
