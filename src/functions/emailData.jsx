// data imports
import { possibleAssets } from '../data/possibleAssets'; 
import { sumTransactions } from './sumTransactions';

// Add these to your env variables
const MAILJET_API_KEY = import.meta.env.VITE_MAILJET_API_KEY;
const MAILJET_SECRET_KEY = import.meta.env.VITE_MAILJET_SECRET_KEY;

export async function emailData(country, userEmail, activeAssets, txData, tax, csvData) {
    
    console.log(txData);

    let fiatCode = country;
    let tokenTotals = sumTransactions(txData, activeAssets);
    let totalIncome = tokenTotals.ALL;

    // Build summary data HTML
    let summaryData = "<div style='font-family: Arial, sans-serif;'>\
      <h2>Your TaxMan Report</h2>\
      <h3>Total Income: $"+totalIncome.toFixed(2)+" "+fiatCode+"</h3>\
      <p>Token Breakdown:</p>\
      <ul>";

    // for each token in the list that is non-zero, add them to the summary list
    let tokenList = Object.keys(tokenTotals);
    tokenList.forEach(token => {
      if(tokenTotals[token] > 0 && token !== "ALL"){
        summaryData += "<li>"+tokenTotals[token]+" "+token+"</li>";
      }
    });

    summaryData += "</ul>\
      <p>Please find your detailed report attached.</p>\
      <p>TaxMan was made with ❤️by the team at <a href='https://getbcard.io'>BCard</a>. If you found it useful, please share with your friends: https://taxman.getbcard.io</p>\
    </div>";

    // build csv data
    let encodeCsv = btoa(csvData);

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail,
                summaryData,
                csvData: encodeCsv
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to send email');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}