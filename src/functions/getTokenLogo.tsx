
export function getTokenLogo(asset:any) {

  if(asset === "BANK"){
    return "/img/token/dao.jpg";
  } else if(asset === "WETH"){
    return "/img/token/eth-logo.png";
  } else if(asset === "DAI"){
    return "/img/token/dai-logo.png";
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
  }

    //   return '<img class='+cs.tokenLogo+' src="./src/img/dai-logo.png" alt="DAI Stablecoin" />';
  // } else if(asset === "1INCH"){
  //   return '<img class='+cs.tokenLogo+' src="./src/img/1inch-logo.png" alt="1INCH Token" />';
  // } else if(asset === "ANT"){
  //   return '<img class='+cs.tokenLogo+' src="./src/img/ant-logo.png" alt="Aragon Token" />';
  // } else if(asset === "MKR"){
  //   return '<img class='+cs.tokenLogo+' src="./src/img/mkr-logo.png" alt="MKR Token" />';
  // } else if(asset === "POKT"){
  //   return '<img class='+cs.tokenLogo+' src="./src/img/pokt-logo.png" alt="POKT Network Token" />';
  // } else if(asset === "POOL"){
  //   return '<img class='+cs.tokenLogo+' src="./src/img/pool-logo.png" alt="Pooltogether Token" />';
    


  // TODO: add more assets here

  // catch all return for non-matched assets
  return "Token Logo - " + asset;
}