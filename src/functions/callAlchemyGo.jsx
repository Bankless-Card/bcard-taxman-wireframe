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
async function saveToGlobalTxs(thisRow, unixT, tNice, countryExport, chain="Arbitrum", toAddress) {
  
  thisRow.unixT = unixT;   // add unix timestamp to global object
  thisRow.tNice = tNice;   // add date/time to global object
  // console.log(thisRow.value, thisRow.asset, unixT, countryExport);

  thisRow.incoming = true;
  if(thisRow.from.toLowerCase() === toAddress.toLowerCase()){
    thisRow.incoming = false;
  }

  // get price data for this tx
  let priceData = await displayConvertAmount(thisRow.value, thisRow.asset, unixT, countryExport, thisRow.incoming);

  thisRow.fiatValue = priceData[0];
  thisRow.fiatName = priceData[1];
  thisRow.conversionRate = priceData[2];
  thisRow.currency = priceData[3];

  // Set image URL from the price lookup response
  if (priceData && priceData[4]) {
    thisRow.img_url = priceData[4];
  } else {
    // Fallback to default image if no image from API
    thisRow.img_url = getTokenLogo(thisRow.asset);
  }

  thisRow.tokenLabel = getTokenLabel(thisRow.asset);
  thisRow.incomeState = true;    // "NOT" for unmatched txs by default
  thisRow.crypto = displayTokenAmount(thisRow.value, thisRow.asset, thisRow.incoming);
  thisRow.chain = chain;

  return true;

}

async function processTxArr(sourceArray, destArray, toAddress, countryExport, chain, setStatusText) {

  // console.log(array, countryExport, chain);

  let initArr = sourceArray;    // copy of initial array to measure length of for loop
  for (var i=0; i<initArr.length; i++) {

      let thisRow = sourceArray[i];    

      // Skip if asset contains a dot (likely a scam token)
      if (thisRow.asset && thisRow.asset.includes('.')) {
        continue;
      }

      let t = thisRow.metadata.blockTimestamp;    // date from tx record
      let tNice = new Date(t);
      setStatusText('Processing '+ chain + ' ' + tNice.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + '...');
      let tMonth = String(tNice.getMonth()).padStart(2, '0');  // add 1 because months are 0-indexed
      let tLongMonth = tNice.toLocaleString('default', { month: 'long' });
      let tYear = tNice.getFullYear();
      let unixT = Date.parse(t)/1000

      const destKey = `${tYear}-${tMonth}-${tLongMonth}`;

      await saveToGlobalTxs(thisRow, unixT, tNice, countryExport, chain, toAddress);
      if(destArray[destKey]){
        destArray[destKey].push(thisRow);
      } else {
        destArray[destKey] = [thisRow];
      }

  }

  return sourceArray;
}

