// purpose is to sum up the income

export function sumTransactions(txData, activeAssets) {

  console.log("finish button has been clicked");

  // output the displayed DAO tokens for summary
  let totalIncome = 0;

    // some individuals captured as sample
  let totalBANK = 0;
  let total1INCH = 0;
  let totalANT = 0;
  let totalMKR = 0;
  let totalPOKT = 0;
  let totalPOOL = 0;

  let totalWETH = 0;
  let totalDAI = 0;
  let totalUSDC = 0;

  // console.log(activeAssets);

  txData.forEach(chainList => {
    //console.log(chainList);
    console.log(chainList.title);

    chainList.transactions.forEach(tx => {

      if(activeAssets.includes(tx.asset)){
        //its an actively tracked token

        if(tx.incomeState){
          // this is an INCOME tx;
          // console.log(tx.crypto, tx.currency);

          //sampe token trackers
          if(tx.asset === "BANK"){
            totalBANK += tx.value;
          } else if(tx.asset === "1INCH"){
            total1INCH += tx.value;
          } else if(tx.asset === "ANT"){
              totalANT += tx.value;
          } else if(tx.asset === "MKR"){
              totalMKR += tx.value;
          } else if(tx.asset === "POKT"){
              totalPOKT += tx.value;
          } else if(tx.asset === "POOL"){
              totalPOOL += tx.value;
          } else if(tx.asset === "WETH"){
            totalWETH += tx.value;
          } else if(tx.asset === "DAI"){
            totalDAI += tx.value;
          } else if(tx.asset === "USDC"){
            totalUSDC += tx.value;
          }

          totalIncome += parseFloat(tx.currency.split(" ")[1]);
          
        } else {
          // not income, dont sum it
        }
      }

    });
  });

  // console.log("TODO: Create a HDD file to store the user data");
  console.log(totalIncome, totalBANK, total1INCH, totalANT, totalMKR, totalPOKT, totalPOOL, totalWETH, totalDAI, totalUSDC );

  return [totalIncome, totalBANK, total1INCH, totalANT, totalMKR, totalPOKT, totalPOOL, totalWETH, totalDAI, totalUSDC];
  
}