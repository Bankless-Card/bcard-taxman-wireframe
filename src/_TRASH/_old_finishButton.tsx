import React, { useEffect, useState } from "react";
import cs from '../style.module.css';

// import { emailData } from "./emailData";

// purpose is to sum up the income

export function finishButton(txData:any, activeAssets:any) {

  // const [txData, setTxData] = useState();

  console.log("finish button has been clicked");

  // let assetList = ["BANK", "WETH", "DAI"];

  // output the displayed DAO tokens for summary
  let totalIncome = 0;
  // let totalBalance = 0;

  let totalBANK = 0;
  let totalWETH = 0;
  let totalDAI = 0;

  txData.forEach(chainList => {
    //console.log(chainList);
    console.log(chainList.title);

    chainList.transactions.forEach(tx => {

      if(activeAssets.includes(tx.asset)){
        //its an actively tracked token
        // console.log(tx);

        if(tx.incomeState){
          // console.log("this is an INCOME tx");
          console.log(tx.crypto, tx.currency);

          if(tx.asset === "BANK"){
            totalBANK += tx.value;
          } else if(tx.asset === "WETH"){
            totalWETH += tx.value;
          } else if(tx.asset === "DAI"){
            totalDAI += tx.value;
          }

          totalIncome += parseFloat(tx.currency.split(" ")[1]);
        } else {
          // not income, dont sum it
        }
      }

    });
  });

  console.log("TODO: Create a HDD file to store the user data");
  console.log(totalIncome, totalBANK, totalWETH, totalDAI);

  return [totalIncome, totalBANK, totalWETH, totalDAI];
  
}