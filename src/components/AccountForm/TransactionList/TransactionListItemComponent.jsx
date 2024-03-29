import React from "react";
import styles from "./styles.module.css";

const TransactionListItemComponent = ({
  id,
  img_url,
  tokenLabel,
  crypto,
  currency,
  onClick,
  incomeState,
}) => {
  if(incomeState){
    // render the item

    // console.log(crypto, currency);

    return (
      <div key={id} data-incomestate={incomeState} className={styles.item_container} onClick={onClick}>
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
                  alt="income"
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
