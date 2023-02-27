import cs from '../style.module.css'
// import { handleOpen } from './handleOpen';

export function getTokenLogo(asset:any) {

  if(asset === "BANK"){
    return '<img class='+cs.tokenLogo+' src="./src/img/dao.png" alt="Bankless DAO" />';
  }

  // TODO: add more assets here

  // catch all return for non-matched assets
  return "Token Logo - " + asset;
}