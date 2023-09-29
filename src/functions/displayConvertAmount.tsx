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


// CREATE and IMPORT NEW function to get DYNAMIC price data for each token based on timestamps
// NEW: USE Single pricing API call to get only a single price for each token.

// this function is IMPORTANT in calculating the price of the asset based on historical price data
export async function displayConvertAmount(value:any, asset:any, timestamp:any, fiat:string){
  // USD/FIAT value @ timefrom blockNum

  // Since this receives a SINGLE value for asset, we are looking up only a 
  // single price from data set with each load.
  // parse hrough the historical data corresponding to the asset and FIAT and 
  // return price at timestamp

  console.log(asset, value, timestamp, fiat);

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

    //console.log(bankHistory);
    //data object must exist
    if(bankHistory !== undefined){

      // console.log(bankHistory[i]);    // first item in price array

      while(timestamp > bankHistory[i][0]/1000){
        // console.log(timestamp + " SetPriceBANKFIAT: " + bankHistory[i][1]);
        bankFIAT = bankHistory[i][1];    // set price up to timestamp

        i++;  // next item

        // check for undefined data
        if(i > bankHistory.length){
          console.log("Note: Price out of data range.");
          break;
        } else if(bankHistory[i] === undefined){
          console.log("Note: BANK Price for "+i+" is undefined - Call Data Lookup Function.");
          break;
        }
      }
    } else {
      console.log("Note: Token data is undefined - No data cache.");
    }

    // console.log(i, timestamp, bankFIAT);    // this needs to be tested for valid price  

    let output = "$"+fiat+" "+(bankFIAT*parseFloat(value)).toFixed(2) + " @ " +bankFIAT.toFixed(4);
    // console.log(output);

    // return the price data object, formatted in FIAT terms, based on timestamp
    return output;


  } else if(asset === "1INCH") {

    // console.log("real lookup for prices here...");
    let inchFIAT = 3.0268715932288863;   // 1 DAI = 0.01 default (or newer price)
    let inchHistory = inchPrices2022.inchCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      inchHistory = inchPrices2022.inchUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      inchHistory = inchPrices2022.inchEur.prices;
    } 

    let i = 0;

    if(inchHistory !== undefined) {
      while(timestamp > inchHistory[i][0]/1000){
        inchFIAT = inchHistory[i][1];    // set price up to timestamp
        i++;  // next item

        // check for undefined data
        if(i > inchHistory.length){
          console.log("Note: Price out of data range.");
          break;
        } else if(inchHistory[i] === undefined){
          console.log("Note: 1INCH Price for " + i + " is undefined - Call Data Lookup Function.");
          break;
        }
      }
    } else {
      console.log("Note: Token data is undefined - No data cache.");
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
    let antFIAT = 16.950179294162645;   // 1 DAI = 0.01 default (or newer price)
    let antHistory = antPrices2022.antCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      antHistory = antPrices2022.antUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      antHistory = antPrices2022.antEur.prices;
    } 

    let i = 0;
    if(antHistory !== undefined){
      while(timestamp > antHistory[i][0]/1000){
        antFIAT = antHistory[i][1];    // set price up to timestamp
        i++;  // next item

        // check for undefined data
        if(i > antHistory.length){
          console.log("Note: Price out of data range.");
          break;
        } else if(antHistory[i] === undefined){
          console.log("Note: ANT Price for " + i + " is undefined - Call Data Lookup Function.");
          break;
        }
      }
    } else {
      console.log("Note: Token data is undefined - No data cache.");
    }


    let output = "$"+fiat+" "+(antFIAT*parseFloat(value)).toFixed(2) + " @ " +antFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "MKR") {

    // console.log("real lookup for prices here...");
    let mkrFIAT = 2959.628120231065;   // first price in 2022 (or newer price)
    let mkrHistory = mkrPrices2022.mkrCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      mkrHistory = mkrPrices2022.mkrUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      mkrHistory = mkrPrices2022.mkrEur.prices;
    } 

    let i = 0;
    if(mkrHistory !== undefined){
      while(timestamp > mkrHistory[i][0]/1000){
        mkrFIAT = mkrHistory[i][1];    // set price up to timestamp
        i++;  // next item

        // check for undefined data
        if(i > mkrHistory.length){
          console.log("Note: Price out of data range.");
          break;
        } else if(mkrHistory[i] === undefined){
          console.log("Note: MKR Price for " + i + " is undefined - Call Data Lookup Function.");
          break;
        }
      }
    } else {
      console.log("Note: Token data is undefined - No data cache.");
    }

    let output = "$"+fiat+" "+(mkrFIAT*parseFloat(value)).toFixed(2) + " @ " +mkrFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "POKT") {

    console.log("POKT is not an ERC20 on eth, poly or OP...");
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

    if(poktHistory !== undefined){
      while(timestamp > poktHistory[i][0]/1000){
        poktFIAT = poktHistory[i][1];    // set price up to timestamp
        i++;  // next item

        // check for undefined data
        if(i > poktHistory.length){
          console.log("Note: Price out of data range.");
          break;
        } else if(poktHistory[i] === undefined){
          console.log("Note: POKT Price for " + i + " is undefined - Call Data Lookup Function.");
          break;
        }
      }
    } else {
      console.log("Note: Token data is undefined - No data cache.");
    }

    let output = "$"+fiat+" "+(poktFIAT*parseFloat(value)).toFixed(2) + " @ " +poktFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "POOL") {

    // console.log("real lookup for prices here...");
    let poolFIAT = 5.277036824374893;   // 1 DAI = 0.01 default (or newer price)
    let poolHistory = poolPrices2022.poolCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      poolHistory = poolPrices2022.poolUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      poolHistory = poolPrices2022.poolEur.prices;
    } 

    let i = 0;
    if(poolHistory !== undefined){
      while(timestamp > poolHistory[i][0]/1000){
        poolFIAT = poolHistory[i][1];    // set price up to timestamp
        i++;  // next item

        // check for undefined data
        if(i > poolHistory.length){
          console.log("Note: Price out of data range.");
          break;
        } else if(poolHistory[i] === undefined){
          console.log("Note: POOL Price for " + i + " is undefined - Call Data Lookup Function.");
          break;
        }
      }
    } else {
      console.log("Note: Token data is undefined - No data cache.");
    }

    let output = "$"+fiat+" "+(poolFIAT*parseFloat(value)).toFixed(2) + " @ " +poolFIAT.toFixed(4);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "ENS") {

    let ensFIAT = 49.39483417275808;   // 1 DAI = 0.01 default (or newer price)
    let ensHistory = ensPrices2022.ensCad.prices;    // default CAD

    if(fiat === 'USD'){
      // use USD price
      ensHistory = ensPrices2022.ensUsd.prices;
    } else if(fiat === 'EUR'){
      // use EUR price
      ensHistory = ensPrices2022.ensEur.prices;
    } 

    let i = 0;
    
    if(ensHistory !== undefined){
      while(timestamp > ensHistory[i][0]/1000){
        ensFIAT = ensHistory[i][1];    // set price up to timestamp
        i++;  // next item

        // check for undefined data
        if(i > ensHistory.length){
          console.log("Note: Price out of data range.");
          break;
        } else if(ensHistory[i] === undefined){
          console.log("Note: ENS Price for " + i + " is undefined - Call Data Lookup Function.");
          break;
        }
      }
    } else {
      console.log("Note: Token data is undefined - No data cache.");
    }

    let output = "$"+fiat+" "+(ensFIAT*parseFloat(value)).toFixed(2) + " @ " +ensFIAT.toFixed(4);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "WETH") {

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

    let i = 0;

    if(wethHistory !== undefined){
      while(timestamp > wethHistory[i][0]/1000){
        wethFIAT = wethHistory[i][1];    // set price up to timestamp
        i++;  // next item

        // check for undefined data
        if(i > wethHistory.length){
          console.log("Note: Price out of data range.");
          break;
        } else if(wethHistory[i] === undefined){
          console.log("Note: WETH Price for " + i + " is undefined - Call Data Lookup Function.");
          break;
        }
      }
    } else {
      console.log("Note: Token data is undefined - No data cache.");
    }

    // wethHistory.forEach((item:any) => {
    //   // if time of item is less than or equal to timestamp

    //   // console.log(item[0], timestamp*1000);   // ok for mainnet, not for polygon

    //   if(item[0] <= timestamp*1000){
    //     wethFIAT = item[1];    // set price up to timestamp
    //   } 
    //   // next item

    // });

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

    if(daiHistory !== undefined){

      while(timestamp > daiHistory[i][0]/1000){
        daiFIAT = daiHistory[i][1];    // set price up to timestamp
        i++;  // next item

        // check for undefined data
        if(i > daiHistory.length){
          console.log("Note: Price out of data range.");
          break;
        } else if(daiHistory[i] === undefined){
          console.log("Note: DAI Price for " + i + " is undefined - Call Data Lookup Function.");
          break;
        }
      }
    } else {
      console.log("Note: Token data is undefined - No data cache.");
    }

    let output = "$"+fiat+" "+(daiFIAT*parseFloat(value)).toFixed(2) + " @ " +daiFIAT.toFixed(4);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else if(asset === "USDC") {

    // console.log("HELLO USDC");

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

    if(usdcHistory !== undefined){

      while(timestamp > usdcHistory[i][0]/1000){
        usdcFIAT = usdcHistory[i][1];    // set price up to timestamp
        i++;  // next item

        // check for undefined data
        if(i > usdcHistory.length){
          console.log("Note: Price out of data range.");
          break;
        } else if(usdcHistory[i] === undefined){
          
          // console.log("Note: USDC Price beyond " + i + " is undefined - Call Data Lookup Function.");

          // let temp = await getSinglePrice(asset, value, timestamp, fiat);
          // console.log("USDC Price Lookup: " + temp);
          // console.log( await getSinglePrice(asset, value, timestamp, fiat) );
          usdcFIAT = await getSinglePrice(asset, value, timestamp, fiat, usdcFIAT);

          break;
        }
      }
    } else {
      console.log("Note: Token data is undefined - No data cache.");
    }

    let output = "$"+fiat+" "+(usdcFIAT*parseFloat(value)).toFixed(2) + " @ " +usdcFIAT.toFixed(4);
    // console.log(output);

    // return the price in FIAT terms, based on timestamp
    return output;

  } else {
    // unmatched token asset
    return "Convert Token - " + value;
  }

}

