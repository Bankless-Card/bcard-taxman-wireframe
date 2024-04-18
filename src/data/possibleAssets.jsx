// Note: Order of display on selection list is determined by the order of this data array.
export const possibleAssets = [
    "BANK",
    "ENS",
    "1INCH",
    "ANT",
    "MKR",
    "POKT",
    "POOL",
    "ARB",
    "DEGEN",
  
    "DAI",
    "WETH",
    "USDC",
    "USDT"
  ];

  // let assetGeckoList:any = {
  //   "USDC": "usd-coin",
  //   "DAI": "dai",
  //   "WETH": "ethereum",
  //   "BANK": "bankless-dao",
  //   "1INCH": "1inch",
  //   "ANT": "aragon",
  //   "MKR": "maker",
  //   "POKT": "pocket-network",
  //   "POOL": "pooltogether",
  //   "ENS": "ethereum-name-service",
  //   "ARB": "arbitrum",
  //   "DEGEN": "degen-base",
  //   "USDT": "tether"
  // }

  // let tokenLogoIndex = {
  //   "BANK": "/img/token/dao.jpg",
  //   "1INCH": "/img/token/1inch-logo.png",
  //   "ANT": "/img/token/ant-logo.png",
  //   "MKR": "/img/token/mkr-logo.png",
  //   "POKT": "/img/token/pokt-logo.png",
  //   "POOL": "/img/token/pool-logo.png",
  //   "ENS": "/img/token/ens-logo.png",
  //   "ARB": "/img/token/arb-logo.png",
  //   "DEGEN": "/img/token/degen-logo.png",
  //   "WETH": "/img/token/eth-logo.png",
  //   "DAI": "/img/token/dai-logo.png",
  //   "USDC": "/img/token/usdc-logo.png",
  //   "USDT": "/img/token/usdt-logo.png",
  // }

  // let tokenLabelIndex = {
  //   "BANK": "Bankless DAO",
  //   "1INCH": "1INCH Token",
  //   "ANT": "Aragon Token",
  //   "MKR": "Maker DAO Token",
  //   "POKT": "Poket Network Token",
  //   "POOL": "Pooltogether Token",
  //   "ENS": "ENS DAO Token",
  //   "ARB": "Arbitrum DAO Token",
  //   "DEGEN": "Degen.tips Token",
  //   "WETH": "Wrapped Ether",
  //   "DAI": "DAI Stablecoin",
  //   "USDC": "USDC Stablecoin",
  //   "USDT": "USDT Stablecoin",
  // }


  // add in contract addresses for each asset for verification on tx data
  export const possibleAssetsObj = {
    "BANK": {
      defaultPrice: 0.101,
      assetGeckoList: "bankless-dao",
      tokenLogoIndex: "/img/token/dao.jpg",
      tokenLabel: "Bankless DAO",
    },
    "ENS": {
      defaultPrice: 49.39483417275808,
      assetGeckoList: "ethereum-name-service",
      tokenLogoIndex: "/img/token/ens-logo.png",
      tokenLabel: "ENS DAO Token",
    },
    "1INCH": {
      defaultPrice: 3.0268715932288863,
      assetGeckoList: "1inch",
      tokenLogoIndex: "/img/token/1inch-logo.png",
      tokenLabel: "1INCH Token",
    },
    "ANT": {
      defaultPrice: 16.950179294162645,
      assetGeckoList: "aragon",
      tokenLogoIndex: "/img/token/ant-logo.png",
      tokenLabel: "Aragon Token",
    },
    "MKR": {
      defaultPrice: 2959.628120231065,
      assetGeckoList: "maker",
      tokenLogoIndex: "/img/token/mkr-logo.png",
      tokenLabel: "Maker DAO Token",
    },
    "POKT": {
      defaultPrice: 1.0,
      assetGeckoList: "pocket-network",
      tokenLogoIndex: "/img/token/pokt-logo.png",
      tokenLabel: "Poket Network Token",
    },
    "POOL": {
      defaultPrice: 5.277036824374893,
      assetGeckoList: "pooltogether",
      tokenLogoIndex: "/img/token/pool-logo.png",
      tokenLabel: "Pooltogether Token",
    },
    "OP": {
      defaultPrice: 2.222,
      assetGeckoList: "optimism",
      tokenLogoIndex: "/img/token/op-logo.png",
      tokenLabel: "OP Collective Token",
    },
    "ARB": {
      defaultPrice: 1.111,
      assetGeckoList: "arbitrum",
      tokenLogoIndex: "/img/token/arb-logo.png",
      tokenLabel: "Arbitrum DAO Token",
    },
    "DEGEN": {
      defaultPrice: 0.025,
      assetGeckoList: "degen-base",
      tokenLogoIndex: "/img/token/degen-logo.png",
      tokenLabel: "Degen.tips Token",
    },
  
    "DAI": {
      defaultPrice: 1.0,
      assetGeckoList: "dai",
      tokenLogoIndex: "/img/token/dai-logo.png",
      tokenLabel: "DAI Cryptodollar",
    },
    "WETH": {
      defaultPrice: 3500.420,
      assetGeckoList: "ethereum",
      tokenLogoIndex: "/img/token/eth-logo.png",
      tokenLabel: "Wrapped Ether",
    },
    "USDC": {
      defaultPrice: 1.0,
      assetGeckoList: "usd-coin",
      tokenLogoIndex: "/img/token/usdc-logo.png",
      tokenLabel: "USDC Cryptodollar",
    },
    "USDT": {
      defaultPrice: 1.0,
      assetGeckoList: "tether",
      tokenLogoIndex: "/img/token/usdt-logo.png",
      tokenLabel: "USDT Cryptodollar",
    },
  }
