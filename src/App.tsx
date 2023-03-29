import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'
import { createElement, useState } from 'react'
import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';

// @ts-ignore Import module
import { Email } from './functions/smtpjsv3'; 
// @ts-ignore Import module
import { searchTree } from './functions/searchTree';    

// components from library
import { Account } from './components'
import { Card } from './components'
import { Clock } from './components'
import { Btn } from './components'

import { DaoSelectors } from './components';

// functions from library
import { toggleAlts } from './functions'
import { toggleDetail } from './functions'
import { finishButton } from './functions'    // action of finish button not component
import { toggleSwitch } from './functions'    // action of switch not component
// import { handleOpen } from './functions' 
import { getTokenLogo } from './functions' 
import { getTokenLabel } from './functions'   
import { displayTokenAmount } from './functions' 
import { displayConvertAmount } from './functions'

// data imports
import { REACT_APP_ALCHEMY_API_KEY, ELASTICMAIL_SECURETOKEN } from './data' 

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: REACT_APP_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const polygon = new Alchemy({ apiKey: REACT_APP_ALCHEMY_API_KEY, network: Network.MATIC_MAINNET });
const optimism = new Alchemy({ apiKey: REACT_APP_ALCHEMY_API_KEY, network: Network.OPT_MAINNET });

// import './style.module.css'
// Sample of dynamically applied CSS
import cs from './style.module.css'

let globalTxs:any = [];

// this function to handle the details display view - click on the tx Logo
function handleOpen(thisLink:any) {

  console.log( thisLink.currentTarget );    // OK targets button
  // figure out where we are in the DOM
  // open/close the next details tab
  let details = thisLink.currentTarget.parentNode.parentNode.nextSibling;
  console.log(details);
  console.log(details.style.display);

  if (details.style.display === 'block') {
    details.style.display = 'none';
  } else {
    details.style.display = 'block';
  }

}


// this function handles the save button press within the detail view
function handleSave(evt:any) {

  evt.preventDefault();

  console.log( evt.currentTarget.parentNode );    // OK targets button
  // figure out where we are in the DOM

  evt.currentTarget.parentNode.style.display = 'none';

  // close only the current details tab
  // let details = thisLink.currentTarget.parentNode.parentNode.nextSibling;
  // console.log(details);
  // console.log(details.style.display);

  // if (details.style.display === 'block') {
  //   details.style.display = 'none';
  // } else {
  //   details.style.display = 'block';
  // }

}


function handleIncomeToggle(evt:any) {
  console.log( evt.currentTarget );    // OK targets button?

  let imgSrc = evt.currentTarget.src;
  // console.log(imgSrc);

  let imgClassList = evt.currentTarget.classList;
  let otherTarget = evt.currentTarget.nextSibling;    // target other button

  let mainTx = evt.currentTarget.parentNode.parentNode.previousSibling;
  // console.log(evt.currentTarget.parentNode.parentNode.previousSibling);
  console.log(mainTx);    // should be the main tx data container

  // set container class for future summation
  let txContainer = mainTx.parentNode.parentNode;
  console.log(txContainer);
  // get ID of container -> should match the tx ID in the global
  let txContainerID = txContainer.id;
  console.log(txContainerID);

  let findBadge = searchTree(mainTx,"badge");
  console.log(findBadge);

  // console.log(cs.INCOME, cs.NOT);


  console.log("ALSO SET THE GLOBAL OBJECT DATA HERE WHEN CHANGING THE INCOME STATUS");




  // check for image in or ni
  if(imgSrc.includes("ni.png")){
    // currently it is not income

    // get prev sibling to target the income tab
    // console.log(evt.currentTarget.previousSibling);
    otherTarget = evt.currentTarget.previousSibling;    // override
  
  } else {
    // currently it is income

    // get next sibling to target the non-income tab (default)
    // console.log(evt.currentTarget.nextSibling);
  }

  // check for active or not & toggle the visual display on clicked element
  if(imgClassList.contains(cs.activeIncome)){
    // currently it is active
    imgClassList.remove(cs.activeIncome);
    otherTarget.classList.add(cs.activeIncome);


    findBadge.innerHTML = '<img class='+cs.inBadge+' src="./src/img/inBadge.png" alt="Income" />'+" Income | Received";

    txContainer.classList.remove(cs.NOT);
    txContainer.classList.add(cs.INCOME);

    //this not working for OP
    // console.log(txContainerID, globalTxs[txContainerID])

    globalTxs[txContainerID].incomeState = "INCOME";

  } else {
    // currently it is not active
    imgClassList.add(cs.activeIncome);
    otherTarget.classList.remove(cs.activeIncome);

    //set badge not income
    findBadge.innerHTML = "<img class='"+cs.niBadge+"' src='./src/img/close.png' alt='Income Off' /> NOT INCOME";
    
    // txContainer.classList.remove(cs.INCOME);
    txContainer.classList.add(cs.NOT);

    globalTxs[txContainerID].incomeState = "NOT";
    
  }


}

