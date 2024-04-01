// data imports
import { Email } from './smtpjsv3'; 
import { ELASTICMAIL_SECURETOKEN } from '../data/env.tsx'; 

export function emailData(country, userEmail, activeAssets, txData, tax, csvData) {

    // console.log(userEmail, txData, csvData);

    // export data to CSV
    console.log("export tx data to email & attach csv...");
  
  
    // for each tx, we need to build a row of data
    //  -> if(income) timestamp, tokenLabel, tokenAmount, fiatConversion, fiatAmount 

    let fiatCode = country;   //"CAD";

    activeAssets.forEach(asset => {
      // build a storage variable for each asset
      console.log(asset);
    });
    
    let totalBANK = 0;  
    let total1INCH = 0;
    let totalANT = 0;
    let totalMKR = 0;
    let totalPOKT = 0;
    let totalPOOL = 0;
    let totalENS = 0;

    let totalWETH = 0;
    let totalDAI = 0;
    let totalUSDC = 0;
  
    let totalIncome = 0;
    
    // only if there are any txs
    if(txData.length > 0){

        txData.forEach(chainList => {
            //console.log(chainList);
            console.log(chainList.title);
        
            chainList.transactions.forEach(tx => {
        
              if(activeAssets.includes(tx.asset)){
                //its an actively tracked token
                // console.log(tx);
        
                if(tx.incomeState){
                    // console.log("this is an INCOME tx");
                    // console.log(tx.crypto, tx.currency);
        
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
                    } else if(tx.asset === "ENS"){
                      totalENS += tx.value;
                    } else if(tx.asset === "WETH"){
                      totalWETH += tx.value;
                    } else if(tx.asset === "DAI"){
                      totalDAI += tx.value;
                    } else if(tx.asset === "USDC"){
                      totalUSDC += tx.value;
                    }
            
                    totalIncome += parseFloat(tx.currency.split(" ")[1]);

                } 

              }
        
            });
          });

    }
  
  
    // let taxRate = 100;
    let taxableIncome = totalIncome * (tax/100);
    let curIncome = taxableIncome.toLocaleString('en-US', { style: 'currency', currency: fiatCode });
    let totalIncomeOut = totalIncome.toLocaleString('en-US', { style: 'currency', currency: fiatCode });

    let year = new Date().getFullYear();

    let summaryData = "<div>\
      <h2>Your " + year + " DAO Income:</h2>\
      <ul>";

    if(totalBANK > 0) {
    summaryData += "<li>"+totalBANK+" BANK </li>";
    }  
    if(totalENS > 0) {
      summaryData += "<li>"+totalENS+" ENS </li>";
    }
    if(total1INCH > 0) {
      summaryData += "<li>"+total1INCH+" 1INCH </li>";
    }
    if(totalANT > 0) {
      summaryData += "<li>"+totalANT+" ANT </li>";
    }
    if(totalMKR > 0) {
      summaryData += "<li>"+totalMKR+" MKR </li>";
    }
    if(totalPOKT > 0) {
      summaryData += "<li>"+totalPOKT+" POKT </li>";
    }
    if(totalPOOL > 0) {
      summaryData += "<li>"+totalPOOL+" POOL </li>";
    }

    if(totalWETH > 0) {
      summaryData += "<li>"+totalWETH+" WETH </li>";
    }
    if(totalDAI > 0) {
      summaryData += "<li>"+totalDAI+" DAI </li>";
    }
    if(totalUSDC > 0) {
      summaryData += "<li>"+totalUSDC+" USDC </li>";
    }

    summaryData +=
        "</ul>\
      \
      <p><strong>For a total income of: "+totalIncomeOut+" </strong><br />\
      <small>You owe "+curIncome+" if your tax rate is "+tax+"%</small>.</p>\
      <p>Be sure to download the attached CSV and save it in a safe place.</p>\
      <p>TaxMan was made with ❤️by the team at <a href='https://banklesscard.xyz'>BCard</a>. If you found it useful, please share with your friends: https://taxman.banklesscard.xyz</p>\
    </div>";
  
    // build csv data
    let encodeCsv = btoa(csvData);
    // console.log(csvData);   // this is the csv data pre-encode
  
    // get user email from DOM
    let emailReceipt = userEmail;
  
    if(emailReceipt !== ""){
  
      console.log("Email send -> pending. Please wait for next dialog confirmation before closing app.");
      // build and send email with txSummary as body, csv as attachment
      Email.send({
        SecureToken: ELASTICMAIL_SECURETOKEN,
        To: [emailReceipt],
        Bcc: ["help@justplay.cafe"],
        From: "taxman@justplay.cafe",
        Subject: "💳 BCard TaxMan Report 💸",
        Body: summaryData,
        Attachments: [
          { 
            name: "TaxManSummary"+year+"-"+emailReceipt+".csv", 
            data: encodeCsv,                    // this is the encoded file data
            contentType: "text/csv"
          }
        ]
      })
      .then(function (message) {
        console.log(message);
        if(message === "OK"){
          console.log("Email sent successfully. Thanks for using BCard TaxMan! You're free to go check your mail.");
            // set state of email area to complete
            // setFinalExport("complete");
          return "success";
        } else {
          alert("mail failed to send with message: " + message);
          return "failure";
        }
      });
    } else {
      alert("Please enter your email address");
      return "no email entered: abort";
    }
  
  return true;
  
  }