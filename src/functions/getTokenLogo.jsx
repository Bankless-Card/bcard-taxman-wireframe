import { possibleAssetsObj } from "../data/possibleAssets";
export function getTokenLogo(asset) {

  return possibleAssetsObj[asset].tokenLogoIndex;

  let tokenLogoIndex = {
    "BANK": "/img/token/dao.jpg",
    "1INCH": "/img/token/1inch-logo.png",
    "ANT": "/img/token/ant-logo.png",
    "MKR": "/img/token/mkr-logo.png",
    "POKT": "/img/token/pokt-logo.png",
    "POOL": "/img/token/pool-logo.png",
    "ENS": "/img/token/ens-logo.png",
    "ARB": "/img/token/arb-logo.png",
    "DEGEN": "/img/token/degen-logo.png",
    "WETH": "/img/token/eth-logo.png",
    "DAI": "/img/token/dai-logo.png",
    "USDC": "/img/token/usdc-logo.png",
    "USDT": "/img/token/usdt-logo.png",
  }

  console.log("possibleAssetsObj: ", possibleAssetsObj);
  console.log("possibleAssetsObj[asset]: ", possibleAssetsObj[asset]);
  console.log("possibleAssetsObj[asset].tokenLogoIndex: ", possibleAssetsObj[asset].tokenLogoIndex);

  if(Object.keys(tokenLogoIndex).includes(asset)){
    return tokenLogoIndex[asset];
  } else {
    return "/img/token/dao.jpg";    // default DAO image
  }

  // if(asset === "BANK"){
  //   return "/img/token/dao.jpg";
  // } else if(asset === "1INCH"){
  //   return "/img/token/1inch-logo.png";
  // } else if(asset === "ANT"){
  //   return "/img/token/ant-logo.png";
  // } else if(asset === "MKR"){
  //   return "/img/token/mkr-logo.png";
  // } else if(asset === "POKT"){
  //   return "/img/token/pokt-logo.png";
  // } else if(asset === "POOL"){
  //   return "/img/token/pool-logo.png";
  // } else if(asset === "ENS"){
  //   return "/img/token/ens-logo.png";
  // }

  // // non-DAO specific assets
  // else if(asset === "WETH"){
  //   return "/img/token/eth-logo.png";
  // } else if(asset === "DAI"){
  //   return "/img/token/dai-logo.png";
  // } else if(asset === "USDC"){
  //   return "/img/token/usdc-logo.png";
  // }

  // // TODO: add more assets here

  // // catch all return for non-matched assets
  // return "Token Logo - " + asset;
}