function getMonthOut(month:string) {
  let monthOut = "";

  switch(month) {
    case "Jan":
      monthOut = "January";
      break;
    case "Feb":
      monthOut = "February";
      break;
    case "Mar":
      monthOut = "March";
      break;
    case "Apr":
      monthOut = "April";
      break;
    case "May":
      monthOut = "May";
      break;
    case "Jun":
      monthOut = "June";
      break;
    case "Jul":
      monthOut = "July";
      break;
    case "Aug":
      monthOut = "August";
      break;
    case "Sep":
      monthOut = "September";
      break;
    case "Oct":
      monthOut = "October";
      break;
    case "Nov":
      monthOut = "November";
      break;
    case "Dec":
      monthOut = "December";
      break;
    default:
      monthOut = "January";
  }

  return monthOut;
}


async function alchemyGo(FIAT:string){

  console.log("FIAT: " + FIAT);

  // get address to use
  let walletAddress: string = "";

  let currentWallet = document.getElementById('walletInput');
  // let inVal = (<HTMLInputElement>currentWallet).value;
  if(currentWallet){

    const inVal = (document.getElementById('walletInput') as HTMLInputElement | null)?.value;

    console.log(inVal);

    if (inVal !==  walletAddress) {
      // override the wallet connect input with what is displaayed in the box
      walletAddress = inVal!;
    }
  }

  console.log(walletAddress);


  // Access standard Ethers.js JSON-RPC node request
  // alchemy.core.getBlockNumber().then(console.log);

  // Access Alchemy Enhanced API requests
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

  // console.log(res);

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

  console.log(opRes);

  // setup output object to DOM
  let output = document.getElementById("output");
  output?.classList.add(cs.output);

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
  console.log("-> Add polygon and OP transactions to the global object HERE.");
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

    let closeIcon = "<span class="+cs.closeIcon+"><img src='./src/img/close.png' alt='close' /></span>";    

    listRow += outBox;    // main tx output and more button to reveal detail
    // listRow += getTokenLogo(thisRow.asset);

    // detail view starts here
    listRow += "<div class="+cs.detail+"><strong><hr/>DETAIL VIEW:"+a+" tx</strong>"+ closeIcon;

    // skip this row for now?
    if(false){
      listRow += "<div class="+cs.row+">";
        listRow += "<div class="+cs.col+">";
          listRow += getTokenLogo(a) + getTokenLabel(a);
        listRow += "</div>";
      
      
      listRow += "<div class="+cs.col+">";
      listRow += "TokenAmt: <strong>" + thisRow.value +"</strong>" + "<br/>ConvertAmt: <strong>";
      listRow += await displayConvertAmount(thisRow.value, a, unixT, FIAT) +"</strong></div>";
      listRow += "</div>";

      listRow += clearBoth;
    }

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
      listRow += "<img src='./src/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  />";   // active income image

      // not used?
      listRow += "<img src='./src/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
    } else {
      // non-income display
      listRow += "<img src='./src/img/in.png' alt=income class="+cs.toggleButton+" />";   // income image
      listRow += "<img src='./src/img/ni.png' alt=notincome class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
    }

    listRow += "</div>";    // end of income toggle container

    listRow += "<a href='#' class='"+cs.buttonStyle+ " "+cs.saveBtn+"' title='save (auto) & hide detail view'>Save</a><hr />"
    
    listRow += "</div></div></li>";   // end of detail, flexView container & list item

    // add the matched row to the output list 
    if (output) {
      output!.innerHTML = output?.innerHTML + listRow;

    }

    globalIndex++;    // increment the global index

  }

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

      let closeIcon = "<span class="+cs.closeIcon+"><img src='./src/img/close.png' alt='close' /></span>";    

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
        listRow += "<img src='./src/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  />";   // active income image

        // not used?
        listRow += "<img src='./src/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
      } else {
        // non-income display
        listRow += "<img src='./src/img/in.png' alt=income class="+cs.toggleButton+" />";   // income image
        listRow += "<img src='./src/img/ni.png' alt=notincome class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
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

      let closeIcon = "<span class="+cs.closeIcon+"><img src='./src/img/close.png' alt='close' /></span>";    

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
        listRow += "<img src='./src/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  />";   // active income image

        // not used?
        listRow += "<img src='./src/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
      } else {
        // non-income display
        listRow += "<img src='./src/img/in.png' alt=income class="+cs.toggleButton+" />";   // income image
        listRow += "<img src='./src/img/ni.png' alt=notincome class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
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


  // end all alchemyGo function call
}

