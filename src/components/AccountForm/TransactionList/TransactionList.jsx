import React from "react";
import TransactionListItem from "./TransactionListItem";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";

// import { alchemyGo } from "../../../functions/alchemyGo";

//mock data
// for BE/web3 dev its better to use an infinite scroll component here and render data acoording usser scroll to bottom
// I recomend this array in order to render data in a efficient way


const TransactionList = ({txData}) => {

  // console.log(txData);
  // txData contains all three networks data

  // let ethObj = {
  //   id: 3,
  //   date: "Ethereum Mainnet",
  //   transactions: txData,
  // }

  // let myData = [];    // set to first data  
 
  // myData.push(ethObj);
  // console.log(myData);  

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className={styles.transaction_list_container}
      >
        {txData.map((item) => (
          <TransactionListItem
            key={item.id}
            title={item.title}
            transactions={item.transactions}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionList;
