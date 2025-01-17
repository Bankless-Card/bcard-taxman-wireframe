// this function to parse the token amount and return a nice format

export function displayTokenAmount(value:any, asset:any){

  let niceFormat = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 6, minimumFractionDigits: 3,
    maximumFractionDigits: 3 }).format(value);

  // niceformat variable by country?

  if(asset === "WETH"){
    // adjust to 6 for ETH
    return parseFloat(value).toFixed(6) + " " + asset;

  } else { 
    // catch all return for matched assets
    return niceFormat + " " + asset;
  }

  // add more rules for specifc assets here

  // catch all return for non-matched assets
  return "Token Amount - " + value + " " + asset;
}


