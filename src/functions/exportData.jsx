import { INCOME_STATES } from "../data/constants";

export function exportData(country, txData) {

    // console.log(txData);

    // export data to CSV
    // first line is 'header'
    let csvData = "timestamp, chain, tokenName, tokenAmount, fiatName, fiatAmount, from, to, txType, gasFee, gasFeeFiat, blockExplorerUrl" + "\r\n";

    // Get block explorer URL based on chain
    function getBlockExplorerUrl(chain, hash) {
      switch(chain) {
        case "Ethereum":
          return `https://etherscan.io/tx/${hash}`;
        case "Polygon":
          return `https://polygonscan.com/tx/${hash}`;
        case "Optimism":
          return `https://optimistic.etherscan.io/tx/${hash}`;
        case "Base":
          return `https://basescan.org/tx/${hash}`;
        case "Arbitrum":
          return `https://arbiscan.io/tx/${hash}`;
        default:
          return `https://etherscan.io/tx/${hash}`;
      }
    }

    function getGasActuallyPaid(tx){
      if(!tx.incoming && tx.gasFee){
        return [tx.gasFee, tx.gasFeeInFiat];
      }

      return [0,0];
    }

    // console.log("GET FIAT CODE HERE FROM GLOBAL SETTINGS");
    let fiatCode = country;

    let totalIncome = 0;

    
    // only if there are any txs
    if(txData.length > 0){

        let newLine = "";
        let index = 1;    // for row number of csv

        // Use for...of instead of forEach for better control flow
        for (const chainList of txData) {
          newLine = chainList.title + "\r\n";
          csvData += newLine;
      
          for (const tx of chainList.transactions) {
            if(tx.txType === INCOME_STATES.IGNORE){
              continue;
            }

            console.log(tx);

            // convert unix time to human time
            let dateOut = new Date(tx.unixT * 1000);
            let gasFees = getGasActuallyPaid(tx);

            // generate the csv data for each tx row
            newLine = dateOut + ","; 
            newLine += tx.chain + ",";
            newLine += tx.asset + ","
            newLine += tx.value + ",";
            newLine += tx.fiatName + ",";
            newLine += tx.fiatValue + ",";
            newLine += tx.from + ",";
            newLine += tx.to + ",";
            newLine += tx.txType + ",";
            newLine += gasFees[0] + ",";
            newLine += gasFees[1] + ",";
            newLine += getBlockExplorerUrl(tx.chain, tx.hash);
            newLine += "\r\n";
            
            // only add to csvData if income
            csvData += newLine;

            totalIncome += tx.fiatValue;

            // increment index
            index++;
          }
        }

    }

    return csvData;
  
  }