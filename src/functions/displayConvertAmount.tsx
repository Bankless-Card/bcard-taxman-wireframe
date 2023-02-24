// import cs from '../style.module.css'
import { bankFeed, bankCad, bankUsd, bankPrices2022 } from "../data";

// this function is IMPORTANT in calculating the price of the asset based on historical price data
export function displayConvertAmount(value:any, asset:any, timestamp:any, fiat:string){
  // USD/FIAT value @ timefrom blockNum

  if(asset === "BANK"){

    let bankFIAT = 0.0101;   // 1 BANK = 0.01 default (or newer price)
    let bankHistory = bankCad.prices;

    // console.log(fiat, timestamp);

    if(fiat === 'CAD'){
      // use CAD price
      bankHistory = bankCad.prices;
    } else {
      // use USD price (default)
      bankHistory = bankUsd.prices;
    }

    

    bankHistory.forEach((item:any) => {
      // console.log(timestamp, item[0], item[1]);
      // console.log(item[0]/timestamp)
      // if time of item is less than or equal to timestamp
      if(item[0] <= timestamp*1000){
        // console.log("SetPriceBANKUSD: " + item[1]);
        bankFIAT = item[1];    // set price up to timestamp
      } else {
        // console.log("break");
      }

      // next item

    });

    let output = "$"+fiat+" "+(bankFIAT*parseFloat(value)).toFixed(2) + " @ " +bankFIAT.toFixed(4);
    console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;


  } else {
    return "Convert Amount - " + value;
  }

}



