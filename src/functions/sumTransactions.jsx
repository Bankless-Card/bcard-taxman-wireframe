import { INCOME_STATES } from "../data/constants";

// purpose is to sum up the income
export function sumTransactions(txData) {

  //console.log("running sumTransactions...");

  // output the displayed DAO tokens for summary
  let totalIncome = 0;
  let tokenTotals = {};
  let fiatTotals = {};


  txData.forEach(month => {

    month.transactions.forEach(tx => {

        if(tx.txType === INCOME_STATES.INCOME){

          if( tokenTotals[tx.asset] && fiatTotals[tx.asset] != null ){
            tokenTotals[tx.asset] += tx.value;
            fiatTotals[tx.asset] += tx.fiatValue;
          } else {
            tokenTotals[tx.asset] = tx.value;
            fiatTotals[tx.asset] = tx.fiatValue;
          }

          // always add to income, if it is flagged as such
          totalIncome += parseFloat(tx.fiatValue);
          
        } else {
          // not income, dont sum it
        }
    });
  });

  tokenTotals.ALL = totalIncome;
  fiatTotals.ALL = totalIncome;

  return [tokenTotals, fiatTotals];
  
}