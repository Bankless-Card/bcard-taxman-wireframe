import React from "react";
import TransactionListItem from "./TransactionListItem";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.css";

//mock data
// for BE/web3 dev its better to use an infinite scroll component here and render data acoording usser scroll to bottom
// I recomend this array in order to render data in a efficient way

const transactionsData = [
  {
    id: 1,
    date: "November 2022",
    transactions: [
      {
        id: 1,
        avatar_url: "./img/dao.jpg",
        userName: "Bankless DAO",
        crypto: "20000 BANKS",
        currency: "$48.77 CAD",
      },
      {
        id: 2,
        avatar_url: "./img/dao.jpg",
        userName: "Bankless DAO",
        crypto: "20000 BANKS",
        currency: "$48.77 CAD",
      },
    ],
  },
  {
    id: 1,
    date: "December 2022",
    transactions: [
      {
        id: 1,
        avatar_url: "./img/dao.jpg",
        userName: "Bankless DAO",
        crypto: "20000 BANKS",
        currency: "$48.77 CAD",
      },
      {
        id: 1,
        avatar_url: "./img/dao.jpg",
        userName: "Bankless DAO",
        crypto: "20000 BANKS",
        currency: "$48.77 CAD",
      },
      {
        id: 1,
        avatar_url: "./img/dao.jpg",
        userName: "Bankless DAO",
        crypto: "20000 BANKS",
        currency: "$48.77 CAD",
      },
      {
        id: 1,
        avatar_url: "./img/dao.jpg",
        userName: "Bankless DAO",
        crypto: "20000 BANKS",
        currency: "$48.77 CAD",
      },
    ],
  },
];
const TransactionList = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className={styles.transaction_list_container}
      >
        {transactionsData.map((item) => (
          <TransactionListItem
            key={item.id}
            date={item.date}
            transactions={item.transactions}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionList;
