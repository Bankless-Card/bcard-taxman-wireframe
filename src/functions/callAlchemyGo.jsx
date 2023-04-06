import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';

// data imports
import { REACT_APP_ALCHEMY_API_KEY, ELASTICMAIL_SECURETOKEN } from '../data/env.tsx' 

// const REACT_APP_ALCHEMY_API_KEY = "szbJviwD1JXcAcbDNY0Mk7qn6uql-sN9";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: REACT_APP_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const polygon = new Alchemy({ apiKey: REACT_APP_ALCHEMY_API_KEY, network: Network.MATIC_MAINNET });
const optimism = new Alchemy({ apiKey: REACT_APP_ALCHEMY_API_KEY, network: Network.OPT_MAINNET });


// other functions
import { getTokenLogo } from "../functions/getTokenLogo.tsx";
import { getTokenLabel } from "../functions/getTokenLabel.tsx";
import { displayTokenAmount } from "../functions/displayTokenAmount.tsx";
import { displayConvertAmount } from "../functions/displayConvertAmount.tsx";


export async function callAlchemyGo(address, addrOverride) {

    // receives addresses so can be used for connected or inserted wallet address
    // maybe move this logic to the function call in the parent component

    console.log(address);
    console.log(addrOverride);
    
    // get address to use
    let walletAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";   // vitalik.eth
    if(addrOverride){
      console.log("Using inserted wallet address. " + addrOverride);
      walletAddress = addrOverride;
    } else if(address){
      console.log("Using connected wallet adddress. - " + address);
      walletAddress = address;
    } else  {
      console.log("NO wallet address - check defaults.");
    }
  
  
  
    
  
    // console.log(address);
  
    // let daoSel = {
    //   "WETH": true,
    //   "DAI": true,
    //   "BANK": true,
    //   "INCH": true,
    //   "ANT": true,
    //   "MKR": true,
    //   "POKT": true,
    //   "POOL": true,
    // }
  
    // testing for all chains - OK
    // alchemy.core.getTokenBalances(walletAddress).then(console.log);
    // polygon.core.getTokenBalances(walletAddress).then(console.log);
    // optimism.core.getTokenBalances(walletAddress).then(console.log);
  
    const toAddress = walletAddress;    // for connected or inserted wallet address
    
      // estimated starting eth block for 2022
      // https://etherscan.io/block/13916169
    
    const blockNumInt = 13916169;   //for 2022 eth mainnet START - hc
    const startBlock = "0x" + blockNumInt.toString(16);   // format for 0x + hex
  
    const endBlockNumInt = 16308155;   //for 2022 eth mainnet END - hc
    const endBlock = "0x" + endBlockNumInt.toString(16);
    
    const polyStartInt = 23231793;    // for 2022 polygon mainnet START - hc
    const polyStart = "0x"+ polyStartInt.toString(16); //f0efd5";
    const polyEndInt = 37466741;    // for 2022 polygon mainnet END - hc
    const polyEnd = "0x" + polyEndInt.toString(16);
  
    const opStartInt = 0;    // for 2022 optimism mainnet START - hc
    const opStart = "0x"+ opStartInt.toString(16); //f0efd5";
    const opEndInt = 58351868;    // for 2022 optimism mainnet END - hc
    const opEnd = "0x" + opEndInt.toString(16);
    
    // MAINNET
    const res = await alchemy.core.getAssetTransfers({
      fromBlock: startBlock,
      toBlock: endBlock,
      toAddress: toAddress,
      excludeZeroValue: true,
      withMetadata: true,
      // order: "desc",       // default asc for ascending
      category: [ AssetTransfersCategory.ERC20],
    });
    
      // AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155,
    
      // POLYGON
      const polyRes = await polygon.core.getAssetTransfers({
        fromBlock: polyStart,
        toBlock: polyEnd,
        toAddress: toAddress,
        excludeZeroValue: true,
        withMetadata: true,
        category: [ AssetTransfersCategory.ERC20 ],
      });
    
      // OPTIMISM  
      const opRes = await optimism.core.getAssetTransfers({
        fromBlock: opStart,
        toBlock: opEnd,
        toAddress: toAddress,
        excludeZeroValue: true,
        withMetadata: true,
        // order: "desc",       // default asc for ascending
        category: [ AssetTransfersCategory.ERC20 ],
      });
    
      // console.log(res);
  
    /* parse data retrieved to include reference:
  
    id: 1,    // ok
    avatar_url: "./img/dao.jpg",    // can be retrieved via function
    userName: "Bankless DAO",       // same from asset
    crypto: "20000 BANKS",          // same from value
    currency: "$48.77 CAD",         // needs conversion and depends on currency
  
    */
  
    let objArr = res.transfers;
    let polyArr = polyRes.transfers;
    let opArr = opRes.transfers;

    let activeAssets = ["BANK", "WETH", "DAI" ];

  
    for (var i=0; i<objArr.length; i++) {
    
      let thisRow = objArr[i];
  
      let t = thisRow.metadata.blockTimestamp;    // date from tx record
      let tNice = new Date(t);
      let unixT = Date.parse(t)/1000
  
      // Income Label - Toggle SWITCH
      
      let incomeState = false;
      // console.log("add other assets here to autoflag as income");
  
  
      // BANK is always income
      // console.log(daoSel["BANK"]);
      if(activeAssets.includes(thisRow.asset)){
        incomeState = true;
      }
  
      // save to globalTxs
      objArr[i].unixT = unixT;   // add unix timestamp to global object
      thisRow.currency = displayConvertAmount(thisRow.value, thisRow.asset, unixT, "CAD");
      thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
      thisRow.tokenLabel = getTokenLabel(thisRow.asset);
      thisRow.incomeState = incomeState;    // "NOT" for unmatched txs by default
      thisRow.crypto = displayTokenAmount(thisRow.value,thisRow.asset);
  
    }  
  
    for (var i=0; i<polyArr.length; i++) {
    
      let thisRow = polyArr[i];
  
      let t = thisRow.metadata.blockTimestamp;    // date from tx record
      let tNice = new Date(t);
      let unixT = Date.parse(t)/1000;
      
        // Income Label - Toggle SWITCH
      let incomeState = false;
      if(activeAssets.includes(thisRow.asset)){
        incomeState = true;
      }
  
      // save to globalTxs
      thisRow.unixT = unixT;   // add unix timestamp to global object
      thisRow.currency = displayConvertAmount(thisRow.value, thisRow.asset, unixT, "CAD");
      thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
      thisRow.tokenLabel = getTokenLabel(thisRow.asset);
      thisRow.incomeState = incomeState;    // "NOT" for unmatched txs by default
      thisRow.crypto = displayTokenAmount(thisRow.value,thisRow.asset);
  
    //   let incomeState = "NOT";
  
    //   /** LIMIT FILTER */
    //   let assets = ["BANK", "WETH", "DAI", "1INCH", "ANT", "MKR", "POKT", "POOL"];
  
    //   let asset = thisRow.asset || "";
    //   if(assets.includes(asset)){
  
    //     // let incomeBadge = toggleSwitch(incomeState); // 'Income Label - Toggle SWITCH';
    
    //     // let tokenLogo = getTokenLogo(thisRow.asset);   // token logo - '+thisRow.asset+'
    //     // let tokenLabel = getTokenLabel(thisRow.asset);   // token label - '+thisRow.asset+'
    //     // let tokenAmount = displayTokenAmount(thisRow.value,thisRow.asset);   // token amount - '+thisRow.value+'
    //     let convertAmount = displayConvertAmount(thisRow.value, thisRow.asset, unixT, "CAD")// "USD/FIAT value @ timefrom blockNum";   // USD/FIAT value @ timefrom blockNum
    
    //     // console.log(convertAmount);
    
    //     let priceParts = convertAmount.split(" ");
    //     let convertOut = priceParts[0] + " " + priceParts[1];
    //     let convertRatio = priceParts[2] + " " + priceParts[3] + " " + thisRow.asset + "/" + "CAD";
    
    //     // htmlhelpers
    //     let clearBoth = "<div style=clear:both></div>";
    
    //     // console.log(asset, globalIndex);    // this index is not getting high enough
    //     // console.log(globalTxs[globalIndex]);
    //     // console.log(globalTxs);
  
    //     thisRow.currency = displayConvertAmount(thisRow.value, thisRow.asset, unixT, "CAD");
    //     thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
    //     thisRow.tokenLabel = getTokenLabel(thisRow.asset);
  
    //     thisRow.crypto = displayTokenAmount(thisRow.value,thisRow.asset);
    
    //     // let j = i + objArr.length;   // offset for mainnet txs
    //     // if(globalTxs[globalIndex].asset === asset) {
    //     //     // save to globalTxs (after mainnet txs)
    //     //     globalTxs[globalIndex].unixT = unixT;   // add unix timestamp to global object
    //     //     globalTxs[globalIndex].incomeState = incomeState;   // add income state to global object
    //     //     globalTxs[globalIndex].incomeBadge = incomeBadge;   // add income state to global object
    //     //     globalTxs[globalIndex].tokenLogo = tokenLogo;   // add income state to global object
    //     //     globalTxs[globalIndex].tokenLabel = tokenLabel;   // add income state to global object
    //     //     globalTxs[globalIndex].tokenAmount = tokenAmount;   // add income state to global object
    //     //     globalTxs[globalIndex].convertAmount = convertAmount;   // add income state to global object
    //     // }
  
    //   }
      
  
      
  
    }   // end for all polygon transactions
  
    for (var i=0; i<opArr.length; i++) {
    
        let thisRow = opArr[i];
    
        let t = thisRow.metadata.blockTimestamp;    // date from tx record
        let tNice = new Date(t);
        let unixT = Date.parse(t)/1000
      
        // Income Label - Toggle SWITCH
        let incomeState = false;
        if(activeAssets.includes(thisRow.asset)){
          incomeState = true;
        }
    
        // save to globalTxs
        thisRow.unixT = unixT;   // add unix timestamp to global object
        thisRow.currency = displayConvertAmount(thisRow.value, thisRow.asset, unixT, "CAD");
        thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
        thisRow.tokenLabel = getTokenLabel(thisRow.asset);
        thisRow.incomeState = incomeState;    // "NOT" for unmatched txs by default
        thisRow.crypto = displayTokenAmount(thisRow.value,thisRow.asset);
  
    }
  
      // adjust all txs to fit the format
      let fullObjArr = {
        id: 1,
        title: "Ethereum Mainnet",
        transactions: objArr,
      }
  
      let fullPolyArr = {
        id: 2,
        title: "Polygon Transactions",
        transactions: polyArr
      }
  
      let fullOpArr = {
        id: 3,
        title: "Optimism Transactions",
        transactions: opArr
      }
  
      const alTxs = [
        fullObjArr,
        fullPolyArr,
        fullOpArr,
      ];
      // console.log(alTxs);
  
      // return it
  
    return alTxs;
  }