// triggers the alchemyGo() function
async function triggerTx(FIAT:string) {
  // console.log(FIAT);
  console.log("TX trigger call ");
  // let gt = GetTransactions({address:props});
  // console.log(gt);

  await alchemyGo(FIAT);    // re-run the txlist, confirm FIAT value

        // find all clickable elements and add event listener
        let clickable = document.getElementsByClassName(cs.clickable);
        // console.log(clickable);

        for (let i = 0; i < clickable.length; i++) {
          clickable[i].addEventListener("click", handleOpen);
        }

        // income toggle buttons
        let toggleButton = document.getElementsByClassName(cs.toggleButton);
        // console.log(toggleButton);

        for (let i = 0; i < toggleButton.length; i++) {
          toggleButton[i].addEventListener("click", handleIncomeToggle);
        }

        // save/close button
        let saveBtn = document.getElementsByClassName(cs.saveBtn);
        // console.log(saveBtn);

        for (let i = 0; i < saveBtn.length; i++) {
          saveBtn[i].addEventListener("click", handleSave);
        }

  // change the background image
  document.body.style.backgroundImage = "url('./src/img/bg2.jpg')";
}

/* Function cleanup TBD */

function callSetFiat(setFIAT:any) {
  // lookup state of DOM for select option (country code)
  let country = document.getElementsByClassName("fiatSelect");
  let fiatCode = (country[0] as HTMLSelectElement).value;

  console.log("Setting: " + fiatCode);

  // assign to state variable
  setFIAT(fiatCode);
}

function getProvinceSelect(FIAT:string) {

  if(FIAT === "CAD"){
    return (
      <div className={cs.inputBox}>
          <label>Where in Canada do you live?</label>
          <select>
            <option>Ontario</option>
            <option>British Columbia (BC)</option>
            <option>Other</option>
          </select>
        </div>
    );

  } else {
    return (
      <div className={cs.inputBox}>
        <label>Where in USA do you live?</label>
        <select>
          <option>California</option>
          <option>New York</option>
          <option>Florida</option>
          <option>Other</option>
        </select>
      </div>
    );
  }

}

