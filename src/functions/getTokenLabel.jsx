import { possibleAssetsObj } from "../data/possibleAssets";
// Description: This function returns the label for a given token symbol
export function getTokenLabel(asset){

  return possibleAssetsObj[asset].tokenLabel;

  let tokenLabelIndex = {
    "BANK": "Bankless DAO",
    "1INCH": "1INCH Token",
    "ANT": "Aragon Token",
    "MKR": "Maker DAO Token",
    "POKT": "Poket Network Token",
    "POOL": "Pooltogether Token",
    "ENS": "ENS DAO Token",
    "ARB": "Arbitrum DAO Token",
    "DEGEN": "Degen.tips Token",
    "WETH": "Wrapped Ether",
    "DAI": "DAI Stablecoin",
    "USDC": "USDC Stablecoin",
    "USDT": "USDT Stablecoin",
  }

  if(Object.keys(tokenLabelIndex).includes(asset)){
    return tokenLabelIndex[asset];
  } else {
    return "Token Label - " + asset;
  }

  // // dao assets
  // if(asset === "BANK"){
  //   return "Bankless DAO";
  // } else if(asset === "1INCH"){
  //   return '1INCH Token';
  // } else if(asset === "ANT"){
  //   return 'Aragon Token';
  // } else if(asset === "MKR"){
  //   return 'Maker DAO Token';
  // } else if(asset === "POKT"){
  //   return 'Poket Network Token';
  // } else if(asset === "POOL"){
  //   return 'Pooltogether Token';
  // } else if(asset === "ENS"){
  //   return 'ENS DAO Token';
  // } else if(asset === "ARB"){
  //   return 'Arbitrum DAO Token';
  // }
  // // non-dao assets
  // else if(asset === "WETH"){
  //   return 'Wrapped Ether';
  // } else if(asset === "DAI") {
  //   return 'DAI Stablecoin';
  // } else if(asset === "USDC"){
  //   return 'USDC Stablecoin';
  // }
  // // TODO: add more assets here

  // // catch all return for non-matched assets
  // return "Token Label - " + asset;
}  


