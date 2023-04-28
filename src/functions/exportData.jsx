export function exportData(country, txData, activeAssets, tax) {

    // console.log(txData);

    // export data to CSV
    // first line is 'header'
    let csvData = "timestamp, asset, tokenAmount, fiatRatio, fiatAmount, fiatLabel" + "\r\n";

    // console.log("GET FIAT CODE HERE FROM GLOBAL SETTINGS");
    let fiatCode = country;

    let totalIncome = 0;

    console.log(activeAssets);
    
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
        
              if(activeAssets.includes(tx.asset)){
                //its an actively tracked token
        
                if(tx.incomeState){
                    // this is an INCOME tx
                    // console.log(tx.crypto, tx.currency);
                    // console.log(tx);

                    // convert unix time to human time
                    let dateOut = new Date(tx.unixT * 1000);

                    // generate the csv data for each tx row
                    newLine = dateOut + "," + tx.asset + "," + tx.value + "," + tx.currency.split(" ")[3] + "," + tx.currency.split(" ")[1] + "," + tx.currency.split(" ")[0] + "\r\n";
  
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
  
  
    // console.log(csvData);

    let taxableIncome = totalIncome * tax / 100;
    console.log("Taxable Income: " + taxableIncome);

    // last line of output should be summation of all income
    csvData += "SUM, timestamp, TaxRate, Total Income to Report, FiatCode" + "\r\n";
    csvData += "RUN@, "+ Date.now() + "," + tax + ","+ taxableIncome + "," + fiatCode + "\r\n";

    return csvData;
  
  }