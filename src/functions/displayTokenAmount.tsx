// import cs from '../style.module.css'

export function displayTokenAmount(value:any, asset:any){

  let niceFormat = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 9, minimumFractionDigits: 3,
    maximumFractionDigits: 3 }).format(value);

  // niceformat variable by country?

  // better to list all assets here andthen if matched, return the basic value
  let assets = ["BANK", "WETH", "DAI", "1INCH", "ANT", "MKR", "POKT", "POOL"]

  if(asset === "WETH"){
    // adjust to 6 for ETH
    return parseFloat(value).toFixed(6) + " " + asset;

  } else if(assets.includes(asset)){
    // catch all return for matched assets
    return niceFormat + " " + asset;
  } 

  // add more assets here

  // catch all return for non-matched assets
  return "Token Amount - " + value + " " + asset;
}


