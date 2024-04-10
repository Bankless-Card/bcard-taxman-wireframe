// purpose is to sum up the income

export function sumTransactions(txData, activeAssets) {

  console.log("finish button has been clicked");

  // output the displayed DAO tokens for summary
  let totalIncome = 0;

  let tokenTotals = {
    "BANK": 0,
    "1INCH": 0,
    "ANT": 0,
    "MKR": 0,
    "POKT": 0,
    "POOL": 0,
    "ENS": 0,
    "ARB": 0,
    "DEGEN": 0,
    "WETH": 0,
    "DAI": 0,
    "USDC": 0,
    "UDST": 0
  }


  txData.forEach(chainList => {
    console.log(chainList.title);

    chainList.transactions.forEach(tx => {

      if(activeAssets.includes(tx.asset)){
        //its an actively tracked token

        if(tx.incomeState){
          // this is an INCOME tx;
          // console.log(tx.crypto, tx.currency);
          tokenTotals[tx.asset] += tx.value;

          // always add to income, if it is flagged as such
          totalIncome += parseFloat(tx.currency.split(" ")[1]);
          
        } else {
          // not income, dont sum it
        }
      }

    });
  });

  // console.log(totalIncome, totalBANK, total1INCH, totalANT, totalMKR, totalPOKT, totalPOOL, totalENS, totalWETH, totalDAI, totalUSDC );
  console.log(tokenTotals);

  tokenTotals.ALL = totalIncome;

  return tokenTotals;
  
}