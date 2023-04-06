export function exportData(txData) {

    console.log(txData);

    // export data to CSV
    console.log("export tx data to CSV");
  
  
    // for each tx, we need to build a row of data
    //  -> if(income) timestamp, tokenLabel, tokenAmount, fiatConversion, fiatAmount 
  
    // first line is 'header'
    let csvData = "txID, timestamp, asset, tokenAmount, fiatRatio, fiatAmount, fiatLabel" + "\r\n";

    console.log("GET FIAT CODE HERE FROM GLOBAL SETTINGS");
    let fiatCode = "CAD";

    let assetList = ["BANK", "WETH", "DAI"];
    let totalIncome = 0;
    let taxRate = 100;
    
    // only if there are any txs
    if(txData.length > 0){

        let newLine = "";
        let index = 1;    // for row number of csv

        txData.forEach(chainList => {
            //console.log(chainList);
            console.log(chainList.title);

            newLine = chainList.title + "\r\n";
            csvData += newLine;
        
            chainList.transactions.forEach(tx => {
        
              if(assetList.includes(tx.asset)){
                //its an actively tracked token
                // console.log(tx);
        
                if(tx.incomeState){
                    // console.log("this is an INCOME tx");
                    console.log(tx.crypto, tx.currency);

                    console.log(tx);

                    // generate the csv data for each tx row
                    newLine = index + "," + tx.unixT + "," + tx.asset + "," + tx.value + "," + tx.currency.split(" ")[3] + "," + tx.currency.split(" ")[1] + "," + tx.currency.split(" ")[0] + "\r\n";
  
                    // only add to csvData if income
                    csvData += newLine;

                    totalIncome += parseFloat(tx.currency.split(" ")[1]);

                    // increment index
                    index++;

                } else {
                  // not income, dont sum it
                }
              }
        
            });
          });

    }
  
  
    console.log(csvData);

    // last line of output should be summation of all income
    csvData += "SUM, timestamp, TaxRate, Total Income to Report, FiatCode" + "\r\n";
    csvData += "RUN@, "+ Date.now() + "," + taxRate + ","+ totalIncome + "," + fiatCode + "\r\n";

    return csvData;
  
  }