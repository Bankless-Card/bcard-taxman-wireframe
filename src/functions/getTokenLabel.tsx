import cs from '../style.module.css'
import { handleOpen } from './handleOpen';

// export function getTokenLogo(asset:any) {
export function getTokenLabel(asset:any){

  if(asset === "BANK"){
    return "Bankless DAO";
  } else if(asset === "WETH"){
    return 'Wrapped Ether';
  } else if(asset === "DAI") {
    return 'DAI Stablecoin';
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
  // TODO: add more assets here

  // catch all return for non-matched assets
  return "Token Label - " + asset;
}  


