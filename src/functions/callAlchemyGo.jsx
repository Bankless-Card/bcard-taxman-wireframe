import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';

// data imports
import { REACT_APP_ALCHEMY_API_KEY } from '../data' 

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: REACT_APP_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const polygon = new Alchemy({ apiKey: REACT_APP_ALCHEMY_API_KEY, network: Network.MATIC_MAINNET });
const optimism = new Alchemy({ apiKey: REACT_APP_ALCHEMY_API_KEY, network: Network.OPT_MAINNET });


// other functions
import { getTokenLogo } from "../functions";
import { getTokenLabel } from "../functions";
import { displayTokenAmount } from "../functions";
import { displayConvertAmount } from "../functions";


export async function callAlchemyGo(address, addrOverride, country, activeAssets, dates) {

  // NEED TO ALSO RECEIVE HERE THE STARTDATE AND ENDDATE
  console.log(address, addrOverride, country, activeAssets, dates)

    // receives addresses so can be used for connected or inserted wallet address
    // maybe move this logic to the function call in the parent component

    // console.log(address);
    // console.log(addrOverride);
    
    // get address to use
    //let walletAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";   // vitalik.eth
    let walletAddress = "0x522d634b6BFfb444FdbCdE5932738995A4cfd1F1";
    if(addrOverride){
      console.log("Using inserted wallet address. " + addrOverride);
      walletAddress = addrOverride;
    } else if(address){
      console.log("Using connected wallet adddress. - " + address);
      walletAddress = address;
    } else  {
      console.log("NO wallet address - check defaults.");
    }
  
    // testing for all chains - OK
    // alchemy.core.getTokenBalances(walletAddress).then(console.log);
    // polygon.core.getTokenBalances(walletAddress).then(console.log);
    // optimism.core.getTokenBalances(walletAddress).then(console.log);
  
    const toAddress = walletAddress;    // for connected or inserted wallet address




    // BLOCK SETTING DEFAULTS - May be overridden by dates input
    // estimated starting eth block for 2022
    // https://etherscan.io/block/13916169
  
    var blockNumInt = 13916169;   //for 2022 eth mainnet START - hc  
    var endBlockNumInt = 16308155;   //for 2022 eth mainnet END - hc
    
    var polyStartInt = 23231793;    // for 2022 polygon mainnet START - hc
    var polyEndInt = 37466741;    // for 2022 polygon mainnet END - hc
  
    var opStartInt = 0;    // for 2022 optimism mainnet START - hc
    var opEndInt = 58351868;    // for 2022 optimism mainnet END - hc







    // CALCULATIONS FOR START AND END BLOCKS GO HERE
    // STARTDATE && ENDDATE inputs
    // ETH outputs (need to convert timestamp to UNIX and then to BLOCKNUMBER)


    if(dates.startDate === "" || dates.endDate === ""){
      console.log("ERROR: No dates selected.");
      // use defaults
    } else if(dates.startDate > dates.endDate){
      console.log("ERROR: Start date is after end date.");
      // use defaults
      
    } else if(dates.startDate === "2022-01-01" && dates.endDate ===  "2022-12-31") {
      // they are actually the defaults
      console.log("Actual Defaults - no override.")
    } else {
      console.log("OK: Dates selected - setup override for blocks.");
      console.log(dates.startDate, dates.endDate);

      // frst we need UNIX timestamps
      var startUnix = new Date(dates.startDate);
      console.log(startUnix.getTime());
      var endUnix = new Date(dates.endDate);
      console.log(endUnix.getTime());

      // now we need block numbers

      // general block lookup function
      const getBlock = async(chain, timestamp) => {
        let block = await fetch('https://coins.llama.fi/block/'+ chain + '/' + timestamp.getTime()/1000);
        let data = await block.json();
        // console.log(data);
        // console.log(data.height);

        return data;
      }

      //ethereum
      const getEthStartBlock = async() => {
        let block = await getBlock("ethereum", startUnix);
        console.log(block.height);

        blockNumInt = block.height;

        return block.height;
      }

      const getEthEndBlock = async() => {
        let block = await getBlock("ethereum", endUnix);
        console.log(block.height);

        endBlockNumInt = block.height;

        return block.height;
      }

      // polygon
      const getPolyStartBlock = async() => {
        let block = await getBlock("polygon", startUnix);
        console.log(block.height);

        polyStartInt = block.height;

        return block.height;
      }

      const getPolyEndBlock = async() => {
        let block = await getBlock("polygon", endUnix);
        console.log(block.height);

        polyEndInt = block.height;

        return block.height;
      }

      // optimism
      const getOPStartBlock = async() => {

        // testing
        // console.log(startUnix.getTime());

        if(startUnix.getTime()/1000 < 1637549336){
          // before OP launch
          opStartInt = 0;
        } else {


          let block = await getBlock("optimism", startUnix);
          console.log(block.height);

          opStartInt = block.height;

          return block.height;
        }
      }

      const getOPEndBlock = async() => {
        let block = await getBlock("optimism", endUnix);
        console.log(block.height);

        opEndInt = block.height;

        return block.height;
      }

      // execute the block collection to override the defaults
      await getEthStartBlock();
      // console.log(test);

      await getEthEndBlock();
      // console.log(test2);

      await getPolyStartBlock();

      await getPolyEndBlock();

      await getOPStartBlock();

      await getOPEndBlock();

      // https://etherscan.io/block/13916169
      // let startBlock = fetch('https://coins.llama.fi/block/ethereum/' + startUnix.getTime()/1000)
      //   .then(response => response.json())
      //   .then(data => {
      //     // console.log(data);
      //     // console.log(data.height);
      //     // console.log( 1641600000 - data.timestamp);

      //     blockNumInt = data.height;
      // });

      // let endBlock = fetch('https://coins.llama.fi/block/ethereum/' + endUnix.getTime()/1000)
      //   .then(response => response.json())
      //   .then(data => {
      //     // console.log(data);
      //     // console.log(data.height);
      //     // console.log( 1641600000 - data.timestamp);

      //     endBlockNumInt = data.height;
      // });

      

      // let polyStartBlock = fetch('https://coins.llama.fi/block/polygon/' + startUnix.getTime()/1000)
      //   .then(response => response.json())
      //   .then(data => {
      //     // console.log(data.height);

      //     polyStartInt = data.height;
      // });

      // let polyEndBlock = fetch('https://coins.llama.fi/block/polygon/' + endUnix.getTime()/1000)  
      // .then(response => response.json())
      // .then(data => {
      //   // console.log(data.height);

      //   polyEndInt = data.height;     // the problem is that this block num override is happening after the 
      // });

      

      // OP Lanched in 2022, so may be funky...

      // let opStartBlock = fetch('https://coins.llama.fi/block/optimism/' + startUnix.getTime()/1000)
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log("opStartBlock: ", data.height);

      //     opStartInt = data.height;
      // });

      // let opEndBlock = fetch('https://coins.llama.fi/block/optimism/' + endUnix.getTime()/1000)
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log("OP EndBlock: ", data.height);

      //     opEndInt = data.height;

      //     console.log("OP END:", opEndInt);
      // });

      



      // console.log(await block);

      // goals for output from this function -> block numbers corresponding to the dates
      // blockNumInt = await block.height; // 0;
      // endBlockNumInt = 0;

      // polyStartInt = 0;
      // polyEndInt = 0;

      // opStartInt = 0;
      // opEndInt = 0;

      setTimeout(() => {
        console.log("ETH BLOCKS: ", blockNumInt, endBlockNumInt);
      }, 2000);

      setTimeout(() => {
        console.log("POLY BLOCKS: ", polyStartInt, polyEndInt);
      }, 2000);

      setTimeout(() => {
        console.log("OP BLOCKS: ", opStartInt, opEndInt);
      }, 2000);

    }


    // console.log(opStartInt, opEndInt );

    // if(!opStartInt) {
    //   opStartInt = def_opStartInt;
    // }
        
    // conversions to hex
    var startBlock = "0x" + blockNumInt.toString(16);   // format for 0x + hex
    var endBlock = "0x" + endBlockNumInt.toString(16);
    var polyStart = "0x"+ polyStartInt.toString(16); //f0efd5";
    var polyEnd = "0x" + polyEndInt.toString(16);
    var opStart = "0x"+ opStartInt.toString(16); //f0efd5";
    var opEnd = "0x" + opEndInt.toString(16);

    
    // MAINNET
    const res = await alchemy.core.getAssetTransfers({
      fromBlock: startBlock,
      toBlock: endBlock,
      toAddress: toAddress,
      excludeZeroValue: true,
      withMetadata: true,
      // order: "desc",       // default asc for ascending
      category: [ AssetTransfersCategory.ERC20 ],
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
    
  
    let objArr = res.transfers;
    let polyArr = polyRes.transfers;
    let opArr = opRes.transfers;

    // console.log(objArr, startBlock, endBlock);    // OK

    let countryExport = country;  //"CAD";   // label for export currency

    // if(country === "Canada"){
    //   countryExport = "CAD";
    // } else if(country === "United States"){
    //   countryExport = "USD";
    // } else {
    //   countryExport = "CAD";  // default
    // }
  
    // ETH MAINNET
    for (var i=0; i<objArr.length; i++) {
    
      let thisRow = objArr[i];
  
      let t = thisRow.metadata.blockTimestamp;    // date from tx record
      let tNice = new Date(t);
      let unixT = Date.parse(t)/1000;

      // only if asset is toggled on
      if(activeAssets.includes(thisRow.asset)){
  
        // save to globalTxs
        thisRow.unixT = unixT;   // add unix timestamp to global object
        thisRow.tNice = tNice;   // add date/time to global object

        thisRow.currency = displayConvertAmount(thisRow.value, thisRow.asset, unixT, countryExport);
        thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
        thisRow.tokenLabel = getTokenLabel(thisRow.asset);
        thisRow.incomeState = true;    // "NOT" for unmatched txs by default
        thisRow.crypto = displayTokenAmount(thisRow.value,thisRow.asset, activeAssets);
        thisRow.chain = "Ethereum";

      } else {
        // remove from the tx list - it will be recalled later if dao selectors are toggled
        thisRow.incomeState = false;    // ensure no display
        // console.log( objArr[i] );
        objArr.splice(i,1);
        
        // console.log("BUG: Removed tx from list: ", thisRow)
      }
  
    }  
  
    // POLYGON

    let initPolyArr = polyArr;    // copy of initial array to measure length of for loop

    for (var i=0; i < initPolyArr.length; i++) {
    
      let thisRow = polyArr[i];
  
      let t = thisRow.metadata.blockTimestamp;    // date from tx record
      let tNice = new Date(t);
      let unixT = Date.parse(t)/1000;
      
      console.log(i, thisRow, thisRow.asset, activeAssets.includes(thisRow.asset));

      if(activeAssets.includes(thisRow.asset)){
  
        // save to globalTxs
        thisRow.unixT = unixT;   // add unix timestamp to global object
        thisRow.tNice = tNice;   // add date/time to global object

        thisRow.currency = displayConvertAmount(thisRow.value, thisRow.asset, unixT, countryExport);
        thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
        thisRow.tokenLabel = getTokenLabel(thisRow.asset);
        thisRow.incomeState = true;    // "NOT" for unmatched txs by default
        thisRow.crypto = displayTokenAmount(thisRow.value, thisRow.asset, activeAssets);
        thisRow.chain = "Polygon";

      } else {

        console.log("No go for tx: ", thisRow.asset);
        // remove from the tx list - it will be recalled latter if dao selectors are toggled
        polyArr.splice(i,1);
        // console.log("Removed tx from list: " + thisRow.asset, objArr)
      }
    
  
    }   // end for all polygon transactions
  
    // OPTIMISM
    for (var i=0; i<opArr.length; i++) {
    
        let thisRow = opArr[i];
    
        let t = thisRow.metadata.blockTimestamp;    // date from tx record
        let tNice = new Date(t);
        let unixT = Date.parse(t)/1000
      
        // Income Label - Toggle SWITCH
    
        if(activeAssets.includes(thisRow.asset)){
          // save to globalTxs
          thisRow.unixT = unixT;   // add unix timestamp to global object
          thisRow.tNice = tNice;   // add date/time to global object
          // console.log(thisRow.value, thisRow.asset, unixT, countryExport);

          thisRow.currency = displayConvertAmount(thisRow.value, thisRow.asset, unixT, countryExport);
          thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
          thisRow.tokenLabel = getTokenLabel(thisRow.asset);
          thisRow.incomeState = true;    // "NOT" for unmatched txs by default
          thisRow.crypto = displayTokenAmount(thisRow.value,  thisRow.asset, activeAssets);
          thisRow.chain = "Optimism";

        
          // incomeState = true;
        } else {
          // remove from the tx list - it will be recalled latter if dao selectors are toggled
          opArr.splice(i,1);
          // console.log("Removed tx from list: " + thisRow.asset, objArr)
        }
  
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

    console.log(alTxs);
  
    return alTxs;
  }