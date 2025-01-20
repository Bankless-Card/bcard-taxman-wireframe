export function exportData(country, txData) {

    // console.log(txData);

    // export data to CSV
    // first line is 'header'
    let csvData = "timestamp, tokenName, tokenAmount, chain, fiatName, fiatAmount" + "\r\n";

    // console.log("GET FIAT CODE HERE FROM GLOBAL SETTINGS");
    let fiatCode = country;

    let totalIncome = 0;

    
    // only if there are any txs
    if(txData.length > 0){

        let newLine = "";
        let index = 1;    // for row number of csv

        txData.forEach(chainList => {

            newLine = chainList.title + "\r\n";
            csvData += newLine;
        
            chainList.transactions.forEach(tx => {

              if(tx.incomeState){
                  // this is an INCOME tx
                  // console.log(tx.crypto, tx.currency);
                  // console.log(tx);

                  // convert unix time to human time
                  let dateOut = new Date(tx.unixT * 1000);

                  // generate the csv data for each tx row
                  newLine = dateOut + "," + tx.asset + "," + tx.value + "," + tx.chain + "," + tx.fiatName + "," + tx.fiatValue + "\r\n";

                  // only add to csvData if income
                  csvData += newLine;

                  totalIncome += tx.fiatValue;

                  // increment index
                  index++;

              } else {
                // not income, dont sum it
              }
        
            });
          });

    }

    return csvData;
  
  }