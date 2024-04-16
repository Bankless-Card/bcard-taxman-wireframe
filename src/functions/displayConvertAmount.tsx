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
  usdcPrices2022,
  CG_API_KEY,
  CG_API_URL } from "../data";

import { possibleAssetsObj } from "../data/possibleAssets";


// CREATE and IMPORT NEW function to get DYNAMIC price data for each token based on timestamps
// NEW: USE Single pricing API call to get only a single price for each token.

// this function is IMPORTANT in calculating the price of the asset based on historical price data
export async function displayConvertAmount(value:any, asset:any, timestamp:any, fiat:string){
  // USD/FIAT value @ timefrom blockNum

  // Since this receives a SINGLE value for asset, we are looking up only a 
  // single price from data set with each load.
  // parse hrough the historical data corresponding to the asset and FIAT and 
  // return price at timestamp

  // console.log(asset, value, timestamp, fiat, CG_API_KEY, CG_API_URL);

  

  if(possibleAssetsObj[asset as keyof typeof possibleAssetsObj] === undefined){
    console.log("Asset not found in lookup.");
    console.log(possibleAssetsObj);
    return "Asset not found in lookup.";
  } else if(asset){
    //   if(asset === "BANK" || asset === "1INCH" || asset === "ANT" || asset === "MKR" || asset === "POKT" || asset === "POOL" || asset === "ENS" || asset === "WETH" || asset === "DAI" || asset === "USDC"
    //   || asset === "ARB" || asset === "DEGEN" || asset === "USDT"
    //  ){
    
    // get active assets list and compare to asset
    console.log(asset)

    // get data output to return to front end
    return assetDataLoop(asset, fiat, timestamp, value);


  } else {
      // unmatched token asset - we dont lookup values for these tokens
      return "Convert Token - " + value;
    }

}

// this function is IMPORTANT in calculating the unknown price of the asset based on historical price data and FIAT input
async function getSinglePrice(asset:any, value:any, timestamp:any, fiat:any, lastPrice:any) {

  let dateObj = new Date(timestamp * 1000);

  // date format for CoinGecko API lookup request
  let useDate = dateObj.getDate() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getFullYear();

  // default for inputs
  let useAsset = possibleAssetsObj[asset as keyof typeof possibleAssetsObj].assetGeckoList || asset.toLowerCase();
  // console.log("Asset: " +useAsset, asset);
  let useFiat = fiat.toLowerCase();


  switch(fiat){
    case "CAD":
      useFiat = "cad";
      break;
    case "EUR":
      useFiat = "eur";
      break;
    default:
      useFiat = "usd";
  }

  // build the URL for pricing data lookup
  //  https://docs.coingecko.com/v3.0.1/reference/coins-id-history
  let url = CG_API_URL + "coins/" + useAsset + "/history?date=" + useDate + "&localization=true";
  console.log("Lookup using Pro API: " + asset, fiat, useDate, url, useAsset);

  // BUG ATM, CANNOT USE PRO API KEY

  url = "https://api.coingecko.com/api/v3/coins/" + useAsset + "/history?date=" + useDate + "&localization=true";
  console.log("Lookup using FREE API: " + asset, fiat, useDate, url, useAsset);

  let gp = await getPrice(url);   // gecko price

  
  if(gp === 0){
    console.log("Price Lookup is 0/error, returning last price: " + lastPrice);
    return lastPrice;
  } else {
    let priceUpdate = gp[useFiat];
    console.log("$$API$$ Price Update: " + priceUpdate);
      
    return priceUpdate;
  }

}

// general price/history ASYNC lookup function
const getPrice = async(url:any) => {

  // console.log(url);
  // CG_API_KEY
  const CG_API_KEY_LABEL = 'x-cg-pro-api-key';   // this changed between demo and pro API
  var headers = {
    accept: 'application/json', 
    'x-cg-pro-api-key': CG_API_KEY
  }

  var headersDemo = {
    accept: 'application/json', 
    'x-cg-demo-api-key': 'CG-jbXwiJ1kcdvbUK6hP6m8Rt1b'
  }

  // DEMO option: 'x-cg-demo-api-key': CG-jbXwiJ1kcdvbUK6hP6m8Rt1b


  console.log("API Key Label: ", CG_API_KEY_LABEL);

  let data = await fetch(url,
    {method: 'GET', headers: headersDemo}
  );
  let dataJSON = await data.json();
  
  // console.log(dataJSON);
  if(dataJSON.error){
    console.log("Error in getPrice: ", dataJSON.error);
    return 0;
  } else {
    // return only token prices
    return dataJSON.market_data.current_price;
  }

  

//   console.log(url, " in get Price");
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json', 
//       'x-cg-demo-api-key': 'CG-jbXwiJ1kcdvbUK6hP6m8Rt1b'
//     }
//   };

// let dataJSON: { market_data: { current_price: any } } = { market_data: { current_price: 0 }};
// fetch(url, options)
//   .then(res => res.json())
//   .then(json => {
//     console.log(json)
//     dataJSON = json;

//     console.log(dataJSON.market_data.current_price);    // this has all currencies included here in market_price object

//     return dataJSON.market_data.current_price;
//   })
//   .catch(err => console.error('error:' + err));



}