function exportData() {

  let txSummary = document.getElementById("txSummary");
  console.log(txSummary);
  // txSummary as email body content

  /*

  <div>
    <h2>Thank you for using Bankless Card TaxMan!</h2>
    <p>Your detailed transactions are attached to this email as a CSV.  Be sure to download the CSV and save it in a safe place</p>

    <h3>Your 2022 DAO Income:</h3>
    <ul>
      <li>x BANK </li>
      <li>y POOL </li>
      <li>(add whatever else here)</li>
    </ul>

    <p><strong>For a total of: z CAD</strong></p>

    <p>TaxMan is a project by Bankless Card.</p>
  </div>

  */

  // export data to CSV
  console.log("export tx data to CSV");

  // let allTxData = document.getElementsByClassName(cs.tx);
  // console.log(allTxData);   // benefits here are easy access to calculated data OK here

  console.log(globalTxs);   // benefits here are easy access to tx data OK here



  // for each tx, we need to build a row of data
  //  -> if(income) timestamp, tokenLabel, tokenAmount, fiatConversion, fiatAmount 

  // first line is 'header'
  let csvData = "txID, timestamp, asset, tokenAmount, fiatRatio, fiatAmount, fiatLabel" + "\r\n";
  let fiatCode = "";
  
  if(globalTxs.length > 0){
    let newLine = "";
    
    [].forEach.call(globalTxs, function(el:any, index:any) {

      if(el.incomeState === "INCOME"){
        console.log(el);

        newLine = index + "," + el.unixT + "," + el.asset + "," + el.value + "," + el.convertAmount.split(" ")[3] + "," + el.convertAmount.split(" ")[1] + "," + el.convertAmount.split(" ")[0] + "\r\n";

        // only add to csvData if income
        csvData += newLine;
        fiatCode = el.convertAmount.split(" ")[0];  // get the fiat code from each

      }

      
    });
  }


  console.log(csvData);

  let totalBANK = document.getElementById("totalBANK");
  let totalWETH = document.getElementById("totalWETH");
  let totalDAI = document.getElementById("totalDAI");

  let total1INCH = document.getElementById("total1INCH");
  let totalANT = document.getElementById("totalANT");
  let totalMKR = document.getElementById("totalMKR");
  let totalPOKT = document.getElementById("totalPOKT");
  let totalPOOL = document.getElementById("totalPOOL");

  let totalIncome = document.getElementById("totalIncome");

  let taxRate = document.getElementById("taxRate") as HTMLInputElement;

  // last line of output should be summation of all income
  csvData += "SUM, timestamp, TaxRate, Total Income to Report, FiatCode" + "\r\n";
  csvData += "RUN@, "+ Date.now() + "," + taxRate?.value + ","+ totalIncome?.innerHTML + "," + fiatCode + "\r\n";


  let summaryData = "<div>\
    <h2>Thank you for using Bankless Card TaxMan!</h2>\
    <p>Your detailed transactions are attached to this email as a CSV.  Be sure to\ download the CSV and save it in a safe place</p>\
    \
    <h3>Your 2022 DAO Income:</h3>\
    <ul>\
      <li>"+totalBANK?.innerHTML+" BANK </li>";
  if(totalWETH) {
    summaryData += "<li>"+totalWETH?.innerHTML+" WETH </li>";
  }
  if(totalDAI) {
    summaryData += "<li>"+totalDAI?.innerHTML+" DAI </li>";
  }

  if(total1INCH) {
    summaryData += "<li>"+total1INCH?.innerHTML+" 1INCH </li>";
  }
  if(totalANT) {
    summaryData += "<li>"+totalANT?.innerHTML+" ANT </li>";
  }
  if(totalMKR) {
    summaryData += "<li>"+totalMKR?.innerHTML+" MKR </li>";
  }
  if(totalPOKT) {
    summaryData += "<li>"+totalPOKT?.innerHTML+" POKT </li>";
  }
  if(totalPOOL) {
    summaryData += "<li>"+totalPOOL?.innerHTML+" POOL </li>";
  }
  summaryData +=
      "</ul>\
    \
    <p><strong>For a total of: "+totalIncome?.innerHTML+" "+fiatCode+"</strong> at income tax rate of "+taxRate.value+"%.</p>\
    \
    <p>TaxMan is a project by Bankless Card.</p>\
  </div>";


  // csvData = "a,b,c\r\n1,2,x\r\n2,1,x\r\n3,5,y\r\n4,6,y\r\n";

  // "data:text/csv;charset=utf-8,a%2Cb%2Cc%0A1%2C2%2Cx%0A2%2C1%2Cx%0A3%2C5%2Cy%0A4%2C6%2Cy%0A";
  let encodeCsv = btoa(csvData);
  console.log(encodeCsv);

  // get user email from DOM
  let emailReceipt = (document.getElementById("mailSubmit") as HTMLInputElement)!.value;
  console.log(emailReceipt);

  if(emailReceipt !== ""){

    alert("Email send -> pending. Please wait for next dialog confirmation before closing app.");
    // build and send email with txSummary as body, csv as attachment
    Email.send({
      // Host: "smtp.elasticemail.com",
      // Username: "tom@tomtranmer.com",
      // Password: .env.ELASTIC_EMAIL_PASSWORD,
      SecureToken: ELASTICMAIL_SECURETOKEN,
      To: [emailReceipt, "help@justplay.cafe"],
      From: "taxman@justplay.cafe",
      Subject: "BanklessCard TaxMan Transaction Summary",
      Body: summaryData,
      Attachments: [
        { 
          name: "TaxManSummary2022-"+emailReceipt+".csv", 
          // path: "./data/csvSample.csv",    // this is the file path
          data: encodeCsv,                    // this is the encoded file data
          contentType: "text/csv"
        }
      ]
    })
    .then(function (message:any) {
      console.log(message);
      if(message === "OK"){
        alert("Email sent successfully. Thanks for using Bankless Card TaxMan! You're free to go check your mail.");
      } else {
        alert("mail failed to send with message: " + message);
      }
    });
  } else {
    alert("Please enter your email address");
  }



}

