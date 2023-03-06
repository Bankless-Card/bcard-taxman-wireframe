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
  }
  // TODO: add more assets here

  // catch all return for non-matched assets
  return "Token Label - " + asset;
}  


