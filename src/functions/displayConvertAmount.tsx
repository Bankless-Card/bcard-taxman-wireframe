// import cs from '../style.module.css'
import { bankFeed } from "../data";

// this function is IMPORTANT in calculating the price of the asset based on historical price data
export function displayConvertAmount(value:any, asset:any, timestamp:any){
  // USD/FIAT value @ timefrom blockNum

  if(asset === "BANK"){

    let bankUSD = 0.0101;   // 1 BANK = 0.01 USD (or newer price)

    console.log(timestamp);

    let bankHistory = bankFeed.prices;

    bankHistory.forEach((item:any) => {
      // console.log(timestamp, item[0], item[1]);
      // console.log(item[0]/timestamp)
      // if time of item is less than or equal to timestamp
      if(item[0] <= timestamp*1000){
        // console.log("SetPriceBANKUSD: " + item[1]);
        bankUSD = item[1];    // set price up to timestamp
      } else {
        // console.log("break");
      }

      // next item

    });

    console.log(bankUSD);

    if(!timestamp){ timestamp=1676311028 }

    // let timeMin = timestamp - 250;
    // let timeMax = timestamp + 250;
    // let tokenAPI = 'bankless-dao';
    // let vsCurrency = 'usd';

    /** DYNAMIC TESTING **/ 
    // use coingecko api to get price
    // https://api.coingecko.com/api/v3/simple/price?ids=bankless-dao&vs_currencies=usd

    // let apiURLcall = 'https://api.coingecko.com/api/v3/coins/bankless-dao/market_chart/range?vs_currency=usd&from=1676311028&to=1676311528';

    // let apiURLcall = 'https://api.coingecko.com/api/v3/coins/'+tokenAPI+'/market_chart/range?vs_currency='+vsCurrency+'&from='+timeMin+'&to='+timeMax;

    // THIS IS ON HOLD FOR NOW

    // fetch(apiURLcall).then((response) => response.json()).then((data) => {
      
    //   // return object has prices, market_caps, and total_volumes

    //   console.log(data);   // this shoud be BANK price at closest timestamp to end

    //   if(data.prices.length >= 1){
    //     // it has received a price
    //     bankUSD = data.prices[0][1];
    //     gBankUsd = bankUSD;   // update global var with new price

    //     console.log((bankUSD*parseFloat(value)).toFixed(2) + " $USD")
    //   }
      

    //   return (bankUSD*parseFloat(value)).toFixed(2) + " $USD";
    
    // });

    /** End DYNAMIC TESTING **/ 

    let output = "$USD "+(bankUSD*parseFloat(value)).toFixed(2) + " @ " +bankUSD.toFixed(4);
    console.log(output);

      // return the price in FIAT terms, based on timestamp
    return output;



  } else {
    return "Convert Amount - " + value;
  }

}



