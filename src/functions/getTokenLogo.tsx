import cs from '../style.module.css'
// import { handleOpen } from './handleOpen';

export function getTokenLogo(asset:any) {

  if(asset === "BANK"){
    return '<img class='+cs.tokenLogo+' src="./src/img/dao.jpg" alt="Bankless DAO" />';
  } else if(asset === "WETH"){
    return '<img class='+cs.tokenLogo+' src="./src/img/eth-logo.png" alt="Wrapped Ethereum Ether" />';
  } else if(asset === "DAI"){
    return '<img class='+cs.tokenLogo+' src="./src/img/dai-logo.png" alt="DAI Stablecoin" />';
  }

  // TODO: add more assets here

  // catch all return for non-matched assets
  return "Token Logo - " + asset;
}