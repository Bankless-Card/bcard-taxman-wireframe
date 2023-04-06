// purpose is to sum up the income

export function sumTransactions(txData, activeAssets) {

  console.log("finish button has been clicked");

  // output the displayed DAO tokens for summary
  let totalIncome = 0;

    // some individuals captured as sample
  let totalBANK = 0;
  let totalWETH = 0;
  let totalDAI = 0;

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

  // console.log("TODO: Create a HDD file to store the user data");
  console.log(totalIncome, totalBANK, totalWETH, totalDAI);

  return [totalIncome, totalBANK, totalWETH, totalDAI];
  
}