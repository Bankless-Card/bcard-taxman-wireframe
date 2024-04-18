import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";

const TransactionListItemComponent = ({
  id,
  img_url,
  tokenLabel,
  crypto,
  currency,
  onClick,
  incomeState,
  isActiveItem,
  setIsActiveItem,
}) => {

  const [itemStyles, setItemStyles] = useState(styles.item_container);

  useEffect(() => {
    // console.log(crypto, currency);
    // console.log(isActiveItem);  

    if(isActiveItem){
      setItemStyles(styles.active_item_container);
    } else {
      setItemStyles(styles.item_container);
    }
  }, [isActiveItem]);

  if(incomeState){
    // render the item if it is flagged as income

    return (
      <div key={id} 
        data-incomestate={incomeState} 
        className={itemStyles} 
        onClick={onClick}
        >
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
              Income
            </p>

          </div>
        </div>
        <div>
          <p className={styles.crypto}>{crypto}</p>
          <p className={styles.currency}>{currency}</p>
        </div>
      </div>
    );
  } else if(tokenLabel) { 
    // if it has a token label then it is an active asset.
    // console.log("tokenLabel", tokenLabel);

    return (
      <div key={id} 
        data-incomestate={incomeState} 
        className={itemStyles} 
        onClick={onClick}
        >
        <div className={styles.avatar_container}>
          <img src={img_url} className={styles.avatar_img} />
          <div className={styles.inner_container}>
            <p className={styles.avatar_userName}>{tokenLabel}</p>

            <p className={styles.income_received}>    
              <span>
                {" "}
                <img
                  style={{ width: "10px" }}
                  src="./img/close2.svg"
                  alt="not income"
                />
              </span>{" "}
              Not Income
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
