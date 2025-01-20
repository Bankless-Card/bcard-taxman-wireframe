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
  incoming,
  isActiveItem,
  setIsActiveItem,
  item,
}) => {

  const [itemStyles, setItemStyles] = useState(styles.item_container);
  const [localIncomeState, setLocalIncomeState] = useState(item.incomeState);

  useEffect(() => {
    // console.log(crypto, currency);
    // console.log(isActiveItem);  

    if(isActiveItem){
      setItemStyles(styles.active_item_container);
    } else {
      setItemStyles(styles.item_container);
    }
  }, [isActiveItem]);


  function RenderIncomeSwitcher({isIncome=true}) {
    if (isIncome) {
      return (
        <div className={styles.income_switcher} onClick={toggleIncomeClick}>
          <img style={{ width: "20px" }} src="./img/money-bag.png" alt="income" />
          <br/>income
        </div>
      );
    }

    return (
      <div className={styles.income_switcher} onClick={toggleIncomeClick}>
        <img style={{ width: "20px" }} src="./img/x.png" alt="not income" />
        <br/>not income
      </div>
    );
  }

  function toggleIncomeClick(e){
    e.stopPropagation();
    item.incomeState = !item.incomeState;
    setLocalIncomeState(item.incomeState);
  }

    return (
      <div key={id} 
        data-incomestate={localIncomeState} 
        className={itemStyles} 
        onClick={onClick}
        >
        <RenderIncomeSwitcher isIncome={localIncomeState} />
        <div className={styles.avatar_container}>
          <img src={img_url} className={styles.avatar_img} />
          <div className={styles.inner_container}>
            <p className={styles.income_received}>    
              <span>
                <img
                  style={{ width: "10px" }}
                  src={incoming ? "./img/inBadge.png" : "./img/outBadge.png"}
                  alt={incoming ? "received" : "sent"}
                />
              </span>{" "}
              {incoming ? "Received" : "Sent"}
            </p>
            <p className={styles.avatar_userName}>{tokenLabel}</p>

          </div>
        </div>
        <div className={styles.currency_values}>
          <p className={styles.crypto}>{crypto}</p>
          <p className={styles.currency}>{currency}</p>
        </div>
      </div>
    );
};


export default TransactionListItemComponent;
