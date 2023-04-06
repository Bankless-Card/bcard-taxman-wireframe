import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';

// data imports
import { REACT_APP_ALCHEMY_API_KEY, ELASTICMAIL_SECURETOKEN } from '../data' 

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: REACT_APP_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const polygon = new Alchemy({ apiKey: REACT_APP_ALCHEMY_API_KEY, network: Network.MATIC_MAINNET });
const optimism = new Alchemy({ apiKey: REACT_APP_ALCHEMY_API_KEY, network: Network.OPT_MAINNET });

import { toggleSwitch } from './toggleSwitch';
import { getTokenLogo } from './getTokenLogo';
import { getTokenLabel } from './getTokenLabel';
import { displayTokenAmount } from './displayTokenAmount';
import { displayConvertAmount } from './displayConvertAmount';
import { getMonthOut } from './getMonthOut';

import cs from '../style.module.css'


import { useAccount } from 'wagmi';


export async function alchemyGo(FIAT:string){

    console.log("FIAT: " + FIAT);

    const { address, isConnected } = useAccount();
  
    // get address to use
    let walletAddress: string = "0x522d634b6BFfb444FdbCdE5932738995A4cfd1F1";
    if(isConnected){
        walletAddress = address;
    }

    let globalTxs:any = [];

    console.log("Get Global Toggles for DAO selectors.");

    let daoSel = {
        "WETH": true,
        "DAI": true,
        "BANK": true,
        "INCH": true,
        "ANT": true,
        "MKR": true,
        "POKT": true,
        "POOL": true,
      }
  
    // let currentWallet = document.getElementById('walletInput');
    // // let inVal = (<HTMLInputElement>currentWallet).value;
    // if(currentWallet){
  
    //   const inVal = (document.getElementById('walletInput') as HTMLInputElement | null)?.value;
  
    //   console.log(inVal);
  
    //   if (inVal !==  walletAddress) {
    //     // override the wallet connect input with what is displayed in the box
    //     walletAddress = inVal!;
    //   }
    // }
  
    console.log(walletAddress);
  
  
    // Access standard Ethers.js JSON-RPC node request
    // alchemy.core.getBlockNumber().then(console.log);
  
    // TESTING Access Alchemy Enhanced API requests
    alchemy.core.getTokenBalances(walletAddress).then(console.log);
    polygon.core.getTokenBalances(walletAddress).then(console.log);
    optimism.core.getTokenBalances(walletAddress).then(console.log);
  
  
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
  
    // console.log(startBlock);
  
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
  
    console.log(res);
  
    // lookup polygon results for transactions
  
    const polyRes = await polygon.core.getAssetTransfers({
      fromBlock: polyStart,
      toBlock: polyEnd,
      toAddress: toAddress,
      excludeZeroValue: true,
      withMetadata: true,
      category: [ AssetTransfersCategory.ERC20 ],
    });
  
    // console.log(polyRes);
  
    // lookup optimism results for transactions
  
    const opRes = await optimism.core.getAssetTransfers({
      fromBlock: opStart,
      toBlock: opEnd,
      toAddress: toAddress,
      excludeZeroValue: true,
      withMetadata: true,
      // order: "desc",       // default asc for ascending
      category: [ AssetTransfersCategory.ERC20 ],
    });
  
    // console.log(opRes);
  
    // setup output object to DOM
    let output = document.getElementById("output");
    output?.classList.add(cs.output);

    // console.log(output);
  
    // console.log(res.transfers + opRes.transfers)
  
    let objArr = res.transfers;   //this is the transaction list data object
    let polyArr = polyRes.transfers;
    let opArr = opRes.transfers;
  
    // const arr1 = ["Cecilie", "Lone"];
    // const arr2 = ["Emil", "Tobias", "Linus"];
    // const arr3 = ["Robin"];
    const alTxs = objArr.concat(polyArr, opArr);
  
    // console.log(alTxs);
  
    // assign the list of trasnctions to the DOM
    globalTxs = alTxs;
    // console.log("-> Add polygon and OP transactions to the global object HERE.");
    let globalIndex = 0;
  
    if(output){
      output!.innerHTML = "";   // clear to start
      console.log("output cleared");
    }
  
    // internal variables to the tx loop
    // var first = true;
    let curMonth = "Start";
    let dateHeader = "";    // init
    let deferHeader = false;
  
      // for each of the transactions ON ETH MAINNET
    for (var i=0; i<objArr.length; i++) {
  
      let thisRow = objArr[i];
      // console.log(thisRow.hash, thisRow.from, thisRow.nonce, thisRow.gas, thisRow.gasUsed, thisRow.gasPrice);
  
      let t = thisRow.metadata.blockTimestamp;    // date from tx record
      let tNice = new Date(t);
      let unixT = Date.parse(t)/1000
  
      // console.log(tNice);
  
      // Income Label - Toggle SWITCH
      
      let incomeState = "NOT";
      // console.log("add other assets here to autoflag as income");
  
      // BANK is always income
      // console.log(daoSel["BANK"]);
      if(thisRow.asset === "BANK"){
        incomeState = "INCOME";
      }
  
      //is enabled check
      if(daoSel.WETH){
        // console.log("WETH is enabled");
        if(thisRow.asset === "WETH"){
          incomeState = "INCOME";   // only enable if WETH is enabled && it matches
        }
      }
  
      if(daoSel.DAI){
        // console.log("DAI is enabled");
        if(thisRow.asset === "DAI"){
          incomeState = "INCOME";   // only enable if WETH is enabled && it matches
        }
      }
  
      if(daoSel.INCH){
        // console.log("1INCH is enabled");
        if(thisRow.asset === "1INCH"){
          incomeState = "INCOME";   // only enable if INCH is enabled && it matches
        }
      }
  
      if(daoSel.ANT){
        if(thisRow.asset === "ANT"){
          incomeState = "INCOME";   // only enable if ANT is enabled && it matches
        }
      }
  
      if(daoSel.MKR){
        if(thisRow.asset === "MKR"){
          incomeState = "INCOME";   // only enable if MKR is enabled && it matches
        }
      }
  
      if(daoSel.POKT){
        if(thisRow.asset === "POKT"){
          incomeState = "INCOME";   // only enable if POKT is enabled && it matches
        }
      }
  
      if(daoSel.POOL){
        if(thisRow.asset === "POOL"){
          incomeState = "INCOME";   // only enable if POOL is enabled && it matches
        }
      }
  
      // console.log(daoSel);    // pass here to convert amount?
  
      let incomeBadge = toggleSwitch(incomeState); // 'Income Label - Toggle SWITCH';
      //console.log(incomeBadge);
  
      let tokenLogo = getTokenLogo(thisRow.asset);   // token logo - '+thisRow.asset+'
      let tokenLabel = getTokenLabel(thisRow.asset);   // token label - '+thisRow.asset+'
      let tokenAmount = displayTokenAmount(thisRow.value,thisRow.asset);   // token amount - '+thisRow.value+'
      let convertAmount = await displayConvertAmount(thisRow.value, thisRow.asset, unixT, FIAT)// "USD/FIAT value @ timefrom blockNum";   // USD/FIAT value @ timefrom blockNum
  
      // console.log(convertAmount);
      let priceParts = convertAmount.split(" ");
      let convertOut = priceParts[0] + " " + priceParts[1];
      let convertRatio = priceParts[2] + " " + priceParts[3] + " " + thisRow.asset + "/" + FIAT;
  
      // htmlhelpers
      let clearBoth = "<div style=clear:both></div>";
  
      // save to globalTxs
      globalTxs[globalIndex].unixT = unixT;   // add unix timestamp to global object
      globalTxs[globalIndex].incomeState = incomeState;   // add income state to global object
      globalTxs[globalIndex].incomeBadge = incomeBadge;   // add income state to global object
      globalTxs[globalIndex].tokenLogo = tokenLogo;   // add income state to global object
      globalTxs[globalIndex].tokenLabel = tokenLabel;   // add income state to global object
      globalTxs[globalIndex].tokenAmount = tokenAmount;   // add income state to global object
      globalTxs[globalIndex].convertAmount = convertAmount;   // add income state to global object
  
  
      let outBox = '<div class=' + cs.flexCont + '>\
        <div class="'+cs.row+" "+cs.even+'">\
          <div class='+cs.col+'>\
            <div class='+cs.row+'>\
              <span class='+cs.tokenLabel+'>'+tokenLabel+'</span>\
            </div>\
            <div class="'+cs.row+" "+cs.incBadge+'" title="badge">\
              '+incomeBadge+' \
            </div>\
          </div>\
          <div class="'+cs.col+" "+cs.logoClick+'">\
            <button class="'+cs.clickable+'">\
            '+ tokenLogo + ' \
            </button>\
          </div>\
          <div class='+cs.col+'>\
            <div class="'+cs.row+" "+cs.end+'">\
              <span class='+cs.tokenAmount+'>'+tokenAmount+'</span>\
            </div>\
            <div class="'+cs.row+" "+cs.end+'">\
              <span class='+cs.convertAmount+'>'+convertOut+'</span>\
            </div>\
          </div>\
        </div>';
  
  
  
      // asset is the token symbol
      // a defines the show/hide condition of the div
      let a = thisRow.asset;
  
      let listRow = "";    //init
  
      // insert date header here - conditional on month change
      let dString = tNice.toDateString();
      let dStringArr = dString.split(" ");
      let dStringMonth = dStringArr[1];
      let dStringYear = dStringArr[3];
  
      if(dStringMonth !== curMonth){
        curMonth = dStringMonth;
        // console.log("Month Change - trigger new header (on first shown element)");
  
        // console.log("index: ",i , dStringMonth, curMonth);
  
        // skip if element is not shown and defer to next in index
  
        dateHeader = "<div class="+cs.dateHeader+">"+getMonthOut(curMonth)+" "+dStringYear+"</div>";
  
        if(incomeState === "NOT") {
          // its not shown so we need to defer the display until one that is shown
          deferHeader = true;   // thihs will trigger display of header later
        } else {
          deferHeader = false;
        
  
          // output here IF monthh change && is income
          listRow += dateHeader;    // add the header before the containeer element.
  
        }
  
        
      }
  
      if(deferHeader){
        // then we need to call the header display here
        if(incomeState === "INCOME"){
          // only on income, so we may miss months if no income recorded.
  
          listRow += dateHeader;    // add the header before the containeer element.
  
          deferHeader = false;    // reset the flag
  
        }
      }
  
      /** Start of tx container li element **/
      // include the date/time in local format, as title of the list item
      listRow += "<li id="+i+" title='"+tNice+"' class='"+cs.tx + " " + a + " " + cs[incomeState] + "'>";
  
      let closeIcon = "<span class="+cs.closeIcon+"><img src='/img/close.png' alt='close' /></span>";    
  
      listRow += outBox;    // main tx output and more button to reveal detail
      // listRow += getTokenLogo(thisRow.asset);
  
      // detail view starts here
      listRow += "<div class="+cs.detail+"><strong><hr/>DETAIL VIEW:"+a+" tx</strong>"+ closeIcon;
  
  
      let dayClean = tNice.toDateString();
      let timeClean = tNice.toLocaleTimeString();     // use users local time to display :)
      let dayArr = dayClean.split(" ");
      let dayOut = getMonthOut(dayArr[1]) + " " + dayArr[2] + ", " + dayArr[3] + " | " + timeClean;
  
      let copyLink = "<a class="+cs.copyLink+" onclick=alert('"+thisRow.from+"')>[]</a>";
   
      listRow += "<div class="+cs.dayOut+">" + dayOut + "<br><span class="+cs.convertAmount+">Converted "+convertRatio+"</span></div>";
  
      listRow += "<a target='_blank' class="+cs.buttonStyle+" href=https://etherscan.io/tx/"+thisRow.hash+">View TX on Etherscan</a>";
  
      listRow += "<div class="+cs.fromAddr+"><strong>From:</strong> <br/>"+thisRow.from+copyLink+"</div>";
  
      listRow += clearBoth+"<a href=https://etherscan.io/address/"+thisRow.from+" target=_blank class="+cs.buttonStyle+">View Sender</a>" + clearBoth;
  
      listRow += "<div class="+cs.incomeToggleContainer+">";     // income toggle container
  
      // default view for BANK token is income
      if(incomeState === "INCOME"){
        listRow += "<img src='/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  />";   // active income image
  
        // not used?
        listRow += "<img src='/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
      } else {
        // non-income display
        listRow += "<img src='/img/in.png' alt=income class="+cs.toggleButton+" />";   // income image
        listRow += "<img src='/img/ni.png' alt=notincome class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
      }
  
      listRow += "</div>";    // end of income toggle container
  
      listRow += "<a href='#' class='"+cs.buttonStyle+ " "+cs.saveBtn+"' title='save (auto) & hide detail view'>Save</a><hr />"
      
      listRow += "</div></div></li>";   // end of detail, flexView container & list item
  


      // override mainnet listRow
      if(incomeState === "INCOME"){
        listRow = "<li><a target='_blank' class="+cs.buttonStyle+" href=https://etherscan.io/tx/"+thisRow.hash+">View TX on Etherscan</a></li>";
      } else {
        listRow = "<li>NOT INCOME</li>";
      }



      // add the matched row to the output list 
      if(output) {
        output!.innerHTML = output?.innerHTML + listRow;
  
      }
  
      globalIndex++;    // increment the global index
  
    }
  
    // jail goes here
    // async function jail() {
    console.log("Duplicate for polygon transactions.");
    if(polyArr.length > 0){
        output!.innerHTML = output?.innerHTML + "<h2>Polygon Transactions</h2>";
    
    }
    
    for (var i=0; i<polyArr.length; i++) {
    
        let thisRow = polyArr[i];
        // console.log(thisRow);
    
        let t = thisRow.metadata.blockTimestamp;    // date from tx record
        let tNice = new Date(t);
        let unixT = Date.parse(t)/1000  
    
        let incomeState = "NOT";
    
        // BANK is always income
        // console.log(daoSel["BANK"]);
        if(thisRow.asset === "BANK"){
        incomeState = "INCOME";
        }
    
        //is enabled check
        if(daoSel.WETH){
        if(thisRow.asset === "WETH"){
            incomeState = "INCOME";   // only enable if WETH is enabled && it matches
        }
        }
    
        if(daoSel.DAI){
        if(thisRow.asset === "DAI"){
            incomeState = "INCOME";   // only enable if WETH is enabled && it matches
        }
        }
    
        if(daoSel.INCH){
        if(thisRow.asset === "1INCH"){
            incomeState = "INCOME";   // only enable if INCH is enabled && it matches
        }
        }
    
        if(daoSel.ANT){
        if(thisRow.asset === "ANT"){
            incomeState = "INCOME";   // only enable if ANT is enabled && it matches
        }
        }
    
        if(daoSel.MKR){
        if(thisRow.asset === "MKR"){
            incomeState = "INCOME";   // only enable if MKR is enabled && it matches
        }
        }
    
        if(daoSel.POKT){
        if(thisRow.asset === "POKT"){
            incomeState = "INCOME";   // only enable if POKT is enabled && it matches
        }
        }
    
        if(daoSel.POOL){
        if(thisRow.asset === "POOL"){
            incomeState = "INCOME";   // only enable if POOL is enabled && it matches
        }
        }
    
        /** LIMIT FILTER */
        let assets = ["BANK", "WETH", "DAI", "1INCH", "ANT", "MKR", "POKT", "POOL"];
    
        let asset = thisRow.asset || "";
        if(assets.includes(asset)){
    
        let incomeBadge = toggleSwitch(incomeState); // 'Income Label - Toggle SWITCH';
    
        let tokenLogo = getTokenLogo(thisRow.asset);   // token logo - '+thisRow.asset+'
        let tokenLabel = getTokenLabel(thisRow.asset);   // token label - '+thisRow.asset+'
        let tokenAmount = displayTokenAmount(thisRow.value,thisRow.asset);   // token amount - '+thisRow.value+'
        let convertAmount = await displayConvertAmount(thisRow.value, thisRow.asset, unixT, FIAT)// "USD/FIAT value @ timefrom blockNum";   // USD/FIAT value @ timefrom blockNum
    
        // console.log(convertAmount);
    
        let priceParts = convertAmount.split(" ");
        let convertOut = priceParts[0] + " " + priceParts[1];
        let convertRatio = priceParts[2] + " " + priceParts[3] + " " + thisRow.asset + "/" + FIAT;
    
        // htmlhelpers
        let clearBoth = "<div style=clear:both></div>";
    
        // console.log(asset, globalIndex);    // this index is not getting high enough
        // console.log(globalTxs[globalIndex]);
        // console.log(globalTxs);
    
        // let j = i + objArr.length;   // offset for mainnet txs
        if(globalTxs[globalIndex].asset === asset) {
            // save to globalTxs (after mainnet txs)
            globalTxs[globalIndex].unixT = unixT;   // add unix timestamp to global object
            globalTxs[globalIndex].incomeState = incomeState;   // add income state to global object
            globalTxs[globalIndex].incomeBadge = incomeBadge;   // add income state to global object
            globalTxs[globalIndex].tokenLogo = tokenLogo;   // add income state to global object
            globalTxs[globalIndex].tokenLabel = tokenLabel;   // add income state to global object
            globalTxs[globalIndex].tokenAmount = tokenAmount;   // add income state to global object
            globalTxs[globalIndex].convertAmount = convertAmount;   // add income state to global object
        }
        
    
    
        let outBox = '<div class=' + cs.flexCont + '>\
            <div class="'+cs.row+" "+cs.even+'">\
            <div class='+cs.col+'>\
                <div class='+cs.row+'>\
                <span class='+cs.tokenLabel+'>'+tokenLabel+'</span>\
                </div>\
                <div class="'+cs.row+" "+cs.incBadge+'" title="badge">\
                '+incomeBadge+' \
                </div>\
            </div>\
            <div class="'+cs.col+" "+cs.logoClick+'">\
                <button class="'+cs.clickable+'">\
                '+ tokenLogo + ' \
                </button>\
            </div>\
            <div class='+cs.col+'>\
                <div class="'+cs.row+" "+cs.end+'">\
                <span class='+cs.tokenAmount+'>'+tokenAmount+'</span>\
                </div>\
                <div class="'+cs.row+" "+cs.end+'">\
                <span class='+cs.convertAmount+'>'+convertOut+'</span>\
                </div>\
            </div>\
            </div>';
    
    
    
        // asset is the token symbol
        // a defines the show/hide condition of the div
        let a = thisRow.asset;
    
        let listRow = "";    //init
    
        /** THIS IS THE MONTH HEADER SELECTOR HERE */
    
        // insert date header here - conditional on month change
        let dString = tNice.toDateString();
        let dStringArr = dString.split(" ");
        let dStringMonth = dStringArr[1];
        let dStringYear = dStringArr[3];
    
        if(dStringMonth !== curMonth){
            curMonth = dStringMonth;
            // console.log("Month Change - trigger new header (on first shown element)");
    
            // console.log("index: ",i , dStringMonth, curMonth);
    
            // skip if element is not shown and defer to next in index
    
            dateHeader = "<div class="+cs.dateHeader+">"+getMonthOut(curMonth)+" "+dStringYear+"</div>";
    
            if(incomeState === "NOT") {
            // its not shown so we need to defer the display until one that is shown
            deferHeader = true;   // thihs will trigger display of header later
            } else {
            deferHeader = false;
            
    
            // output here IF monthh change && is income
            listRow += dateHeader;    // add the header before the containeer element.
    
            }
    
            
        }
    
        if(deferHeader){
            // then we need to call the header display here
            if(incomeState === "INCOME"){
            // only on income, so we may miss months if no income recorded.
    
            listRow += dateHeader;    // add the header before the containeer element.
    
            deferHeader = false;    // reset the flag
    
            }
        }
    
        /** Start of tx container li element **/
        // include the date/time in local format, as title of the list item
        listRow += "<li id="+i+" title='"+tNice+"' class='"+cs.tx + " " + a + " " + cs[incomeState] + "'>";
    
        let closeIcon = "<span class="+cs.closeIcon+"><img src='/img/close.png' alt='close' /></span>";    
    
        listRow += outBox;    // main tx output and more button to reveal detail
        // listRow += getTokenLogo(thisRow.asset);
    
    
        let dayClean = tNice.toDateString();
        let timeClean = tNice.toLocaleTimeString();     // use users local time to display :)
        let dayArr = dayClean.split(" ");
        let dayOut = getMonthOut(dayArr[1]) + " " + dayArr[2] + ", " + dayArr[3] + " | " + timeClean;
    
        let copyLink = "<a class="+cs.copyLink+" onclick=alert('"+thisRow.from+"')>[]</a>";
    
        // detail view starts here
        listRow += "<div class="+cs.detail+"><strong><hr/>DETAIL VIEW:"+a+" tx</strong>"+ closeIcon;
    
        listRow += "<div class="+cs.dayOut+">" + dayOut + "<br><span class="+cs.convertAmount+">Converted "+convertRatio+"</span></div>";
    
        listRow += "<a target='_blank' class="+cs.buttonStyle+" href=https://etherscan.io/tx/"+thisRow.hash+">View TX on Etherscan</a>";
    
        listRow += "<div class="+cs.fromAddr+"><strong>From:</strong> <br/>"+thisRow.from+copyLink+"</div>";
    
        listRow += clearBoth+"<a href=https://etherscan.io/address/"+thisRow.from+" target=_blank class="+cs.buttonStyle+">View Sender</a>" + clearBoth;
    
        listRow += "<div class="+cs.incomeToggleContainer+">";     // income toggle container
    
        // default view for BANK token is income
        if(incomeState === "INCOME"){
            listRow += "<img src='/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  />";   // active income image
    
            // not used?
            listRow += "<img src='/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
        } else {
            // non-income display
            listRow += "<img src='/img/in.png' alt=income class="+cs.toggleButton+" />";   // income image
            listRow += "<img src='/img/ni.png' alt=notincome class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
        }
    
        listRow += "</div>";    // end of income toggle container
    
        listRow += "<a href='#' class='"+cs.buttonStyle+ " "+cs.saveBtn+"' title='save (auto) & hide detail view'>Save</a><hr />"
        
        listRow += "</div></div></li>";   // end of detail, flexView container & list item
    
        // add the matched row to the output list 
        if (output) {
            output!.innerHTML = output?.innerHTML + listRow;
    
        }
    
        globalIndex++;    // increment the global index
    
    
        } else{
        // skip non-matches - do not add to the list
        // still increment the counter
        globalIndex++;
        }
    
    
        
    
    }   // end for all polygon transactions
    
    console.log("Duplicate for optimism transactions.");
    if(opArr.length > 0){
        output!.innerHTML = output?.innerHTML + "<h2>Optimism Transactions</h2>";
    
    }

    for (var i=0; i<opArr.length; i++) {
    
        let thisRow = opArr[i];     // or globalTxs[globalIndex]
        // console.log(thisRow);
    
        let t = thisRow.metadata.blockTimestamp;    // date from tx record
        let tNice = new Date(t);
        let unixT = Date.parse(t)/1000  
    
        let incomeState = "NOT";
    
        // BANK is always income
        // console.log(daoSel["BANK"]);
        if(thisRow.asset === "BANK"){
        incomeState = "INCOME";
        }
    
        //is enabled check
        if(daoSel.WETH){
        if(thisRow.asset === "WETH"){
            incomeState = "INCOME";   // only enable if WETH is enabled && it matches
        }
        }
    
        if(daoSel.DAI){
        if(thisRow.asset === "DAI"){
            incomeState = "INCOME";   // only enable if WETH is enabled && it matches
        }
        }
    
        if(daoSel.INCH){
        if(thisRow.asset === "1INCH"){
            incomeState = "INCOME";   // only enable if INCH is enabled && it matches
        }
        }
    
        if(daoSel.ANT){
        if(thisRow.asset === "ANT"){
            incomeState = "INCOME";   // only enable if ANT is enabled && it matches
        }
        }
    
        if(daoSel.MKR){
        if(thisRow.asset === "MKR"){
            incomeState = "INCOME";   // only enable if MKR is enabled && it matches
        }
        }
    
        if(daoSel.POKT){
        if(thisRow.asset === "POKT"){
            incomeState = "INCOME";   // only enable if POKT is enabled && it matches
        }
        }
    
        if(daoSel.POOL){
        if(thisRow.asset === "POOL"){
            incomeState = "INCOME";   // only enable if POOL is enabled && it matches
        }
        }
    
        /** LIMIT FILTER */
        let assets = ["BANK", "WETH", "DAI", "1INCH", "ANT", "MKR", "POKT", "POOL"];
    
        let asset = thisRow.asset || "";
        if(assets.includes(asset)){
    
        let incomeBadge = toggleSwitch(incomeState); // 'Income Label - Toggle SWITCH';
    
        let tokenLogo = getTokenLogo(thisRow.asset);   // token logo - '+thisRow.asset+'
        let tokenLabel = getTokenLabel(thisRow.asset);   // token label - '+thisRow.asset+'
        let tokenAmount = displayTokenAmount(thisRow.value,thisRow.asset);   // token amount - '+thisRow.value+'
        let convertAmount = await displayConvertAmount(thisRow.value, thisRow.asset, unixT, FIAT)// "USD/FIAT value @ timefrom blockNum";   // USD/FIAT value @ timefrom blockNum
    
        // console.log(convertAmount);
    
        let priceParts = convertAmount.split(" ");
        let convertOut = priceParts[0] + " " + priceParts[1];
        let convertRatio = priceParts[2] + " " + priceParts[3] + " " + thisRow.asset + "/" + FIAT;
    
        // htmlhelpers
        let clearBoth = "<div style=clear:both></div>";
    
        // console.log(asset, globalIndex);    // this index is not getting high enough
        // console.log(globalTxs[globalIndex]);
        // console.log(globalTxs);
    
        // dont trus't, verify asset matches
        if(globalTxs[globalIndex].asset === asset) {
            // save to globalTxs (after mainnet txs)
            globalTxs[globalIndex].unixT = unixT;   // add unix timestamp to global object
            globalTxs[globalIndex].incomeState = incomeState;   // add income state to global object
            globalTxs[globalIndex].incomeBadge = incomeBadge;   // add income state to global object
            globalTxs[globalIndex].tokenLogo = tokenLogo;   // add income state to global object
            globalTxs[globalIndex].tokenLabel = tokenLabel;   // add income state to global object
            globalTxs[globalIndex].tokenAmount = tokenAmount;   // add income state to global object
            globalTxs[globalIndex].convertAmount = convertAmount;   // add income state to global object
        }
        
    
    
        let outBox = '<div class=' + cs.flexCont + '>\
            <div class="'+cs.row+" "+cs.even+'">\
            <div class='+cs.col+'>\
                <div class='+cs.row+'>\
                <span class='+cs.tokenLabel+'>'+tokenLabel+'</span>\
                </div>\
                <div class="'+cs.row+" "+cs.incBadge+'" title="badge">\
                '+incomeBadge+' \
                </div>\
            </div>\
            <div class="'+cs.col+" "+cs.logoClick+'">\
                <button class="'+cs.clickable+'">\
                '+ tokenLogo + ' \
                </button>\
            </div>\
            <div class='+cs.col+'>\
                <div class="'+cs.row+" "+cs.end+'">\
                <span class='+cs.tokenAmount+'>'+tokenAmount+'</span>\
                </div>\
                <div class="'+cs.row+" "+cs.end+'">\
                <span class='+cs.convertAmount+'>'+convertOut+'</span>\
                </div>\
            </div>\
            </div>';
    
    
    
        // asset is the token symbol
        // a defines the show/hide condition of the div
        let a = thisRow.asset;
    
        let listRow = "";    //init
    
        /** THIS IS THE MONTH HEADER SELECTOR HERE */
    
        // insert date header here - conditional on month change
        let dString = tNice.toDateString();
        let dStringArr = dString.split(" ");
        let dStringMonth = dStringArr[1];
        let dStringYear = dStringArr[3];
    
        if(dStringMonth !== curMonth){
            curMonth = dStringMonth;
            // console.log("Month Change - trigger new header (on first shown element)");
    
            // console.log("index: ",i , dStringMonth, curMonth);
    
            // skip if element is not shown and defer to next in index
    
            dateHeader = "<div class="+cs.dateHeader+">"+getMonthOut(curMonth)+" "+dStringYear+"</div>";
    
            if(incomeState === "NOT") {
            // its not shown so we need to defer the display until one that is shown
            deferHeader = true;   // thihs will trigger display of header later
            } else {
            deferHeader = false;
            
    
            // output here IF monthh change && is income
            listRow += dateHeader;    // add the header before the containeer element.
    
            }
    
            
        }
    
        if(deferHeader){
            // then we need to call the header display here
            if(incomeState === "INCOME"){
            // only on income, so we may miss months if no income recorded.
    
            listRow += dateHeader;    // add the header before the containeer element.
    
            deferHeader = false;    // reset the flag
    
            }
        }
    
        /** Start of tx container li element **/
        // include the date/time in local format, as title of the list item
        listRow += "<li id="+i+" title='"+tNice+"' class='"+cs.tx + " " + a + " " + cs[incomeState] + "'>";
    
        let closeIcon = "<span class="+cs.closeIcon+"><img src='/img/close.png' alt='close' /></span>";    
    
        listRow += outBox;    // main tx output and more button to reveal detail
        // listRow += getTokenLogo(thisRow.asset);
    
    
        let dayClean = tNice.toDateString();
        let timeClean = tNice.toLocaleTimeString();     // use users local time to display :)
        let dayArr = dayClean.split(" ");
        let dayOut = getMonthOut(dayArr[1]) + " " + dayArr[2] + ", " + dayArr[3] + " | " + timeClean;
    
        let copyLink = "<a class="+cs.copyLink+" onclick=alert('"+thisRow.from+"')>[]</a>";
    
        // detail view starts here
        listRow += "<div class="+cs.detail+"><strong><hr/>DETAIL VIEW:"+a+" tx</strong>"+ closeIcon;
    
        listRow += "<div class="+cs.dayOut+">" + dayOut + "<br><span class="+cs.convertAmount+">Converted "+convertRatio+"</span></div>";
    
        listRow += "<a target='_blank' class="+cs.buttonStyle+" href=https://etherscan.io/tx/"+thisRow.hash+">View TX on Etherscan</a>";
    
        listRow += "<div class="+cs.fromAddr+"><strong>From:</strong> <br/>"+thisRow.from+copyLink+"</div>";
    
        listRow += clearBoth+"<a href=https://etherscan.io/address/"+thisRow.from+" target=_blank class="+cs.buttonStyle+">View Sender</a>" + clearBoth;
    
        listRow += "<div class="+cs.incomeToggleContainer+">";     // income toggle container
    
        // default view for BANK token is income
        if(incomeState === "INCOME"){
            listRow += "<img src='/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  />";   // active income image
    
            // not used?
            listRow += "<img src='/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
        } else {
            // non-income display
            listRow += "<img src='/img/in.png' alt=income class="+cs.toggleButton+" />";   // income image
            listRow += "<img src='/img/ni.png' alt=notincome class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
        }
    
        listRow += "</div>";    // end of income toggle container
    
        listRow += "<a href='#' class='"+cs.buttonStyle+ " "+cs.saveBtn+"' title='save (auto) & hide detail view'>Save</a><hr />"
        
        listRow += "</div></div></li>";   // end of detail, flexView container & list item
    
        // add the matched row to the output list 
        if (output) {
            output!.innerHTML = output?.innerHTML + listRow;
    
        }
    
        globalIndex++;    // increment the global index
    
    
        } else{
        // skip non-matches - do not add to the list
        // still increment the counter
        globalIndex++;
        }
    
    
        
    
    }   // end for all optimism transactions

      //}
    // this function shoudl get all txs and return global txs object
    // console.log(globalTxs);
    return globalTxs;


    // end all alchemyGo function call
}

  async function jail() {
    console.log("Duplicate for polygon transactions.");
    if(polyArr.length > 0){
      output!.innerHTML = output?.innerHTML + "<h2>Polygon Transactions</h2>";
  
    }
  
    for (var i=0; i<polyArr.length; i++) {
  
      let thisRow = polyArr[i];
      // console.log(thisRow);
  
      let t = thisRow.metadata.blockTimestamp;    // date from tx record
      let tNice = new Date(t);
      let unixT = Date.parse(t)/1000  
  
      let incomeState = "NOT";
  
      // BANK is always income
      // console.log(daoSel["BANK"]);
      if(thisRow.asset === "BANK"){
        incomeState = "INCOME";
      }
  
      //is enabled check
      if(daoSel.WETH){
        if(thisRow.asset === "WETH"){
          incomeState = "INCOME";   // only enable if WETH is enabled && it matches
        }
      }
  
      if(daoSel.DAI){
        if(thisRow.asset === "DAI"){
          incomeState = "INCOME";   // only enable if WETH is enabled && it matches
        }
      }
  
      if(daoSel.INCH){
        if(thisRow.asset === "1INCH"){
          incomeState = "INCOME";   // only enable if INCH is enabled && it matches
        }
      }
  
      if(daoSel.ANT){
        if(thisRow.asset === "ANT"){
          incomeState = "INCOME";   // only enable if ANT is enabled && it matches
        }
      }
  
      if(daoSel.MKR){
        if(thisRow.asset === "MKR"){
          incomeState = "INCOME";   // only enable if MKR is enabled && it matches
        }
      }
  
      if(daoSel.POKT){
        if(thisRow.asset === "POKT"){
          incomeState = "INCOME";   // only enable if POKT is enabled && it matches
        }
      }
  
      if(daoSel.POOL){
        if(thisRow.asset === "POOL"){
          incomeState = "INCOME";   // only enable if POOL is enabled && it matches
        }
      }
  
      /** LIMIT FILTER */
      let assets = ["BANK", "WETH", "DAI", "1INCH", "ANT", "MKR", "POKT", "POOL"];
  
      let asset = thisRow.asset || "";
      if(assets.includes(asset)){
  
        let incomeBadge = toggleSwitch(incomeState); // 'Income Label - Toggle SWITCH';
  
        let tokenLogo = getTokenLogo(thisRow.asset);   // token logo - '+thisRow.asset+'
        let tokenLabel = getTokenLabel(thisRow.asset);   // token label - '+thisRow.asset+'
        let tokenAmount = displayTokenAmount(thisRow.value,thisRow.asset);   // token amount - '+thisRow.value+'
        let convertAmount = await displayConvertAmount(thisRow.value, thisRow.asset, unixT, FIAT)// "USD/FIAT value @ timefrom blockNum";   // USD/FIAT value @ timefrom blockNum
  
        // console.log(convertAmount);
  
        let priceParts = convertAmount.split(" ");
        let convertOut = priceParts[0] + " " + priceParts[1];
        let convertRatio = priceParts[2] + " " + priceParts[3] + " " + thisRow.asset + "/" + FIAT;
  
        // htmlhelpers
        let clearBoth = "<div style=clear:both></div>";
  
        // console.log(asset, globalIndex);    // this index is not getting high enough
        // console.log(globalTxs[globalIndex]);
        // console.log(globalTxs);
  
        // let j = i + objArr.length;   // offset for mainnet txs
        if(globalTxs[globalIndex].asset === asset) {
          // save to globalTxs (after mainnet txs)
          globalTxs[globalIndex].unixT = unixT;   // add unix timestamp to global object
          globalTxs[globalIndex].incomeState = incomeState;   // add income state to global object
          globalTxs[globalIndex].incomeBadge = incomeBadge;   // add income state to global object
          globalTxs[globalIndex].tokenLogo = tokenLogo;   // add income state to global object
          globalTxs[globalIndex].tokenLabel = tokenLabel;   // add income state to global object
          globalTxs[globalIndex].tokenAmount = tokenAmount;   // add income state to global object
          globalTxs[globalIndex].convertAmount = convertAmount;   // add income state to global object
        }
        
  
  
        let outBox = '<div class=' + cs.flexCont + '>\
          <div class="'+cs.row+" "+cs.even+'">\
            <div class='+cs.col+'>\
              <div class='+cs.row+'>\
                <span class='+cs.tokenLabel+'>'+tokenLabel+'</span>\
              </div>\
              <div class="'+cs.row+" "+cs.incBadge+'" title="badge">\
                '+incomeBadge+' \
              </div>\
            </div>\
            <div class="'+cs.col+" "+cs.logoClick+'">\
              <button class="'+cs.clickable+'">\
              '+ tokenLogo + ' \
              </button>\
            </div>\
            <div class='+cs.col+'>\
              <div class="'+cs.row+" "+cs.end+'">\
                <span class='+cs.tokenAmount+'>'+tokenAmount+'</span>\
              </div>\
              <div class="'+cs.row+" "+cs.end+'">\
                <span class='+cs.convertAmount+'>'+convertOut+'</span>\
              </div>\
            </div>\
          </div>';
  
  
  
        // asset is the token symbol
        // a defines the show/hide condition of the div
        let a = thisRow.asset;
  
        let listRow = "";    //init
  
        /** THIS IS THE MONTH HEADER SELECTOR HERE */
  
        // insert date header here - conditional on month change
        let dString = tNice.toDateString();
        let dStringArr = dString.split(" ");
        let dStringMonth = dStringArr[1];
        let dStringYear = dStringArr[3];
  
        if(dStringMonth !== curMonth){
          curMonth = dStringMonth;
          // console.log("Month Change - trigger new header (on first shown element)");
  
          // console.log("index: ",i , dStringMonth, curMonth);
  
          // skip if element is not shown and defer to next in index
  
          dateHeader = "<div class="+cs.dateHeader+">"+getMonthOut(curMonth)+" "+dStringYear+"</div>";
  
          if(incomeState === "NOT") {
            // its not shown so we need to defer the display until one that is shown
            deferHeader = true;   // thihs will trigger display of header later
          } else {
            deferHeader = false;
          
  
            // output here IF monthh change && is income
            listRow += dateHeader;    // add the header before the containeer element.
  
          }
  
          
        }
  
        if(deferHeader){
          // then we need to call the header display here
          if(incomeState === "INCOME"){
            // only on income, so we may miss months if no income recorded.
  
            listRow += dateHeader;    // add the header before the containeer element.
  
            deferHeader = false;    // reset the flag
  
          }
        }
  
        /** Start of tx container li element **/
        // include the date/time in local format, as title of the list item
        listRow += "<li id="+i+" title='"+tNice+"' class='"+cs.tx + " " + a + " " + cs[incomeState] + "'>";
  
        let closeIcon = "<span class="+cs.closeIcon+"><img src='/img/close.png' alt='close' /></span>";    
  
        listRow += outBox;    // main tx output and more button to reveal detail
        // listRow += getTokenLogo(thisRow.asset);
  
  
        let dayClean = tNice.toDateString();
        let timeClean = tNice.toLocaleTimeString();     // use users local time to display :)
        let dayArr = dayClean.split(" ");
        let dayOut = getMonthOut(dayArr[1]) + " " + dayArr[2] + ", " + dayArr[3] + " | " + timeClean;
  
        let copyLink = "<a class="+cs.copyLink+" onclick=alert('"+thisRow.from+"')>[]</a>";
    
        // detail view starts here
        listRow += "<div class="+cs.detail+"><strong><hr/>DETAIL VIEW:"+a+" tx</strong>"+ closeIcon;
  
        listRow += "<div class="+cs.dayOut+">" + dayOut + "<br><span class="+cs.convertAmount+">Converted "+convertRatio+"</span></div>";
  
        listRow += "<a target='_blank' class="+cs.buttonStyle+" href=https://etherscan.io/tx/"+thisRow.hash+">View TX on Etherscan</a>";
  
        listRow += "<div class="+cs.fromAddr+"><strong>From:</strong> <br/>"+thisRow.from+copyLink+"</div>";
  
        listRow += clearBoth+"<a href=https://etherscan.io/address/"+thisRow.from+" target=_blank class="+cs.buttonStyle+">View Sender</a>" + clearBoth;
  
        listRow += "<div class="+cs.incomeToggleContainer+">";     // income toggle container
  
        // default view for BANK token is income
        if(incomeState === "INCOME"){
          listRow += "<img src='/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  />";   // active income image
  
          // not used?
          listRow += "<img src='/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
        } else {
          // non-income display
          listRow += "<img src='/img/in.png' alt=income class="+cs.toggleButton+" />";   // income image
          listRow += "<img src='/img/ni.png' alt=notincome class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
        }
  
        listRow += "</div>";    // end of income toggle container
  
        listRow += "<a href='#' class='"+cs.buttonStyle+ " "+cs.saveBtn+"' title='save (auto) & hide detail view'>Save</a><hr />"
        
        listRow += "</div></div></li>";   // end of detail, flexView container & list item
  
        // add the matched row to the output list 
        if (output) {
          output!.innerHTML = output?.innerHTML + listRow;
  
        }
  
        globalIndex++;    // increment the global index
  
  
      } else{
        // skip non-matches - do not add to the list
        // still increment the counter
        globalIndex++;
      }
  
  
      
  
    }   // end for all polygon transactions
  
    console.log("Duplicate for optimism transactions.");
    if(opArr.length > 0){
      output!.innerHTML = output?.innerHTML + "<h2>Optimism Transactions</h2>";
  
    }

    for (var i=0; i<opArr.length; i++) {
  
      let thisRow = opArr[i];     // or globalTxs[globalIndex]
      // console.log(thisRow);
  
      let t = thisRow.metadata.blockTimestamp;    // date from tx record
      let tNice = new Date(t);
      let unixT = Date.parse(t)/1000  
  
      let incomeState = "NOT";
  
      // BANK is always income
      // console.log(daoSel["BANK"]);
      if(thisRow.asset === "BANK"){
        incomeState = "INCOME";
      }
  
      //is enabled check
      if(daoSel.WETH){
        if(thisRow.asset === "WETH"){
          incomeState = "INCOME";   // only enable if WETH is enabled && it matches
        }
      }
  
      if(daoSel.DAI){
        if(thisRow.asset === "DAI"){
          incomeState = "INCOME";   // only enable if WETH is enabled && it matches
        }
      }
  
      if(daoSel.INCH){
        if(thisRow.asset === "1INCH"){
          incomeState = "INCOME";   // only enable if INCH is enabled && it matches
        }
      }
  
      if(daoSel.ANT){
        if(thisRow.asset === "ANT"){
          incomeState = "INCOME";   // only enable if ANT is enabled && it matches
        }
      }
  
      if(daoSel.MKR){
        if(thisRow.asset === "MKR"){
          incomeState = "INCOME";   // only enable if MKR is enabled && it matches
        }
      }
  
      if(daoSel.POKT){
        if(thisRow.asset === "POKT"){
          incomeState = "INCOME";   // only enable if POKT is enabled && it matches
        }
      }
  
      if(daoSel.POOL){
        if(thisRow.asset === "POOL"){
          incomeState = "INCOME";   // only enable if POOL is enabled && it matches
        }
      }
  
      /** LIMIT FILTER */
      let assets = ["BANK", "WETH", "DAI", "1INCH", "ANT", "MKR", "POKT", "POOL"];
  
      let asset = thisRow.asset || "";
      if(assets.includes(asset)){
  
        let incomeBadge = toggleSwitch(incomeState); // 'Income Label - Toggle SWITCH';
  
        let tokenLogo = getTokenLogo(thisRow.asset);   // token logo - '+thisRow.asset+'
        let tokenLabel = getTokenLabel(thisRow.asset);   // token label - '+thisRow.asset+'
        let tokenAmount = displayTokenAmount(thisRow.value,thisRow.asset);   // token amount - '+thisRow.value+'
        let convertAmount = await displayConvertAmount(thisRow.value, thisRow.asset, unixT, FIAT)// "USD/FIAT value @ timefrom blockNum";   // USD/FIAT value @ timefrom blockNum
  
        console.log(convertAmount);
  
        let priceParts = convertAmount.split(" ");
        let convertOut = priceParts[0] + " " + priceParts[1];
        let convertRatio = priceParts[2] + " " + priceParts[3] + " " + thisRow.asset + "/" + FIAT;
  
        // htmlhelpers
        let clearBoth = "<div style=clear:both></div>";
  
        // console.log(asset, globalIndex);    // this index is not getting high enough
        // console.log(globalTxs[globalIndex]);
        // console.log(globalTxs);
  
        // dont trus't, verify asset matches
        if(globalTxs[globalIndex].asset === asset) {
          // save to globalTxs (after mainnet txs)
          globalTxs[globalIndex].unixT = unixT;   // add unix timestamp to global object
          globalTxs[globalIndex].incomeState = incomeState;   // add income state to global object
          globalTxs[globalIndex].incomeBadge = incomeBadge;   // add income state to global object
          globalTxs[globalIndex].tokenLogo = tokenLogo;   // add income state to global object
          globalTxs[globalIndex].tokenLabel = tokenLabel;   // add income state to global object
          globalTxs[globalIndex].tokenAmount = tokenAmount;   // add income state to global object
          globalTxs[globalIndex].convertAmount = convertAmount;   // add income state to global object
        }
        
  
  
        let outBox = '<div class=' + cs.flexCont + '>\
          <div class="'+cs.row+" "+cs.even+'">\
            <div class='+cs.col+'>\
              <div class='+cs.row+'>\
                <span class='+cs.tokenLabel+'>'+tokenLabel+'</span>\
              </div>\
              <div class="'+cs.row+" "+cs.incBadge+'" title="badge">\
                '+incomeBadge+' \
              </div>\
            </div>\
            <div class="'+cs.col+" "+cs.logoClick+'">\
              <button class="'+cs.clickable+'">\
              '+ tokenLogo + ' \
              </button>\
            </div>\
            <div class='+cs.col+'>\
              <div class="'+cs.row+" "+cs.end+'">\
                <span class='+cs.tokenAmount+'>'+tokenAmount+'</span>\
              </div>\
              <div class="'+cs.row+" "+cs.end+'">\
                <span class='+cs.convertAmount+'>'+convertOut+'</span>\
              </div>\
            </div>\
          </div>';
  
  
  
        // asset is the token symbol
        // a defines the show/hide condition of the div
        let a = thisRow.asset;
  
        let listRow = "";    //init
  
        /** THIS IS THE MONTH HEADER SELECTOR HERE */
  
        // insert date header here - conditional on month change
        let dString = tNice.toDateString();
        let dStringArr = dString.split(" ");
        let dStringMonth = dStringArr[1];
        let dStringYear = dStringArr[3];
  
        if(dStringMonth !== curMonth){
          curMonth = dStringMonth;
          // console.log("Month Change - trigger new header (on first shown element)");
  
          // console.log("index: ",i , dStringMonth, curMonth);
  
          // skip if element is not shown and defer to next in index
  
          dateHeader = "<div class="+cs.dateHeader+">"+getMonthOut(curMonth)+" "+dStringYear+"</div>";
  
          if(incomeState === "NOT") {
            // its not shown so we need to defer the display until one that is shown
            deferHeader = true;   // thihs will trigger display of header later
          } else {
            deferHeader = false;
          
  
            // output here IF monthh change && is income
            listRow += dateHeader;    // add the header before the containeer element.
  
          }
  
          
        }
  
        if(deferHeader){
          // then we need to call the header display here
          if(incomeState === "INCOME"){
            // only on income, so we may miss months if no income recorded.
  
            listRow += dateHeader;    // add the header before the containeer element.
  
            deferHeader = false;    // reset the flag
  
          }
        }
  
        /** Start of tx container li element **/
        // include the date/time in local format, as title of the list item
        listRow += "<li id="+i+" title='"+tNice+"' class='"+cs.tx + " " + a + " " + cs[incomeState] + "'>";
  
        let closeIcon = "<span class="+cs.closeIcon+"><img src='/img/close.png' alt='close' /></span>";    
  
        listRow += outBox;    // main tx output and more button to reveal detail
        // listRow += getTokenLogo(thisRow.asset);
  
  
        let dayClean = tNice.toDateString();
        let timeClean = tNice.toLocaleTimeString();     // use users local time to display :)
        let dayArr = dayClean.split(" ");
        let dayOut = getMonthOut(dayArr[1]) + " " + dayArr[2] + ", " + dayArr[3] + " | " + timeClean;
  
        let copyLink = "<a class="+cs.copyLink+" onclick=alert('"+thisRow.from+"')>[]</a>";
    
        // detail view starts here
        listRow += "<div class="+cs.detail+"><strong><hr/>DETAIL VIEW:"+a+" tx</strong>"+ closeIcon;
  
        listRow += "<div class="+cs.dayOut+">" + dayOut + "<br><span class="+cs.convertAmount+">Converted "+convertRatio+"</span></div>";
  
        listRow += "<a target='_blank' class="+cs.buttonStyle+" href=https://etherscan.io/tx/"+thisRow.hash+">View TX on Etherscan</a>";
  
        listRow += "<div class="+cs.fromAddr+"><strong>From:</strong> <br/>"+thisRow.from+copyLink+"</div>";
  
        listRow += clearBoth+"<a href=https://etherscan.io/address/"+thisRow.from+" target=_blank class="+cs.buttonStyle+">View Sender</a>" + clearBoth;
  
        listRow += "<div class="+cs.incomeToggleContainer+">";     // income toggle container
  
        // default view for BANK token is income
        if(incomeState === "INCOME"){
          listRow += "<img src='/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  />";   // active income image
  
          // not used?
          listRow += "<img src='/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
        } else {
          // non-income display
          listRow += "<img src='/img/in.png' alt=income class="+cs.toggleButton+" />";   // income image
          listRow += "<img src='/img/ni.png' alt=notincome class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
        }
  
        listRow += "</div>";    // end of income toggle container
  
        listRow += "<a href='#' class='"+cs.buttonStyle+ " "+cs.saveBtn+"' title='save (auto) & hide detail view'>Save</a><hr />"
        
        listRow += "</div></div></li>";   // end of detail, flexView container & list item
  
        // add the matched row to the output list 
        if (output) {
          output!.innerHTML = output?.innerHTML + listRow;
  
        }
  
        globalIndex++;    // increment the global index
  
  
      } else{
        // skip non-matches - do not add to the list
        // still increment the counter
        globalIndex++;
      }
  
  
      
  
    }   // end for all optimism transactions
  }
  