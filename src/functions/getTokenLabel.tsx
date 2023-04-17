// import cs from '../style.module.css'

// export function getTokenLogo(asset:any) {
export function getTokenLabel(asset:any){

  // dao assets
  if(asset === "BANK"){
    return "Bankless DAO";
  } else if(asset === "1INCH"){
    return '1INCH Token';
  } else if(asset === "ANT"){
    return 'Aragon Token';
  } else if(asset === "MKR"){
    return 'Maker DAO Token';
  } else if(asset === "POKT"){
    return 'Poket Network Token';
  } else if(asset === "POOL"){
    return 'Pooltogether Token';
  } 
  // non-dao assets
  else if(asset === "WETH"){
    return 'Wrapped Ether';
  } else if(asset === "DAI") {
    return 'DAI Stablecoin';
  } else if(asset === "USDC"){
    return 'USDC Stablecoin';
  }
  // TODO: add more assets here

  // catch all return for non-matched assets
  return "Token Label - " + asset;
}  