export async function callAlchemyGo(address, addrOverride, country, dates, setStatusText) {

  // NEED TO ALSO RECEIVE HERE THE STARTDATE AND ENDDATE
  console.log(address, addrOverride, country, dates)

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
        try {
          let block = await fetch('https://coins.llama.fi/block/'+ chain + '/' + timestamp.getTime()/1000);
          let data = await block.json();
          return data;
        } catch (error) {
          console.log(error);
          return null;
        }
      }

      // execute the block collection functions to generate the constants
      const getBlockNum = async(network, unixTimestamp) => {
        // Convert Date object to Unix timestamp (seconds)
        const timestampInSeconds = Math.floor(unixTimestamp.getTime() / 1000);
        
        // Create a cache key based on network and timestamp
        const cacheKey = `block_${network}_${timestampInSeconds}`;
        //console.log('Block Cache Key:', cacheKey);

        // Try to get cached value
        const cachedBlock = localStorage.getItem(cacheKey);
        if (cachedBlock) {
          console.log(`Using cached block for ${network} at ${timestampInSeconds}`);
          return parseInt(cachedBlock);
        }

        // If not in cache, fetch from API
        let block = await getBlock(network, unixTimestamp);
        if (block && block.height) {
          // Cache the result
          localStorage.setItem(cacheKey, block.height.toString());
          return block.height;
        }
        
        return 0;
      }


      setStatusText("Fetching block numbers...");
      blockNumInt = await getBlockNum("ethereum", startUnix);
      endBlockNumInt = await getBlockNum("ethereum", endUnix);

      polyStartInt = await getBlockNum("polygon", startUnix);
      polyEndInt = await getBlockNum("polygon", endUnix);

      opStartInt = await getBlockNum("optimism", startUnix);
      opEndInt = await getBlockNum("optimism", endUnix);

      baseStartInt = await getBlockNum("base", startUnix);
      baseEndInt = await getBlockNum("base", endUnix);

      arbStartInt = await getBlockNum("arbitrum", startUnix);
      arbEndInt = await getBlockNum("arbitrum", endUnix); 


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
    var baseStart = "0x"+ baseStartInt.toString(16); //f0efd5";
    var baseEnd = "0x" + baseEndInt.toString(16);
    var arbStart = "0x"+ arbStartInt.toString(16); //f0efd5";
    var arbEnd = "0x" + arbEndInt.toString(16);


    const getAlchemyInstanceByNetwork = (network) => {
      switch (network) {
        case "ethereum":
          return alchemyConnect.eth;
        case "polygon":
          return alchemyConnect.poly;
        case "optimism":
          return alchemyConnect.op;
        case "arbitrum":
          return alchemyConnect.arb;
        case "base":
          return alchemyConnect.base;
        default:
          return alchemyConnect.eth;
      }
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function makeTransferRequest(alchemyInstance, params, retries = 3, baseDelay = 1000) {
      for (let i = 0; i < retries; i++) {
        try {
          const result = await alchemyInstance.core.getAssetTransfers(params);
          return result;
        } catch (error) {
          if (error.code === 429 && i < retries - 1) {
            // Wait longer between each retry
            const waitTime = baseDelay * Math.pow(2, i);
            console.log(`Rate limited, waiting ${waitTime}ms before retry ${i + 1}/${retries}`);
            await delay(waitTime);
            continue;
          }
          throw error;
        }
      }
    }

    const getERC20AssetTransfers = async(network, startBlock, endBlock, toAddress) => {
      const alchemyInstance = getAlchemyInstanceByNetwork(network);
      
      // Normalize block numbers to decimal for consistent cache keys
      const startBlockDec = parseInt(startBlock, 16).toString();
      const endBlockDec = parseInt(endBlock, 16).toString();
      
      // Create a cache key based on network, startBlock, and endBlock using decimal values
      const cacheKey = `transfers_${network}_${startBlockDec}_${endBlockDec}_${toAddress}`;
      //console.log('Cache Key:', cacheKey);
      
      // Try to get cached value
      const cachedTransfers = localStorage.getItem(cacheKey);
      //console.log('Found in cache:', !!cachedTransfers);
      
      if (cachedTransfers) {
        console.log(`Using cached transfers for ${network} from ${startBlock} to ${endBlock}`);
        const parsedTransfers = JSON.parse(cachedTransfers);
        //console.log('Cached data:', parsedTransfers);
        return parsedTransfers;
      }

      // If not in cache, fetch from API
      const incomingTransfers = await makeTransferRequest(alchemyInstance, {
        fromBlock: startBlock,  // Use original hex values for API call
        toBlock: endBlock,
        toAddress: toAddress,
        excludeZeroValue: true,
        withMetadata: true,
        category: [AssetTransfersCategory.ERC20, AssetTransfersCategory.EXTERNAL],
      });

      await delay(1000);

      const outgoingTransfers = await makeTransferRequest(alchemyInstance, {
        fromBlock: startBlock,
        toBlock: endBlock,
        fromAddress: toAddress,
        excludeZeroValue: true,
        withMetadata: true,
        category: [AssetTransfersCategory.ERC20, AssetTransfersCategory.EXTERNAL],
      });

      const transfers = {
        transfers: [...incomingTransfers.transfers, ...outgoingTransfers.transfers],
        pageKey: incomingTransfers.pageKey || outgoingTransfers.pageKey
      };

      // Cache the result
      localStorage.setItem(cacheKey, JSON.stringify(transfers));
      return transfers;
    }
    
    // Get ERC20 asset transfers
    setStatusText("Reading mainnet data...");
    const ethRes = await getERC20AssetTransfers("ethereum", startBlock, endBlock, toAddress);
    setStatusText("Reading polygon data...");
    const polyRes = await getERC20AssetTransfers("polygon", polyStart, polyEnd, toAddress);
    setStatusText("Reading optimism data...");
    const opRes = await getERC20AssetTransfers("optimism", opStart, opEnd, toAddress);   
    setStatusText("Reading base data...");
    const baseRes = await getERC20AssetTransfers("base", baseStart, baseEnd, toAddress);
    setStatusText("Reading arbitrum data...");
    const arbRes = await getERC20AssetTransfers("arbitrum", arbStart, arbEnd, toAddress);
    // Other categories available:
    // AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155,
  
    let objArr = ethRes.transfers;
    let polyArr = polyRes.transfers;
    let opArr = opRes.transfers;
    let baseArr = baseRes.transfers;
    let arbArr = arbRes.transfers;
    let blendedTxArray = [];

    let countryExport = country;  //"CAD";   // label for export currency

    // process each of the transaction arrays read in and filter out the unwanted assets
    // add data to the desired transaction objects
    await processTxArr(objArr, blendedTxArray, toAddress, countryExport, "Ethereum", setStatusText);      // ETH MAINNET
    await processTxArr(polyArr, blendedTxArray, toAddress, countryExport, "Polygon", setStatusText);    // POLYGON MAINNET
    await processTxArr(opArr, blendedTxArray, toAddress, countryExport, "Optimism", setStatusText);
    await processTxArr(baseArr, blendedTxArray, toAddress, countryExport, "Base", setStatusText);
    await processTxArr(arbArr, blendedTxArray, toAddress, countryExport, "Arbitrum", setStatusText);

    // Sort by keys (which are in format "YYYY-MM-mmm")
    const sortedKeys = Object.keys(blendedTxArray).sort();
    const sortedBlendedTxArray = {};
    sortedKeys.forEach(key => {
        sortedBlendedTxArray[key] = blendedTxArray[key];
    });
    blendedTxArray = sortedBlendedTxArray;

    //console.log(blendedTxArray);

    const alTxs = [];
    var counter = 1;
    for (const [monthKey, transactions] of Object.entries(blendedTxArray)) {
        // monthKey is in format "2024-11-November", split it
        const [year, month, monthName] = monthKey.split("-");
        const formattedTitle = `${monthName} ${year}`;
        
        alTxs.push(setFullStorageArr(counter++, formattedTitle, transactions));
    }

    //console.log(alTxs);
  
    return alTxs;
}