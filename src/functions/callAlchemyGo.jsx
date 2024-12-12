import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';

// data imports
import { ALCHEMY_API_KEY } from '../data' 


// using different alchemy keys for different networks for usage tracking

const alchemy = new Alchemy({ apiKey: ALCHEMY_API_KEY, network: Network.ETH_MAINNET});
const polygon = new Alchemy({ apiKey: ALCHEMY_API_KEY, network: Network.MATIC_MAINNET });
const optimism = new Alchemy({ apiKey: ALCHEMY_API_KEY, network: Network.OPT_MAINNET });
const arbitrum = new Alchemy({ apiKey: ALCHEMY_API_KEY, network: Network.ARB_MAINNET });
const base = new Alchemy({ apiKey: ALCHEMY_API_KEY, network: Network.BASE_MAINNET });

// combine for a single usable object
const alchemyConnect = {
  eth: alchemy,
  poly: polygon,
  op: optimism,
  arb: arbitrum,
  base: base
}

// console.log(Network);


// other functions
import { getTokenLogo, getTokenLabel, displayTokenAmount, displayConvertAmount } from "../functions";

// adjust all txs to fit the format
function setFullStorageArr(id, title, transactions){
  return {
    id: id,
    title: title,
    transactions: transactions
  }
}

// export data for thisRow Tx: to be used in the UI output
async function saveToGlobalTxs(thisRow, unixT, tNice, countryExport, activeAssets, chain="Arbitrum") {

  // console.log("Saving...", thisRow);

  thisRow.unixT = unixT;   // add unix timestamp to global object
  thisRow.tNice = tNice;   // add date/time to global object
  // console.log(thisRow.value, thisRow.asset, unixT, countryExport);

  console.log("currently looking at asset:", thisRow.asset);

  thisRow.currency = await displayConvertAmount(thisRow.value, thisRow.asset, unixT, countryExport);
  thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
  thisRow.tokenLabel = getTokenLabel(thisRow.asset);
  thisRow.incomeState = true;    // "NOT" for unmatched txs by default
  thisRow.crypto = displayTokenAmount(thisRow.value,  thisRow.asset, activeAssets);
  thisRow.chain = chain;

  return true;

}

async function processTxArr(array, activeAssets, countryExport, chain) {

  // console.log(array, activeAssets, countryExport, chain);

  let initArr = array;    // copy of initial array to measure length of for loop
  for (var i=0; i<initArr.length; i++) {

      let thisRow = array[i];      
      let t = thisRow.metadata.blockTimestamp;    // date from tx record
      let tNice = new Date(t);
      let unixT = Date.parse(t)/1000
          
      if(activeAssets.includes(thisRow.asset)){
        // save to globalTxs
        await saveToGlobalTxs(thisRow, unixT, tNice, countryExport, activeAssets, chain);
        //return true;
      } else {
        // remove from the tx list - it will be recalled latter if dao selectors are toggled
        array.splice(i,1);    // the result here is JUST the spliced out entry
        // return false;
      }

  }

  return array;
}