// this function to generalize the data lookup for each asset
async function assetDataLoop(asset:any, fiat:any, timestamp:any, value:any){

  // initial pricing data to be used based on asset
  let defaultPrice = possibleAssetsObj[asset as keyof typeof possibleAssetsObj].defaultPrice || 1;
  // console.log("Default Price: " + defaultPrice);
  let currentPrice = defaultPrice;
  // which data cache table to be used to lookup data
  console.log("Need to add cache for NEW assets OR remove DEFAULT of BANK from lookup.")
  let priceFiatHistory = getPriceFiatTable(asset, fiat);    // default BANK history


  // init the index for loop lookup
  let i = 0;

  // skip historical lookups for stables
  if(asset === "USDC" || asset === "DAI" || asset === "USDT"){
    console.log("BUG: Need to update pricing for country currency.")
    if(fiat === "CAD"){
      console.log("lookup CAD/USD for timestamp supplied.");
      currentPrice = 1.35;    // 1 CAD = 0.74 USD
    } else if(fiat === "EUR"){
      console.log("lookup EUR/USD for timestamp supplied.");
      currentPrice = 0.93;    // 1 EUR = 1.07 USD
    } else {
      currentPrice = defaultPrice;    // same assignemnt as default
    }
  } else {
    if(priceFiatHistory !== undefined){


      // testing call for single price lookup
      // let cp = await getSinglePrice(asset, value, timestamp, fiat, defaultPrice);
      // console.log("Single Price: " + cp);



      // if the timestamp data indicates a date before the first price in the data set
      if (timestamp < priceFiatHistory[0][0] / 1000) {
        // then we need to call for a single lookup price and skip the loop
        console.log("Pre Cache: then we need to call for a single lookup price and skip the loop");
        currentPrice = await getSinglePrice(asset, value, timestamp, fiat, defaultPrice) || defaultPrice;
      } else if (timestamp > priceFiatHistory[priceFiatHistory.length - 1][0] / 1000) {
        console.log("After Cache: it's a future date beyond our stored data, skip the looping lookup.");

        currentPrice = await getSinglePrice(asset, value, timestamp, fiat, defaultPrice);

        // console.log("FAILING Current Price: " + currentPrice);  // this is the price at timestamp


      } else {

        // otherwise, we can loop through the data set to find the right price
        while(timestamp > priceFiatHistory[i][0]/1000){
          currentPrice = priceFiatHistory[i][1];    // set price up to timestamp
          i++;  // next item

          // check for undefined data - it's a future date
          if(i >= priceFiatHistory.length || priceFiatHistory[i] === undefined){
            console.log("Note: Loop to check price out of data range. - lookup data, and we're out.");

            // this call is different as it uses the currently stored price from the stored data (NOT NEEDED?)
            currentPrice = await getSinglePrice(asset, value, timestamp, fiat, currentPrice);

            break;

          } 
        }   // end while loop

      }  // end conditional timestamp checks



      
    } else {
      console.log("Note: Token data is undefined - No data cache.");

      currentPrice = await getSinglePrice(asset, value, timestamp, fiat, defaultPrice);
    }  // end undefined check for price data history
  }   // end else (not stables)



  let output = "$"+fiat+" "+(currentPrice*parseFloat(value)).toFixed(2) + " @ " +currentPrice.toFixed(4);

  // return the price in FIAT terms, based on timestamp
  return output;
}
// hard-coded defaults based on 2022 starting pri
// function getDefaultPrice(asset:any){

//   console.log("Default Prices to be set in MAIN DATA for all assets & imported");

//   // const defaultPrices:any = {
//   //   "bank": 0.0101,
//   //   "1inch": 3.0268715932288863,
//   //   "ant": 16.950179294162645,
//   //   "mkr": 2959.628120231065,
//   //   "pokt": 1.0101,
//   //   "pool": 5.277036824374893,
//   //   "ens": 49.39483417275808,
//   //   "weth": 2000.0101,
//   //   "arb": 1.1111,
//   //   "degen": 0.0101,