async function getSinglePrice(asset:any, value:any, timestamp:any, fiat:any, lastPrice:any) {

  let dateObj = new Date(timestamp * 1000);

  let useDate = dateObj.getDate() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getFullYear();


  let useAsset = asset.toLowerCase();

  // get correct asset ID
  if(asset === "USDC"){
    useAsset = "usd-coin";
  } else if(asset === "DAI"){
    useAsset = "dai";
  }

  let url = "https://api.coingecko.com/api/v3/coins/" + useAsset + "/history?date=" + useDate + "&localization=false";

  console.log("Lookup " + asset, fiat, useDate, url);

  let thisPrice = lastPrice;

  try {
    //const response = await fetch('https://website');
    thisPrice = await getPrice(url, fiat);
  } catch (error) {
    // TypeError: Failed to fetch
    console.log('There was an error', error);
    return lastPrice;   // return last price
  }

  // let fiatCode = fiat.toLowerCase();
  let priceUpdate = thisPrice[fiat.toLowerCase()];
  console.log("Price Update: " + priceUpdate);

  return priceUpdate;

}

// general block lookup function
const getPrice = async(url:any, fiat:any) => {

  let data = await fetch(url);
  let dataJSON = await data.json();

  // console.log(dataJSON);

  return dataJSON.market_data.current_price;
}