export async function callAlchemyGo(address, addrOverride, country, activeAssets, dates) {

  // NEED TO ALSO RECEIVE HERE THE STARTDATE AND ENDDATE
  console.log(address, addrOverride, country, activeAssets, dates)

  // internal functions (requiring data from the parent component) - maybe move internal

    // receives addresses so can be used for connected or inserted wallet address
    // maybe move this logic to the function call in the parent component
    
    // get address to use
  let walletAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";   // vitalik.eth
  //let walletAddress = "0x522d634b6BFfb444FdbCdE5932738995A4cfd1F1";
  if(addrOverride){
    console.log("Using inserted wallet address. " + addrOverride);
    walletAddress = addrOverride;
  } else if(address){
    console.log("Using connected wallet adddress. - " + address);
    walletAddress = address;
  } else  {
    console.log("NO wallet address - check defaults.");
  }
  
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

    var arbStartInt = 0;    // for 2023 arbitrum mainnet START - hc
    var arbEndInt = 0;    // for 2023 arbitrum mainnet END - hc

    var baseStartInt = 0;    // for 2023 base mainnet START - hc
    var baseEndInt = 0;    // for 2023 base mainnet END - hc





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
      console.log("OK: FOR Dates selected - SETUP override for block # variables.");
      console.log(dates.startDate, dates.endDate);

      // frst we need UNIX timestamps
      var startUnix = new Date(dates.startDate);
      // console.log(startUnix.getTime());
      var endUnix = new Date(dates.endDate);
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1)
      if(endUnix > yesterday){
        endUnix = yesterday;
      }
      console.log(endUnix.getTime());

      // now we need block numbers

      // general block lookup function using llama.fi blocknum API lookup
      const getBlock = async(chain, timestamp) => {
        let block = await fetch('https://coins.llama.fi/block/'+ chain + '/' + timestamp.getTime()/1000);
        let data = await block.json();
        // Add a safety buffer of 1000 blocks to avoid querying too recent blocks
        if (data && data.height) {
          data.height = Math.max(0, data.height - 1000);
        }
        return data;
      }

      //ethereum
      const getEthStartBlock = async() => {
        let block = await getBlock("ethereum", startUnix);
        //console.log(block.height);
        blockNumInt = block.height;

        return block.height;
      }

      const getEthEndBlock = async() => {
        let block = await getBlock("ethereum", endUnix);
        //console.log(block.height);
        endBlockNumInt = block.height;

        return block.height;
      }

      // polygon
      const getPolyStartBlock = async() => {
        let block = await getBlock("polygon", startUnix);
        // console.log(block.height);
        polyStartInt = block.height;

        return block.height;
      }

      const getPolyEndBlock = async() => {
        let block = await getBlock("polygon", endUnix);
        // console.log(block.height);
        polyEndInt = block.height;

        return block.height;
      }

      // optimism
      const getOPStartBlock = async() => {

        let opLaunch = 1637549336;  // 2022-12-23?

        if(startUnix.getTime()/1000 < opLaunch){
          // before OP launch
          opStartInt = 0;
        } else {

          let block = await getBlock("optimism", startUnix);
          // console.log(block.height);
          opStartInt = block.height;

          return block.height;
        }
      }

      const getOPEndBlock = async() => {
        let block = await getBlock("optimism", endUnix);
        // console.log(block.height);
        opEndInt = block.height;

        return block.height;
      }

      // base
      const getBASEStartBlock = async() => {

        let baseLaunch = 1691553601;  // 2023-08-09

        if(startUnix.getTime()/1000 < baseLaunch){
          // before BASE launch
          baseStartInt = 0;
        } else {


          let block = await getBlock("base", startUnix);
          console.log("NEW BASE: " + block.height);

          baseStartInt = block.height;

          return block.height;
        }
      }

      const getBASEEndBlock = async() => {
        let block = await getBlock("base", endUnix);
        console.log("NEW BASE END: " + block.height);

        baseEndInt = block.height;

        return block.height;
      }

      // arbitrum
      const getArbStartBlock = async() => {

        let arbLaunch = 1679544001;  // 2023-08-09

        if(startUnix.getTime()/1000 < arbLaunch){
          // before BASE launch
          arbStartInt = 0;
        } else {


          let block = await getBlock("arbitrum", startUnix);
          console.log("NEW ARB: " + block.height);

          arbStartInt = block.height;

          return block.height;
        }
      }

      const getArbEndBlock = async() => {
        let block = await getBlock("arbitrum", endUnix);
        console.log("NEW ARB END: " + block.height);

        arbEndInt = block.height;

        return block.height;
      }

      // execute the block collection functions to generate the constants
      await getEthStartBlock();
      await getEthEndBlock();

      await getPolyStartBlock();
      await getPolyEndBlock();

      await getOPStartBlock();
      await getOPEndBlock();

      await getBASEStartBlock();
      await getBASEEndBlock();

      await getArbStartBlock();
      await getArbEndBlock();


      if(true){
        // report block outputs to UI console
        console.log("ETH BLOCKS: ", blockNumInt, endBlockNumInt);
        console.log("POLY BLOCKS: ", polyStartInt, polyEndInt);
        console.log("OP BLOCKS: ", opStartInt, opEndInt);
        console.log("BASE BLOCKS: ", baseStartInt, baseEndInt);
        console.log("ARB BLOCKS: ", arbStartInt, arbEndInt);
      }
      

    }
        
    // conversions to hex
    var startBlock = "0x" + blockNumInt.toString(16);   // format for 0x + hex
    var endBlock = "0x" + endBlockNumInt.toString(16);
    var polyStart = "0x"+ polyStartInt.toString(16); //f0efd5";
    var polyEnd = "0x" + polyEndInt.toString(16);
    var opStart = "0x"+ opStartInt.toString(16); //f0efd5";
    var opEnd = "0x" + opEndInt.toString(16);

    // NEW 2023
    var baseStart = "0x"+ baseStartInt.toString(16); //f0efd5";
    var baseEnd = "0x" + baseEndInt.toString(16);
    var arbStart = "0x"+ arbStartInt.toString(16); //f0efd5";
    var arbEnd = "0x" + arbEndInt.toString(16);

    
    // MAINNET
    const ethRes = await alchemyConnect.eth.core.getAssetTransfers({
      fromBlock: startBlock,
      toBlock: endBlock,
      toAddress: toAddress,
      excludeZeroValue: true,
      withMetadata: true,
      // order: "desc",       // default asc for ascending
      category: [ AssetTransfersCategory.ERC20 ],
    });
    
    // Other categories available:
    // AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155,
  
    // POLYGON
    const polyRes = await alchemyConnect.poly.core.getAssetTransfers({
      fromBlock: polyStart,
      toBlock: polyEnd,
      toAddress: toAddress,
      excludeZeroValue: true,
      withMetadata: true,
      category: [ AssetTransfersCategory.ERC20 ],
    });
  
    // OPTIMISM  
    const opRes = await alchemyConnect.op.core.getAssetTransfers({
      fromBlock: opStart,
      toBlock: opEnd,
      toAddress: toAddress,
      excludeZeroValue: true,
      withMetadata: true,
      // order: "desc",       // default asc for ascending
      category: [ AssetTransfersCategory.ERC20 ],
    });

    // BASE
    const baseRes = await alchemyConnect.base.core.getAssetTransfers({
      fromBlock: baseStart,
      toBlock: baseEnd,
      toAddress: toAddress,
      excludeZeroValue: true,
      withMetadata: true,
      category: [ AssetTransfersCategory.ERC20 ],
    });

    // ARBITRUM
    const arbRes = await alchemyConnect.arb.core.getAssetTransfers({
      fromBlock: arbStart,
      toBlock: arbEnd,
      toAddress: toAddress,
      excludeZeroValue: true,
      withMetadata: true,
      category: [ AssetTransfersCategory.ERC20 ],
    }); 
  
    let objArr = ethRes.transfers;
    let polyArr = polyRes.transfers;
    let opArr = opRes.transfers;
    let baseArr = baseRes.transfers;
    let arbArr = arbRes.transfers;

    let countryExport = country;  //"CAD";   // label for export currency

    // process each of the transaction arrays read in and filter out the unwanted assets
    // add data to the desired transaction objects
    await processTxArr(objArr, activeAssets, countryExport, "Ethereum");      // ETH MAINNET
    await processTxArr(polyArr, activeAssets, countryExport, "Polygon");    // POLYGON MAINNET
    await processTxArr(opArr, activeAssets, countryExport, "Optimism");
    await processTxArr(baseArr, activeAssets, countryExport, "Base");
    await processTxArr(arbArr, activeAssets, countryExport, "Arbitrum")
  

    const alTxs = [
      setFullStorageArr(1, "Ethereum Mainnet", objArr),
      setFullStorageArr(2, "Polygon Transactions", polyArr),
      setFullStorageArr(3, "Optimism Transactions", opArr),
      setFullStorageArr(4, "Base Transactions", baseArr),
      setFullStorageArr(5, "Arbitrum Transactions", arbArr)
    ];

    // console.log(alTxs);
  
    return alTxs;
}



  