//   //   "dai": 1.0010,
//   //   "usdc": 1.0010,
//   //   "usdt": 1.0010,
//   // };

//   // const defaultPrices:any = possibleAssetsObj;


//   // console.log(asset, defaultPrices[asset.toLowerCase()]);

//   // switch(asset){
//   //   case "USDC":
//   //     return defaultPrices.usdc;
//   //   case "DAI":
//   //     return defaultPrices.dai;   // same as default
//   //   case "WETH":
//   //     return defaultPrices.weth;
//   //   case "BANK":
//   //     return defaultPrices.bank;
//   //   case "1INCH":
//   //     return defaultPrices["1inch"];
//   //   case "ANT":
//   //     return defaultPrices.ant;
//   //   case "MKR":
//   //     return defaultPrices.mkr;
//   //   case "POKT":
//   //     return defaultPrices.pokt;
//   //   case "POOL":
//   //     return defaultPrices.pool;
//   //   case "ENS":
//   //     return defaultPrices.ens;
//   //   case "ARB":
//   //     // console.log("arb")
//   //     return defaultPrices.arb;
//   //   case "DEGEN":
//   //     return defaultPrices.degen;
//   //   default:
//   //     // stablecoin default 1 USD
//   //     return defaultPrices.dai;
//   // }

//   return possibleAssetsObj[asset as keyof typeof possibleAssetsObj].defaultPrice;

// }

// needs acccess to the data cache
function getPriceFiatTable(asset:any, fiat:any){
  switch(asset){
    case "USDC":
      if(fiat === 'CAD'){
        return usdcPrices2022.usdcCad.prices;
      } else if(fiat === 'EUR'){
        return usdcPrices2022.usdcEur.prices;
      } else {
        return usdcPrices2022.usdcUsd.prices;
      }

    case "DAI":
      if(fiat === 'CAD'){
        return daiPrices2022.daiCad.prices;
      } else if(fiat === 'EUR'){
        return daiPrices2022.daiEur.prices;
      } else {
        return daiPrices2022.daiUsd.prices;
      }

    case "WETH":
      if(fiat === 'CAD'){
        return ethPrices2022.ethCad.prices;
      } else if(fiat === 'EUR'){
        return ethPrices2022.ethEur.prices;
      } else {
        return ethPrices2022.ethUsd.prices;
      }

    case "BANK":
      if(fiat === 'CAD'){
        return bankPrices2022.bankCad.prices;
      } else if(fiat === 'EUR'){
        return bankPrices2022.bankEur.prices;
      } else {
        return bankPrices2022.bankUsd.prices;
      }

    case "1INCH":
      if(fiat === 'CAD'){
        return inchPrices2022.inchCad.prices;
      } else if(fiat === 'EUR'){
        return inchPrices2022.inchEur.prices;
      } else {
        return inchPrices2022.inchUsd.prices;
      }

    case "ANT":
      if(fiat === 'CAD'){
        return antPrices2022.antCad.prices;
      } else if(fiat === 'EUR'){
        return antPrices2022.antEur.prices;
      } else {
        return antPrices2022.antUsd.prices;
      }

    case "MKR":
      if(fiat === 'CAD'){
        return mkrPrices2022.mkrCad.prices;
      } else if(fiat === 'EUR'){
        return mkrPrices2022.mkrEur.prices;
      } else {
        return mkrPrices2022.mkrUsd.prices;
      }

    case "POKT":
      if(fiat === 'CAD'){
        return poktPrices2022.poktCad.prices;
      } else if(fiat === 'EUR'){
        return poktPrices2022.poktEur.prices;
      } else {
        return poktPrices2022.poktUsd.prices;
      }
      
    case "POOL":
      if(fiat === 'CAD'){
        return poolPrices2022.poolCad.prices;
      } else if(fiat === 'EUR'){
        return poolPrices2022.poolEur.prices;
      } else {
        return poolPrices2022.poolUsd.prices;
      }

    case "ENS":
      if(fiat === 'CAD'){
        return ensPrices2022.ensCad.prices;
      } else if(fiat === 'EUR'){
        return ensPrices2022.ensEur.prices;
      } else {
        return ensPrices2022.ensUsd.prices;
      }

    default:
      // return BANK prices to give some entry instead of empty
      if(fiat === 'CAD'){
        return bankPrices2022.bankCad.prices;
      } else if(fiat === 'EUR'){
        return bankPrices2022.bankEur.prices;
      } else if(fiat === 'USD'){
        return bankPrices2022.bankUsd.prices;
      }
  }
}
