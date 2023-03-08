import cs from '../style.module.css'
// import { handleOpen } from './handleOpen';

export function getTokenLogo(asset:any) {

  if(asset === "BANK"){
    return '<img class='+cs.tokenLogo+' src="./src/img/dao.jpg" alt="Bankless DAO" />';
  } else if(asset === "WETH"){
    return '<img class='+cs.tokenLogo+' src="./src/img/eth-logo.png" alt="Wrapped Ethereum Ether" />';
  } else if(asset === "DAI"){
    return '<img class='+cs.tokenLogo+' src="./src/img/dai-logo.png" alt="DAI Stablecoin" />';
  } else if(asset === "1INCH"){
    return '<img class='+cs.tokenLogo+' src="./src/img/1inch-logo.png" alt="1INCH Token" />';
  } else if(asset === "ANT"){
    return '<img class='+cs.tokenLogo+' src="./src/img/ant-logo.png" alt="Aragon Token" />';
  } else if(asset === "MKR"){
    return '<img class='+cs.tokenLogo+' src="./src/img/mkr-logo.png" alt="MKR Token" />';
  } else if(asset === "POKT"){
    return '<img class='+cs.tokenLogo+' src="./src/img/pokt-logo.png" alt="POKT Network Token" />';
  } else if(asset === "POOL"){
    return '<img class='+cs.tokenLogo+' src="./src/img/pool-logo.png" alt="Pooltogether Token" />';
  }


  // TODO: add more assets here

  // catch all return for non-matched assets
  return "Token Logo - " + asset;
}