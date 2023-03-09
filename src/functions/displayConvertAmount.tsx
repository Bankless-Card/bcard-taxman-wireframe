import { bankPrices2022, ethPrices2022, daiPrices2022 } from "../data";
import { inchPrices2022, antPrices2022, mkrPrices2022, poktPrices2022, poolPrices2022 } from "../data";

// this function is IMPORTANT in calculating the price of the asset based on historical price data
export function displayConvertAmount(value:any, asset:any, timestamp:any, fiat:string){
  // USD/FIAT value @ timefrom blockNum

  // console.log(value, asset, timestamp, fiat);

  if(asset === "BANK"){

    let bankFIAT = 0.0101;   // 1 BANK = 0.01 default (or newer price)
    let bankHistory = bankPrices2022.bankCad.prices;

    // console.log(fiat, timestamp);

    if(fiat === 'CAD'){
      // use CAD price
      bankHistory = bankPrices2022.bankCad.prices;
    } else {
      // use USD price (default)
      bankHistory = bankPrices2022.bankUsd.prices;
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


  } else if(asset === "WETH") {

    // console.log("real lookup for prices here...");
    let wethFIAT = 2000.0101;   // 1 WETH = 0.01 default (or newer price)
    let wethHistory = ethPrices2022.ethCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use CAD price
      wethHistory = ethPrices2022.ethUsd.prices;
    } 

    wethHistory.forEach((item:any) => {
      // if time of item is less than or equal to timestamp

      // console.log(item[0], timestamp*1000);   // ok for mainnet, not for polygon

      if(item[0] <= timestamp*1000){
        wethFIAT = item[1];    // set price up to timestamp
      } 
      // next item

    });

    let output = "$"+fiat+" "+(wethFIAT*parseFloat(value)).toFixed(2) + " @ " +wethFIAT.toFixed(4);
    console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "DAI") {

    let daiFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let daiHistory = daiPrices2022.daiCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use CAD price
      daiHistory = daiPrices2022.daiUsd.prices;
    } 

    daiHistory.forEach((item:any) => {
      // if time of item is less than or equal to timestamp
      if(item[0] <= timestamp*1000){
        daiFIAT = item[1];    // set price up to timestamp
      } 
      // next item

    });

    let output = "$"+fiat+" "+(daiFIAT*parseFloat(value)).toFixed(2) + " @ " +daiFIAT.toFixed(4);
    console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "1INCH") {

    console.log("real lookup for prices here...");
    let inchFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let inchHistory = inchPrices2022.inchCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      inchHistory = inchPrices2022.inchUsd.prices;
    } 

    inchHistory.forEach((item:any) => {
      // if time of item is less than or equal to timestamp
      if(item[0] <= timestamp*1000){
        inchFIAT = item[1];    // set price up to timestamp
      } 
      // next item

    });

    let output = "$"+fiat+" "+(inchFIAT*parseFloat(value)).toFixed(2) + " @ " +inchFIAT.toFixed(4);
    console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "ANT") {

    console.log("real lookup for prices here...");
    let antFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let antHistory = antPrices2022.antCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      antHistory = antPrices2022.antUsd.prices;
    } 

    antHistory.forEach((item:any) => {
      // if time of item is less than or equal to timestamp
      if(item[0] <= timestamp*1000){
        antFIAT = item[1];    // set price up to timestamp
      } 
      // next item

    });

    let output = "$"+fiat+" "+(antFIAT*parseFloat(value)).toFixed(2) + " @ " +antFIAT.toFixed(4);
    console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "MKR") {

    console.log("real lookup for prices here...");
    let mkrFIAT = 2000.0101;   // 1 DAI = 0.01 default (or newer price)
    let mkrHistory = mkrPrices2022.mkrCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      mkrHistory = mkrPrices2022.mkrUsd.prices;
    } 

    mkrHistory.forEach((item:any) => {
      // if time of item is less than or equal to timestamp
      if(item[0] <= timestamp*1000){
        mkrFIAT = item[1];    // set price up to timestamp
      } 
      // next item

    });

    let output = "$"+fiat+" "+(mkrFIAT*parseFloat(value)).toFixed(2) + " @ " +mkrFIAT.toFixed(4);
    console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "POKT") {

    console.log("real lookup for prices here...");
    let poktFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let poktHistory = poktPrices2022.poktCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      poktHistory = poktPrices2022.poktUsd.prices;
    } 

    poktHistory.forEach((item:any) => {
      // if time of item is less than or equal to timestamp
      if(item[0] <= timestamp*1000){
        poktFIAT = item[1];    // set price up to timestamp
      } 
      // next item

    });

    let output = "$"+fiat+" "+(poktFIAT*parseFloat(value)).toFixed(2) + " @ " +poktFIAT.toFixed(4);
    console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "POOL") {

    console.log("real lookup for prices here...");
    let poolFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let poolHistory = poolPrices2022.poolCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      poolHistory = poolPrices2022.poolUsd.prices;
    } 

    poolHistory.forEach((item:any) => {
      // if time of item is less than or equal to timestamp
      if(item[0] <= timestamp*1000){
        poolFIAT = item[1];    // set price up to timestamp
      } 
      // next item

    });

    let output = "$"+fiat+" "+(poolFIAT*parseFloat(value)).toFixed(2) + " @ " +poolFIAT.toFixed(4);
    console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else {
    // unmatched token asset
    return "Convert Token - " + value;
  }

}



