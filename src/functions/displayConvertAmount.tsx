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
import { API_URL } from '../data/env';


// CREATE and IMPORT NEW function to get DYNAMIC price data for each token based on timestamps
// NEW: USE Single pricing API call to get only a single price for each token.

// this function is IMPORTANT in calculating the price of the asset based on historical price data
export async function displayConvertAmount(value:any, asset:any, timestamp:any, fiat:string, incoming:boolean){
  // USD/FIAT value @ timefrom blockNum

  // Since this receives a SINGLE value for asset, we are looking up only a 
  // single price from data set with each load.
  // parse hrough the historical data corresponding to the asset and FIAT and 
  // return price at timestamp

  // console.log(asset, value, timestamp, fiat, CG_API_KEY, CG_API_URL);

  

  if(asset){
    //   if(asset === "BANK" || asset === "1INCH" || asset === "ANT" || asset === "MKR" || asset === "POKT" || asset === "POOL" || asset === "ENS" || asset === "WETH" || asset === "DAI" || asset === "USDC"
    //   || asset === "ARB" || asset === "DEGEN" || asset === "USDT"
    //  ){
    
    // get active assets list and compare to asset
    // console.log(asset)

    // get data output to return to front end
    return assetDataLoop(asset, fiat, timestamp, value, incoming);


  } else {
      // unmatched token asset - we dont lookup values for these tokens
      return "Convert Token - " + value;
    }

}

// this function is IMPORTANT in calculating the unknown price of the asset based on historical price data and FIAT input
async function getSinglePriceAndImage(asset:any, value:any, timestamp:any, fiat:any, lastPrice:any) {

  let dateObj = new Date(timestamp * 1000);

  // date format for CoinGecko API lookup request
  let useDate = dateObj.getDate() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getFullYear();

  // default for inputs - get GC asset label from possibleAssetsObj
  let useAsset = asset.toLowerCase();
  if(possibleAssetsObj && asset in possibleAssetsObj){
    useAsset = possibleAssetsObj[asset as keyof typeof possibleAssetsObj].assetGeckoList || asset.toLowerCase();
  }
  // console.log("Asset: " +useAsset, asset);
  let useFiat = fiat.toLowerCase();


  switch(fiat){
    case "CAD":
      useFiat = "cad";
      break;
    case "EUR":
      useFiat = "eur";
      break;
    case "GBP":
      useFiat = "gbp";
      break;
    case "AUD":
      useFiat = "aud";
      break;
    default:
      useFiat = "usd";
  }

  // build the URL for pricing data lookup
  //  https://docs.coingecko.com/v3.0.1/reference/coins-id-history
  let url = CG_API_URL + "coins/" + useAsset + "/history?date=" + useDate + "&localization=true";
  //console.log("Lookup using Pro API: " + asset, fiat, useDate, url, useAsset);

  let gp = await getPriceAndImage(useAsset, useDate);   // gecko price

  if (typeof gp === 'object' && gp !== null && 'prices' in gp && 'image' in gp) {
    return {
      "price": gp.prices[useFiat],
      "image": gp.image.small
    };
  }  

  return {
    "price": 0,
    "image": 0    
  }
}

