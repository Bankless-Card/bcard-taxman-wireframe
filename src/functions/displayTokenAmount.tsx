// import cs from '../style.module.css'

export function displayTokenAmount(value:any, asset:any){

  let niceFormat = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 9, minimumFractionDigits: 3,
    maximumFractionDigits: 3 }).format(value);

  if(asset === "BANK"){
    // Limit to three significant digits
    // let niceFormat = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 9, minimumFractionDigits: 3,
    //   maximumFractionDigits: 3 }).format(value);
    // console.log(niceFormat);
    // Expected output: "1,23,000"

    return niceFormat + " " + asset;

    // return  parseFloat(value).toFixed(3) + " " + asset;
  } else if(asset === "WETH"){
    return parseFloat(value).toFixed(8) + " " + asset;
  } else if(asset === "DAI"){
    return niceFormat + " " + asset;
    // return parseFloat(value).toFixed(3) + " " + asset;
  }

  // add more assets here

  // catch all return for non-matched assets
  return "Token Amount - " + value + " " + asset;
}