// determine/track the selected DAOs
let daoSel = {
  "WETH": false,
  "DAI": false,
  "BANK": true,
  "INCH": true,
  "ANT": true,
  "MKR": true,
  "POKT": true,
  "POOL": true,
}

import logoUrl from './img/bc_logo.png'

export function App() {
  // this to get connected accouunt info from WalletConnect
  const { address, isConnected } = useAccount();
  // console.log(address);

  //kickoff alchemyGo function -> this will run the alchemy API call
  // const myFunc = alchemyGo();

  // save state to track dao selection
  // const [daoState, setDaoState] = useState({})

  // const [count, setCount] = useState(0);

  // default true on token states to show all
  // example with BANK token
  // const [BANK, setBANK] = useState(true);
  // const [POOL, setPOOL] = useState(true);

  // const WETH = false;
  // daoSel.WETH = true;

  const [FIAT, setFIAT] = useState('CAD');    // default cad, later probably usd

  // console.log(FIAT);

  return (
    <>
    <div className={cs.AppContainer}>
      <header>
        <img className={cs.headerLogo} src={logoUrl} alt="BanklessCard Logo" /> 
        <ul className={cs.headerLinks}>
          <li><a href="https://banklesscard.xyz">About Us</a></li>
          <li className={cs.wcBtn}><Web3Button /></li>
        </ul>
      </header>
      <div id="HomeSplash" className={cs.home}>

        <h1 className={cs.mainTitle}>TAXMAN</h1>
        <h3 className={cs.subTitle}>DAO Income <br/> Tax Helper</h3>
        <div className={cs.clear}></div>

        <div className={cs.columnWide}>
          <div className={cs.landingPageBenefits}>
            <p>Taxman is a quick and easy tool to help you calculate your DAO income taxes.</p>

            <ul>
              <li><strong>FAST</strong> - you can finish your DAO income taxes in 5 minutes</li>
              <li><strong>FREE</strong> - No credit card or crypto payment required</li>
              <li><strong>BUILT FOR DAO CONTRIBUTORS</strong> - we automatically filter out any transactions that aren't DAO income</li>
            </ul>

          </div>
        </div>
        
      
        <div className={cs.columnWide}>
          <div className={cs.bigButton}>
            <h2>
              <a href="#info"> 
                <img src="./src/img/click-arrow.png" alt="click-arrow" />
                &nbsp;Click here to start
              </a>
            </h2>
          </div>
        </div>
      </div>    {/* <!-- end of HomeSplash --> */}
      <div className={cs.clear}></div>
      <div id="AppContent" className={cs.container}>
      
        {/* <header>
          
          <h1>BCard TaxMan</h1>

          <Web3Button />
        </header> */}
        {/* example of class component - can be set to update live with tick() */}
        

        {/* <div className={cs.page}>
        <a id="first"></a> */}
          {/* <h2 className={cs.red}>DAO Income Tax Helper</h2>

          <img src="https://via.placeholder.com/500x350?text=Hero+Image" alt="" className={cs.scaleWidth} /> */}

          {/* <div className={cs.buttonContainer} >
            <Btn name="Calculate your tax now (it's free)" url="#info" />
          </div> */}

          {/* <aside className={cs.buttonContainer}>
            <a 
              href="#info"
              className={cs.btn} 
              // onClick={() => triggerTx(address)}
            >Calculate your tax now (it's free)</a>
          </aside>

          <hr /> */}
        
        {/* </div> */}

        <div className={cs.page}>
          {/*<!-- sample page for initial info collect -->*/}
          <a id="info"></a>
          <h2 className={cs.label}>Let's start with some questions!</h2>

          <div className={cs.inputBox}>
            <label>What is your ETH address?</label>
            <input type="text" placeholder="Enter your ETH address." defaultValue={address} id='walletInput' />
          </div>

          <div className={cs.inputBox}>
            <label>Select your country of residence</label>
            <select 
              className='fiatSelect'
              onChange={() => callSetFiat(setFIAT)}
            >
              <option value='CAD'>Canada (CAD)</option>
              <option value='USD'>United States (USA)</option>
              <option disabled>Other</option>
            </select>
          </div>

          {/*getProvinceSelect(FIAT)*/}

          {/* <div className={cs.inputBox}>
            <label>Where in {FIAT==="CAD" ? "Canada" : "USA"} do you live?</label>
            <select>
              <option>Ontario</option>
              <option>British Columbia (BC)</option>
              <option>Other</option>
            </select>
          </div> */}

          {/* <Btn name="Next Step" onClick={triggerTx} /> */}

          <aside className={cs.buttonContainer}>
            <a 
              href="#dao-page"
              className={cs.btn} 
              onClick={() => callSetFiat(setFIAT)}
            >Next Step</a>
          </aside>

          <hr />

        </div>

        <div id="dao-select" className={cs.page}>

          <a id="dao-page"></a>
          <h2 className={cs.label}>Which DAOs are you a part of?</h2>
          <DaoSelectors name="BanklessDAO" token="BANK" tokenState={daoSel.BANK} />
          
          <DaoSelectors name="1Inch" token="1INCH" tokenState={daoSel.INCH} />
          <DaoSelectors name="Aragon" token="ANT" tokenState={daoSel.ANT} />
          <DaoSelectors name="Maker DAO" token="MKR" tokenState={daoSel.MKR} />
          <DaoSelectors name="Pocket DAO" token="POKT" tokenState={daoSel.POKT} />
          <DaoSelectors name="Pool Together" token="POOL" tokenState={daoSel.POOL} />

          <hr />

          <DaoSelectors name="Wrapped ETH" token="WETH" tokenState={daoSel.WETH} />
          <DaoSelectors name="DAI Stable" token="DAI" tokenState={daoSel.DAI} />
          {/* <Btn name="Next Step" url="#tx-page" /> */}

          <aside className={cs.buttonContainer}>
            <a 
              href="#tx-page"
              className={cs.btn} 
              onClick={() => triggerTx(FIAT)}
            >Next Step</a>
          </aside>

          <p>If your DAO doesnt appear here. You can tweet @us: <a href="https://twitter.com/BanklessCard"  target="_blank">twitter.com/BanklessCard</a></p>

          <hr />

        </div>

        <div id="tx-list" className={cs.page}>

          <a id="tx-page"></a>

          
          

          <h2 className={cs.label}>We've automatically classified your transactions</h2>

          <h3 className={cs.center}>Verify that each one is correct.</h3>

          {/* if the connection is set, this loads in the account info (ad) from Wallet Connect*/}
          {isConnected && <Account />}

          {/* {isConnected && <AlchemyGo address={address} />} */}

          <aside className={cs.buttonContainer}>
            <a 
              href="#finish"
              className={cs.btn} 
              onClick={() => finishButton(FIAT)}
            >Finish</a>
          </aside>

          <div id="txSummary" className={cs.txSummary}></div>

          <aside className={cs.buttonContainer}>
            <button 
              id={cs.exportBtn}
              className={cs.exportBtn} 
              onClick={() => exportData()}
            >Send to my email!</button>
          </aside>

        </div>

        <h2>Dev testing buttons</h2>

        <p><a 
            href="#"
            className={cs.btnW + " " + cs.btn} 
            onClick={(e) => toggleAlts(e)}
          >Show all &amp; Hide all DAO</a>
          </p>
          <p>
          <a 
            href="#"
            className={cs.btnW + " " + cs.btn} 
            onClick={(e) => toggleDetail(e)}
          >show/hide all tx details</a>
        </p>

        <hr />
        <hr />
        {/* example of functional component - will display based on input props */}

        <Web3Button />

        {/* <Card title="Card Title" paragraph="This is paragraph data for sample card." />

        <SampleFunc here="here" /> */}


      
      </div>
      <div className='footerCont'>
        <footer>
          <div>Made with &#x2764; by Bankless Card</div>
          <ul className='socials'>
            <li><a href="https://www.instagram.com/bankless_card/" target="_blank"><img src="./src/img/insta.png" alt="Instagram" /></a></li>
            <li><a href="https://twitter.com/BanklessCard" target="_blank"><img src="./src/img/tw.png" alt="Twitter" /></a></li>
          </ul>
          <div>&copy; 2023 Bankless Card | All rights reserved</div>
        </footer>
      </div>
    </div> {/* #AppContainer */}
    </>
  )
}
