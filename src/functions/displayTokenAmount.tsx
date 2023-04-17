// this function to parse the token amount and return a nice format

export function displayTokenAmount(value:any, asset:any, activeAssets:any){

  let niceFormat = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 9, minimumFractionDigits: 3,
    maximumFractionDigits: 3 }).format(value);

  // niceformat variable by country?

  // better to list all assets here and then if matched, return the basic value
  // can we import this from selection?
  // let assets = ["BANK", "1INCH", "ANT", "MKR", "POKT", "POOL", "WETH", "DAI", "USDC"]
  // let assets = activeAssets;

  if(asset === "WETH"){
    // adjust to 6 for ETH
    return parseFloat(value).toFixed(6) + " " + asset;

  } else if(activeAssets.includes(asset)){
    // catch all return for matched assets
    return niceFormat + " " + asset;
  } 

  // add more rules for specifc assets here

  // catch all return for non-matched assets
  return "Token Amount - " + value + " " + asset;
}


