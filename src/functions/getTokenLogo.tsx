import cs from '../style.module.css'
// import { handleOpen } from './handleOpen';

export function getTokenLogo(asset:any) {

  if(asset === "BANK"){
    return "./img/dao.jpg";
  } else if(asset === "WETH"){
    return './img/eth-logo.png';
  } else if(asset === "DAI"){
    return '/img/dai-logo.png';
  }

  // TODO: add more assets here

  // catch all return for non-matched assets
  return "Token Logo - " + asset;
}