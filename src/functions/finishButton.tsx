import React, { useEffect, useState } from "react";
import cs from '../style.module.css';

// import { emailData } from "./emailData";

export function finishButton(txData:any) {

  // const [txData, setTxData] = useState();

  console.log("finish button has been clicked");

  let assetList = ["BANK", "WETH", "DAI"];

  // output the displayed DAO tokens for summary
  let totalIncome = 0;
  let totalBalance = 0;

  let totalBANK = 0;
  let totalWETH = 0;
  let totalDAI = 0;

  txData.forEach(chainList => {
    //console.log(chainList);
    console.log(chainList.title);

    chainList.transactions.forEach(tx => {

      if(assetList.includes(tx.asset)){
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

  // call the function to build the csv

  // call the function to capture the user email and wallet address

  // call the function to send the user the email with the csv

  // function isValidEmail(addr:any){
  //   return addr.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
  // }

  // let emailInput = "tom@tom.com"; // document.getElementById("userEmail") as HTMLInputElement;

  // // check for validity of email
  // if(emailInput != "" && emailInput != null && isValidEmail(emailInput) ){
  //   // determine address of connected wallet
  //   // console.log(address);  // ok for address
  //   // let localAddr = address;
  //   // if(!isConnected){
  //   //   localAddr = "NOT CONNECTED";
  //   // }
    
  //   // capture email with convert kit
  //   console.log(emailInput);    // ok for validity conditions
  //   // let storeEmail = await convertKitEmail(emailInput.value, localAddr);  // flip to convertkit
  //   // console.log(storeEmail); 

  //   // CALL HERE TO SEND EMAIL DATA TO USER
  //   let emailOutcome = emailData(emailInput, txData);
  //   console.log(emailOutcome);

  // }

  

  /* Everything else afer here obsolete? */
  /* redo basics as jsx instead of tsx? */

  // console.log("! have to pre-setup the output div in the DOM - app.tsx");

  

    console.log("TODO: really use the tax rate input");
    console.log("TODO: Create a HDD file to store the user data");
    console.log("TODO: Create a temp file to store the user csv");


    console.log(totalIncome, totalBANK, totalWETH, totalDAI);

    return [totalIncome, totalBANK, totalWETH, totalDAI];
  
}