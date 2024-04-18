// data imports
import { Email } from './smtpjsv3'; 
import { ELASTICMAIL_SECURETOKEN } from '../data/env.tsx'; 
import { possibleAssets } from '../data/possibleAssets'; 
import { sumTransactions } from './sumTransactions';

export function emailData(country, userEmail, activeAssets, txData, tax, csvData) {

    // console.log(userEmail, txData, csvData);

    // export data to CSV
    console.log("export tx data to email & attach csv...");
  
  
    // for each tx, we need to build a row of data
    //  -> if(income) timestamp, tokenLabel, tokenAmount, fiatConversion, fiatAmount 

    let fiatCode = country;   //"CAD";
    let tokenTotals = sumTransactions(txData, activeAssets);      // build the token totals object to store the sum of each token
    console.log(tokenTotals);   // OK
    // possibleAssets.forEach((asset, index) => {
    //   tokenTotals[asset] = 0;
    // });
    let totalIncome = tokenTotals.ALL;


  
    // let taxRate = 100;
    let taxableIncome = totalIncome * (tax/100);
    let curIncome = taxableIncome.toLocaleString('en-US', { style: 'currency', currency: fiatCode });
    let totalIncomeOut = totalIncome.toLocaleString('en-US', { style: 'currency', currency: fiatCode });

    let year = new Date().getFullYear() -1;

    let summaryData = "<div>\
      <h2>Your " + year + " DAO Income:</h2>\
      <ul>";

    // for each token in the list that is non-zero, add them to the summary list
    let tokenList = Object.keys(tokenTotals);
    console.log(tokenList);
    tokenList.forEach(token => {
      if(tokenTotals[token] > 0 && token !== "ALL"){
        summaryData += "<li>"+tokenTotals[token]+" "+token+"</li>";
      }
    });


    summaryData +=
        "</ul>\
      \
      <p><strong>For a total income of: "+totalIncomeOut+" </strong><br />\
      <small>You owe "+curIncome+" if your tax rate is "+tax+"%</small>.</p>\
      <p>Be sure to download the attached CSV and save it in a safe place.</p>\
      <p>TaxMan was made with ❤️by the team at <a href='https://getbcard.io'>BCard</a>. If you found it useful, please share with your friends: https://taxman.getbcard.io</p>\
    </div>";

    console.log(summaryData);
  
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
        Bcc: [],
        From: "taxman@getbcard.io",
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