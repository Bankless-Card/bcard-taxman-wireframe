import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import { INCOME_STATES } from "../../../data/constants";

const TransactionListItemComponent = ({
  id,
  img_url,
  tokenLabel,
  crypto,
  currency,
  onClick,
  incoming,
  isActiveItem,
  setIsActiveItem,
  item,
}) => {

  const [itemStyles, setItemStyles] = useState(styles.item_container);
  const [localIncomeState, setLocalIncomeState] = useState(item.txType);

  useEffect(() => {
    // console.log(crypto, currency);
    // console.log(isActiveItem);  

    if(isActiveItem){
      setItemStyles(styles.active_item_container);
    } else {
      setItemStyles(styles.item_container);
    }
  }, [isActiveItem]);


  function RenderIncomeSwitcher({txType}) {

    switch (txType) {
      case INCOME_STATES.INCOME:
        return (
          <div className={styles.income_switcher} onClick={toggleIncomeClick}>
            <img style={{ width: "20px" }} src="./img/money-bag.png" alt="income" />
            <br/>income
          </div>
        );
      case INCOME_STATES.EXPENSE:
        return (
          <div className={styles.income_switcher} onClick={toggleIncomeClick}>
            <img style={{ width: "20px" }} src="./img/flying-money.png" alt="expense" />
            <br/>expense
          </div>
        );
      default:
        return (
          <div className={styles.income_switcher} onClick={toggleIncomeClick}>
            <img style={{ width: "20px" }} src="./img/x.png" alt="ignore" />
            <br/>ignore   
          </div>
        );
    }
  }

  function toggleIncomeClick(e){
    e.stopPropagation();
    
    // Cycle through states: INCOME -> EXPENSE -> IGNORE -> INCOME
    switch(item.txType) {
      case INCOME_STATES.INCOME:
        item.txType = INCOME_STATES.EXPENSE;
        break;
      case INCOME_STATES.EXPENSE:
        item.txType = INCOME_STATES.IGNORE;
        break;
      case INCOME_STATES.IGNORE:
        item.txType = INCOME_STATES.INCOME;
        break;
      default:
        item.txType = INCOME_STATES.INCOME;
    }
    
    setLocalIncomeState(item.txType);
  }

    return (
      <div key={id} 
        data-incomestate={localIncomeState} 
        className={itemStyles} 
        onClick={onClick}
        >
        <RenderIncomeSwitcher txType={localIncomeState} />
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
