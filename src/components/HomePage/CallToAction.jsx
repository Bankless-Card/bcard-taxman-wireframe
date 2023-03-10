import React from "react";
import styles from "./styles.module.css";

const CallToAction = () => {
  return (
    <div className={styles.special_button_container}>
      <div className={styles.special_button}>
        <div>
          <p>
            <span>
              {" "}
              <img src="./src/img/click-arrow.png" />
            </span>{" "}
            CLICK HERE TO START
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