// general price/history ASYNC lookup function
async function getPriceAndImage(asset: string, date: string) {
  // Return 0 if asset contains a dot (likely a scam token)
  if (asset.includes('.')) {
    return 0;
  }

  try {
    // Ensure proper URL encoding of parameters
    const encodedAsset = encodeURIComponent(asset);
    const encodedDate = encodeURIComponent(date);
    
    // Ensure API_URL doesn't end with a slash
    const baseUrl = API_URL.replace(/\/$/, '');
    const url = `${baseUrl}/api/price-lookup?asset=${encodedAsset}&date=${encodedDate}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return {
        prices: data.prices,
        image: data.image
      };
    } else {
      console.error('Price lookup failed:', data.error);
      return 0;
    }
  } catch (error) {
    console.error('Error fetching price:', error);
    return 0;
  }
}

// this function to generalize the data lookup for each asset
async function assetDataLoop(asset:any, fiat:any, timestamp:any, value:any, incoming:boolean){

  //console.log("Asset Data Loop: " + asset, fiat, timestamp, value);

  // initial pricing data to be used based on asset
  let defaultPrice = 0;
  if (possibleAssetsObj && asset in possibleAssetsObj) {
    defaultPrice = possibleAssetsObj[asset as keyof typeof possibleAssetsObj].defaultPrice || 0;
  }
  // console.log("Default Price: " + defaultPrice);
  let currentPrice = defaultPrice;
  let currentImage = null;
  // which data cache table to be used to lookup data
  let priceFiatHistory = getPriceFiatTable(asset, fiat);    // default BANK history


  // init the index for loop lookup
  let i = 0;

  // HANDLE STABLES - USDC, DAI, USDT
  // skip historical lookups for stables
  if(asset === "USDC" || asset === "DAI" || asset === "USDT"){
    // console.log("BUG: Need to update pricing for country currency.")
    let priceAndImage = await getSinglePriceAndImage(asset, value, timestamp, fiat, defaultPrice);
    currentPrice = priceAndImage.price || defaultPrice;
    currentImage = priceAndImage.image || null;

  } else {
    if(priceFiatHistory !== undefined){

      // if the timestamp data indicates a date before the first price in the data set
      if (timestamp < priceFiatHistory[0][0] / 1000) {
        // then we need to call for a single lookup price and skip the loop
        //console.log("Pre Cache: then we need to call for a single lookup price and skip the loop");
        let priceAndImage = await getSinglePriceAndImage(asset, value, timestamp, fiat, defaultPrice);
        currentPrice = priceAndImage.price || defaultPrice;
        currentImage = priceAndImage.image || null;
      } else if (timestamp > priceFiatHistory[priceFiatHistory.length - 1][0] / 1000) {
        //console.log("After Cache: it's a future date beyond our stored data, skip the looping lookup.");

        let priceAndImage = await getSinglePriceAndImage(asset, value, timestamp, fiat, defaultPrice);
        currentPrice = priceAndImage.price || defaultPrice;
        currentImage = priceAndImage.image || null;

        // console.log("FAILING Current Price: " + currentPrice);  // this is the price at timestamp


      } else {

        // otherwise, we can loop through the data set to find the right price
        while(timestamp > priceFiatHistory[i][0]/1000){
          currentPrice = priceFiatHistory[i][1];    // set price up to timestamp
          i++;  // next item

          // check for undefined data - it's a future date
          if(i >= priceFiatHistory.length || priceFiatHistory[i] === undefined){
            //console.log("Note: Loop to check price out of data range. - lookup data, and we're out.");

            // this call is different as it uses the currently stored price from the stored data (NOT NEEDED?)
            let priceAndImage = await getSinglePriceAndImage(asset, value, timestamp, fiat, defaultPrice);
            currentPrice = priceAndImage.price || defaultPrice;
            currentImage = priceAndImage.image || null;

            break;

          } 
        }   // end while loop

      }  // end conditional timestamp checks



      
    } else {
      //console.log("Note: Token data is undefined - No data cache.");

      let priceAndImage = await getSinglePriceAndImage(asset, value, timestamp, fiat, defaultPrice);
      currentPrice = priceAndImage.price || defaultPrice;
      currentImage = priceAndImage.image || null;
    }  // end undefined check for price data history
  }   // end else (not stables)


  let fiatValue = parseFloat((currentPrice*parseFloat(value)).toFixed(2));
  if(!incoming){
    fiatValue *= -1;
  }

  let prettyOutput = fiatValue+" "+fiat;

  // return the price in FIAT terms, based on timestamp
  return [fiatValue, fiat, currentPrice, prettyOutput, currentImage];
}

// needs acccess to the data cache
function getPriceFiatTable(asset:any, fiat:any){
  switch(asset){
    case "USDC":
      if(fiat === 'CAD'){
        return usdcPrices2022.usdcCad.prices;
      } else if(fiat === 'EUR'){
        return usdcPrices2022.usdcEur.prices;
      } else  if(fiat === 'USD'){
        return usdcPrices2022.usdcUsd.prices;
      } else {
        return undefined;
      }

    case "DAI":
      if(fiat === 'CAD'){
        return daiPrices2022.daiCad.prices;
      } else if(fiat === 'EUR'){
        return daiPrices2022.daiEur.prices;
      } else if(fiat === 'USD'){
        return daiPrices2022.daiUsd.prices;
      } else {
        return undefined;
      }

    case "WETH":
      if(fiat === 'CAD'){
        return ethPrices2022.ethCad.prices;
      } else if(fiat === 'EUR'){
        return ethPrices2022.ethEur.prices;
      } else if(fiat === 'USD'){
        return ethPrices2022.ethUsd.prices;
      } else {
        return undefined;
      }

    case "BANK":
      if(fiat === 'CAD'){
        return bankPrices2022.bankCad.prices;
      } else if(fiat === 'EUR'){
        return bankPrices2022.bankEur.prices;
      } else if(fiat === 'USD'){
        return bankPrices2022.bankUsd.prices;
      } else {
        return undefined;
      }

    case "1INCH":
      if(fiat === 'CAD'){
        return inchPrices2022.inchCad.prices;
      } else if(fiat === 'EUR'){
        return inchPrices2022.inchEur.prices;
      } else if(fiat === 'USD'){
        return inchPrices2022.inchUsd.prices;
      } else {
        return undefined;
      }

    case "ANT":
      if(fiat === 'CAD'){
        return antPrices2022.antCad.prices;
      } else if(fiat === 'EUR'){
        return antPrices2022.antEur.prices;
      } else if(fiat === 'USD'){
        return antPrices2022.antUsd.prices;
      } else {
        return undefined;
      }

    case "MKR":
      if(fiat === 'CAD'){
        return mkrPrices2022.mkrCad.prices;
      } else if(fiat === 'EUR'){
        return mkrPrices2022.mkrEur.prices;
      } else if(fiat === 'USD'){
        return mkrPrices2022.mkrUsd.prices;
      } else {
        return undefined;
      }

    case "POKT":
      if(fiat === 'CAD'){
        return poktPrices2022.poktCad.prices;
      } else if(fiat === 'EUR'){
        return poktPrices2022.poktEur.prices;
      } else if(fiat === 'USD'){
        return poktPrices2022.poktUsd.prices;
      } else {
        return undefined;
      }
      
    case "POOL":
      if(fiat === 'CAD'){
        return poolPrices2022.poolCad.prices;
      } else if(fiat === 'EUR'){
        return poolPrices2022.poolEur.prices;
      } else if(fiat === 'USD'){
        return poolPrices2022.poolUsd.prices;
      } else {
        return undefined;
      }

    case "ENS":
      if(fiat === 'CAD'){
        return ensPrices2022.ensCad.prices;
      } else if(fiat === 'EUR'){
        return ensPrices2022.ensEur.prices;
      } else if(fiat === 'USD'){
        return ensPrices2022.ensUsd.prices;
      } else {
        return undefined;
      }

    default:

      return undefined;
      // return BANK prices to give some entry instead of empty
      if(fiat === 'CAD'){
        return undefined;
      } else if(fiat === 'EUR'){
        return undefined;
      } else if(fiat === 'USD'){
        return undefined;
      }
  }
}
