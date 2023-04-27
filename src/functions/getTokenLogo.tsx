
export function getTokenLogo(asset:any) {

  if(asset === "BANK"){
    return "/img/token/dao.jpg";
  } else if(asset === "1INCH"){
    return "/img/token/1inch-logo.png";
  } else if(asset === "ANT"){
    return "/img/token/ant-logo.png";
  } else if(asset === "MKR"){
    return "/img/token/mkr-logo.png";
  } else if(asset === "POKT"){
    return "/img/token/pokt-logo.png";
  } else if(asset === "POOL"){
    return "/img/token/pool-logo.png";
  } else if(asset === "ENS"){
    return "/img/token/ens-logo.png";
  }

  // non-DAO specific assets
  else if(asset === "WETH"){
    return "/img/token/eth-logo.png";
  } else if(asset === "DAI"){
    return "/img/token/dai-logo.png";
  } else if(asset === "USDC"){
    return "/img/token/usdc-logo.png";
  }

  // TODO: add more assets here

  // catch all return for non-matched assets
  return "Token Logo - " + asset;
}