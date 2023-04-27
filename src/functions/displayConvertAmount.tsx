import { 
  bankPrices2022,  
  inchPrices2022, 
  antPrices2022, 
  mkrPrices2022, 
  poktPrices2022, 
  poolPrices2022,
  ensPrices2022,
  ethPrices2022, 
  daiPrices2022,
  usdcPrices2022 } from "../data";

// this function is IMPORTANT in calculating the price of the asset based on historical price data
export function displayConvertAmount(value:any, asset:any, timestamp:any, fiat:string){
  // USD/FIAT value @ timefrom blockNum

  // console.log(value, asset, timestamp, fiat);
  // let fiatCode = "bankCad";

  if(asset === "BANK"){

    let bankFIAT = 0.0101;   // 1 BANK = 0.01 default (or newer price)
    let bankHistory = bankPrices2022.bankCad.prices;

    // console.log(fiat, timestamp);

    // console.log(bankPrices2022[fiatCode].prices);

    if(fiat === 'CAD'){
      // use CAD price
      bankHistory = bankPrices2022.bankCad.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      bankHistory = bankPrices2022.bankEur.prices;
    } else {
      // use USD price (default)
      bankHistory = bankPrices2022.bankUsd.prices;
    }

    let i = 0;
    while(timestamp > bankHistory[i][0]/1000){
      // console.log(timestamp + " SetPriceBANKFIAT: " + bankHistory[i][1]);
      bankFIAT = bankHistory[i][1];    // set price up to timestamp

      i++;  // next item
    }

    // REPLACED WITH WHILE LOOP ABOVE
    // bankHistory.forEach((item:any) => {
    //   // console.log(timestamp, item[0], item[1]);
    //   // console.log(item[0]/timestamp)
    //   // if time of item is less than or equal to timestamp
    //   if(item[0] <= timestamp*1000){
    //     // console.log("SetPriceBANKUSD: " + item[1]);
    //     bankFIAT = item[1];    // set price up to timestamp
    //   } else {
    //     // console.log("break");
    //   }

    //   // next item

    // });

    let output = "$"+fiat+" "+(bankFIAT*parseFloat(value)).toFixed(2) + " @ " +bankFIAT.toFixed(4);
    // console.log(output);

    // return the price data object, formatted in FIAT terms, based on timestamp
    return output;


  } else if(asset === "1INCH") {

    // console.log("real lookup for prices here...");
    let inchFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let inchHistory = inchPrices2022.inchCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      inchHistory = inchPrices2022.inchUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      inchHistory = inchPrices2022.inchEur.prices;
    } 

    let i = 0;
    while(timestamp > inchHistory[i][0]/1000){
      inchFIAT = inchHistory[i][1];    // set price up to timestamp
      i++;  // next item
    }

    // inchHistory.forEach((item:any) => {
    //   // if time of item is less than or equal to timestamp
    //   if(item[0] <= timestamp*1000){
    //     inchFIAT = item[1];    // set price up to timestamp
    //   } 
    //   // next item

    // });

    let output = "$"+fiat+" "+(inchFIAT*parseFloat(value)).toFixed(2) + " @ " +inchFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "ANT") {

    // console.log("real lookup for prices here...");
    let antFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let antHistory = antPrices2022.antCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      antHistory = antPrices2022.antUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      antHistory = antPrices2022.antEur.prices;
    } 

    let i = 0;
    while(timestamp > antHistory[i][0]/1000){
      antFIAT = antHistory[i][1];    // set price up to timestamp
      i++;  // next item
    }

    // antHistory.forEach((item:any) => {
    //   // if time of item is less than or equal to timestamp
    //   if(item[0] <= timestamp*1000){
    //     antFIAT = item[1];    // set price up to timestamp
    //   } 
    //   // next item

    // });

    let output = "$"+fiat+" "+(antFIAT*parseFloat(value)).toFixed(2) + " @ " +antFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "MKR") {

    // console.log("real lookup for prices here...");
    let mkrFIAT = 2000.0101;   // 1 DAI = 0.01 default (or newer price)
    let mkrHistory = mkrPrices2022.mkrCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      mkrHistory = mkrPrices2022.mkrUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      mkrHistory = antPrices2022.mkrEur.prices;
    } 

    let i = 0;
    while(timestamp > mkrHistory[i][0]/1000){
      mkrFIAT = mkrHistory[i][1];    // set price up to timestamp
      i++;  // next item
    }

    // mkrHistory.forEach((item:any) => {
    //   // if time of item is less than or equal to timestamp
    //   if(item[0] <= timestamp*1000){
    //     mkrFIAT = item[1];    // set price up to timestamp
    //   } 
    //   // next item

    // });

    let output = "$"+fiat+" "+(mkrFIAT*parseFloat(value)).toFixed(2) + " @ " +mkrFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "POKT") {

    // console.log("real lookup for prices here...");
    let poktFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let poktHistory = poktPrices2022.poktCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      poktHistory = poktPrices2022.poktUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      poktHistory = poktPrices2022.poktEur.prices;
    } 

    let i = 0;
    while(timestamp > poktHistory[i][0]/1000){
      poktFIAT = poktHistory[i][1];    // set price up to timestamp
      i++;  // next item
    }

    // poktHistory.forEach((item:any) => {
    //   // if time of item is less than or equal to timestamp
    //   if(item[0] <= timestamp*1000){
    //     poktFIAT = item[1];    // set price up to timestamp
    //   } 
    //   // next item

    // });

    let output = "$"+fiat+" "+(poktFIAT*parseFloat(value)).toFixed(2) + " @ " +poktFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "POOL") {

    // console.log("real lookup for prices here...");
    let poolFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let poolHistory = poolPrices2022.poolCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      poolHistory = poolPrices2022.poolUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      poolHistory = poolPrices2022.poolEur.prices;
    } 

    let i = 0;
    while(timestamp > poolHistory[i][0]/1000){
      poolFIAT = poolHistory[i][1];    // set price up to timestamp
      i++;  // next item
    }

    // poolHistory.forEach((item:any) => {
    //   // loop through each item in the 2022 price history
    //   // if time of item is less than or equal to timestamp
    //   if(item[0] <= timestamp*1000){
    //     poolFIAT = item[1];    // set price up to timestamp, otherwise skip.
    //   } 
    //   // next item

    // });

    let output = "$"+fiat+" "+(poolFIAT*parseFloat(value)).toFixed(2) + " @ " +poolFIAT.toFixed(4);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "ENS") {

    // console.log("TEMP POOL prices here...");

    let ensFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let ensHistory = ensPrices2022.ensCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      ensHistory = ensPrices2022.ensUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      ensHistory = ensPrices2022.ensEur.prices;
    } 

    let i = 0;
    while(timestamp > ensHistory[i][0]/1000){
      ensFIAT = ensHistory[i][1];    // set price up to timestamp
      i++;  // next item
    }

    let output = "$"+fiat+" "+(ensFIAT*parseFloat(value)).toFixed(2) + " @ " +ensFIAT.toFixed(4);

    // return the price in FIAT terms, based on timestamp
    return output;

  } 
  
  else if(asset === "WETH") {

    // console.log("real lookup for prices here...");
    let wethFIAT = 2000.0101;   // 1 WETH = 0.01 default (or newer price)
    let wethHistory = ethPrices2022.ethCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use CAD price
      wethHistory = ethPrices2022.ethUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      wethHistory = ethPrices2022.ethEur.prices;
    } 

    // console.log(fiat, timestamp, wethHistory);

    // let i = 0;
    // while(timestamp > wethHistory[i][0]/1000){
    //   wethFIAT = wethHistory[i][1];    // set price up to timestamp
    //   i++;  // next item
    // }

    wethHistory.forEach((item:any) => {
      // if time of item is less than or equal to timestamp

      // console.log(item[0], timestamp*1000);   // ok for mainnet, not for polygon

      if(item[0] <= timestamp*1000){
        wethFIAT = item[1];    // set price up to timestamp
      } 
      // next item

    });

    let output = "$"+fiat+" "+(wethFIAT*parseFloat(value)).toFixed(2) + " @ " +wethFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "DAI") {

    let daiFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let daiHistory = daiPrices2022.daiCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use CAD price
      daiHistory = daiPrices2022.daiUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      daiHistory = daiPrices2022.daiEur.prices;
    } 

    let i = 0;
    while(timestamp > daiHistory[i][0]/1000){
      daiFIAT = daiHistory[i][1];    // set price up to timestamp
      i++;  // next item
    }

    // daiHistory.forEach((item:any) => {
    //   // if time of item is less than or equal to timestamp
    //   if(item[0] <= timestamp*1000){
    //     daiFIAT = item[1];    // set price up to timestamp
    //   } 
    //   // next item

    // });

    let output = "$"+fiat+" "+(daiFIAT*parseFloat(value)).toFixed(2) + " @ " +daiFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "USDC") {

    // console.log("USING DAI PRICES FOR NOW...");

    let usdcFIAT = 1.0101;   // 1 DAI = 0.01 default (or newer price)
    let usdcHistory = usdcPrices2022.usdcCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      usdcHistory = usdcPrices2022.usdcUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      usdcHistory = usdcPrices2022.usdcEur.prices;
    } 

    // get the right price history
    let i = 0;
    while(timestamp > usdcHistory[i][0]/1000){
      usdcFIAT = usdcHistory[i][1];    // set price up to timestamp
      i++;  // next item
    }

    // usdcHistory.forEach((item:any) => {
    //   // if time of item is less than or equal to timestamp
    //   if(item[0] <= timestamp*1000){
    //     usdcFIAT = item[1];    // set price up to timestamp
    //   } 
    //   // next item

    // });

    let output = "$"+fiat+" "+(usdcFIAT*parseFloat(value)).toFixed(2) + " @ " +usdcFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else {
    // unmatched token asset
    return "Convert Token - " + value;
  }

}



