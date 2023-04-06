import React, { useState, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormFirstStep from "./FormFirstStep/FormFirstStep";
import FormSecondStep from "./FormSecondStep/FormSecondStep";
import FormThirdStep from "./FormThirdStep/FormThirdStep";
import FormFourthStep from "./FormFouthStep/FormFouthStep";
import FormButton from "./FormButton";
import styles from "./styles.module.css";
import { useUI } from "../../context/UIContext";
import StepsButtons from "./StepsButtons";
import TransactionModal from "./TransactionModal/TransactionModal";
import TransactionModalMobile from "./TransactionModal/TransactionModalMobile";

// tt added

import { getTokenLogo } from "../../functions";
import { getTokenLabel } from "../../functions";
import { displayTokenAmount } from "../../functions";
import { displayConvertAmount } from "../../functions";

import { useAccount } from 'wagmi';   // for connected account

import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';

// data imports
import { REACT_APP_ALCHEMY_API_KEY, ELASTICMAIL_SECURETOKEN } from '../../data/env.tsx' 

// const REACT_APP_ALCHEMY_API_KEY = "szbJviwD1JXcAcbDNY0Mk7qn6uql-sN9";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
// const settings = {
//   apiKey: REACT_APP_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
//   network: Network.ETH_MAINNET, // Replace with your network.
// };

// const alchemy = new Alchemy(settings);
// const polygon = new Alchemy({ apiKey: REACT_APP_ALCHEMY_API_KEY, network: Network.MATIC_MAINNET });
// const optimism = new Alchemy({ apiKey: REACT_APP_ALCHEMY_API_KEY, network: Network.OPT_MAINNET });

// async function callAlchemyGo(address, addrOverride) {

//   console.log(address);
//   console.log(addrOverride);
  
//   // get address to use
//   let walletAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";   // vitalik.eth
//   if(addrOverride){
//     console.log("Using inserted wallet address. " + addrOverride);
//     walletAddress = addrOverride;
//   } else if(address){
//     console.log("Using connected wallet adddress. - " + address);
//     walletAddress = address;
//   } else  {
//     console.log("NO wallet address - check defaults.");
//   }



  

//   // console.log(address);

//   // let daoSel = {
//   //   "WETH": true,
//   //   "DAI": true,
//   //   "BANK": true,
//   //   "INCH": true,
//   //   "ANT": true,
//   //   "MKR": true,
//   //   "POKT": true,
//   //   "POOL": true,
//   // }

//   // testing for all chains - OK
//   // alchemy.core.getTokenBalances(walletAddress).then(console.log);
//   // polygon.core.getTokenBalances(walletAddress).then(console.log);
//   // optimism.core.getTokenBalances(walletAddress).then(console.log);

//   const toAddress = walletAddress;    // for connected or inserted wallet address
  
//     // estimated starting eth block for 2022
//     // https://etherscan.io/block/13916169
  
//   const blockNumInt = 13916169;   //for 2022 eth mainnet START - hc
//   const startBlock = "0x" + blockNumInt.toString(16);   // format for 0x + hex

//   const endBlockNumInt = 16308155;   //for 2022 eth mainnet END - hc
//   const endBlock = "0x" + endBlockNumInt.toString(16);
  
//   const polyStartInt = 23231793;    // for 2022 polygon mainnet START - hc
//   const polyStart = "0x"+ polyStartInt.toString(16); //f0efd5";
//   const polyEndInt = 37466741;    // for 2022 polygon mainnet END - hc
//   const polyEnd = "0x" + polyEndInt.toString(16);

//   const opStartInt = 0;    // for 2022 optimism mainnet START - hc
//   const opStart = "0x"+ opStartInt.toString(16); //f0efd5";
//   const opEndInt = 58351868;    // for 2022 optimism mainnet END - hc
//   const opEnd = "0x" + opEndInt.toString(16);
  
//   // MAINNET
//   const res = await alchemy.core.getAssetTransfers({
//     fromBlock: startBlock,
//     toBlock: endBlock,
//     toAddress: toAddress,
//     excludeZeroValue: true,
//     withMetadata: true,
//     // order: "desc",       // default asc for ascending
//     category: [ AssetTransfersCategory.ERC20],
//   });
  
//     // AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155,
  
//     // POLYGON
//     const polyRes = await polygon.core.getAssetTransfers({
//       fromBlock: polyStart,
//       toBlock: polyEnd,
//       toAddress: toAddress,
//       excludeZeroValue: true,
//       withMetadata: true,
//       category: [ AssetTransfersCategory.ERC20 ],
//     });
  
//     // OPTIMISM  
//     const opRes = await optimism.core.getAssetTransfers({
//       fromBlock: opStart,
//       toBlock: opEnd,
//       toAddress: toAddress,
//       excludeZeroValue: true,
//       withMetadata: true,
//       // order: "desc",       // default asc for ascending
//       category: [ AssetTransfersCategory.ERC20 ],
//     });
  
//     // console.log(res);

//   /* parse data retrieved to include reference:

//   id: 1,    // ok
//   avatar_url: "./img/dao.jpg",    // can be retrieved via function
//   userName: "Bankless DAO",       // same from asset
//   crypto: "20000 BANKS",          // same from value
//   currency: "$48.77 CAD",         // needs conversion and depends on currency

//   */

//   let objArr = res.transfers;
//   let polyArr = polyRes.transfers;
//   let opArr = opRes.transfers;

//   for (var i=0; i<objArr.length; i++) {
  
//     let thisRow = objArr[i];

//     let t = thisRow.metadata.blockTimestamp;    // date from tx record
//     let tNice = new Date(t);
//     let unixT = Date.parse(t)/1000

//     // Income Label - Toggle SWITCH
    
//     let incomeState = false;
//     // console.log("add other assets here to autoflag as income");

//     let activeAssets = ["BANK", "WETH", "DAI" ];

//     // BANK is always income
//     // console.log(daoSel["BANK"]);
//     if(activeAssets.includes(thisRow.asset)){
//       incomeState = true;
//     }

//     // save to globalTxs
//     objArr[i].unixT = unixT;   // add unix timestamp to global object
//     thisRow.currency = displayConvertAmount(thisRow.value, thisRow.asset, unixT, "CAD");
//     thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
//     thisRow.tokenLabel = getTokenLabel(thisRow.asset);
//     thisRow.incomeState = incomeState;    // "NOT" for unmatched txs by default
//     thisRow.crypto = displayTokenAmount(thisRow.value,thisRow.asset);

//   }  

//   for (var i=0; i<polyArr.length; i++) {
  
//     let thisRow = polyArr[i];

//     let t = thisRow.metadata.blockTimestamp;    // date from tx record
//     let tNice = new Date(t);
//     let unixT = Date.parse(t)/1000  

//     let incomeState = "NOT";

//     /** LIMIT FILTER */
//     let assets = ["BANK", "WETH", "DAI", "1INCH", "ANT", "MKR", "POKT", "POOL"];

//     let asset = thisRow.asset || "";
//     if(assets.includes(asset)){

//       // let incomeBadge = toggleSwitch(incomeState); // 'Income Label - Toggle SWITCH';
  
//       // let tokenLogo = getTokenLogo(thisRow.asset);   // token logo - '+thisRow.asset+'
//       // let tokenLabel = getTokenLabel(thisRow.asset);   // token label - '+thisRow.asset+'
//       // let tokenAmount = displayTokenAmount(thisRow.value,thisRow.asset);   // token amount - '+thisRow.value+'
//       let convertAmount = displayConvertAmount(thisRow.value, thisRow.asset, unixT, "CAD")// "USD/FIAT value @ timefrom blockNum";   // USD/FIAT value @ timefrom blockNum
  
//       // console.log(convertAmount);
  
//       let priceParts = convertAmount.split(" ");
//       let convertOut = priceParts[0] + " " + priceParts[1];
//       let convertRatio = priceParts[2] + " " + priceParts[3] + " " + thisRow.asset + "/" + "CAD";
  
//       // htmlhelpers
//       let clearBoth = "<div style=clear:both></div>";
  
//       // console.log(asset, globalIndex);    // this index is not getting high enough
//       // console.log(globalTxs[globalIndex]);
//       // console.log(globalTxs);

//       thisRow.currency = displayConvertAmount(thisRow.value, thisRow.asset, unixT, "CAD");
//       thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
//       thisRow.tokenLabel = getTokenLabel(thisRow.asset);

//       thisRow.crypto = displayTokenAmount(thisRow.value,thisRow.asset);
  
//       // let j = i + objArr.length;   // offset for mainnet txs
//       // if(globalTxs[globalIndex].asset === asset) {
//       //     // save to globalTxs (after mainnet txs)
//       //     globalTxs[globalIndex].unixT = unixT;   // add unix timestamp to global object
//       //     globalTxs[globalIndex].incomeState = incomeState;   // add income state to global object
//       //     globalTxs[globalIndex].incomeBadge = incomeBadge;   // add income state to global object
//       //     globalTxs[globalIndex].tokenLogo = tokenLogo;   // add income state to global object
//       //     globalTxs[globalIndex].tokenLabel = tokenLabel;   // add income state to global object
//       //     globalTxs[globalIndex].tokenAmount = tokenAmount;   // add income state to global object
//       //     globalTxs[globalIndex].convertAmount = convertAmount;   // add income state to global object
//       // }

//     }
    


//     // let outBox = '<div class=' + cs.flexCont + '>\
//     //     <div class="'+cs.row+" "+cs.even+'">\
//     //     <div class='+cs.col+'>\
//     //         <div class='+cs.row+'>\
//     //         <span class='+cs.tokenLabel+'>'+tokenLabel+'</span>\
//     //         </div>\
//     //         <div class="'+cs.row+" "+cs.incBadge+'" title="badge">\
//     //         '+incomeBadge+' \
//     //         </div>\
//     //     </div>\
//     //     <div class="'+cs.col+" "+cs.logoClick+'">\
//     //         <button class="'+cs.clickable+'">\
//     //         '+ tokenLogo + ' \
//     //         </button>\
//     //     </div>\
//     //     <div class='+cs.col+'>\
//     //         <div class="'+cs.row+" "+cs.end+'">\
//     //         <span class='+cs.tokenAmount+'>'+tokenAmount+'</span>\
//     //         </div>\
//     //         <div class="'+cs.row+" "+cs.end+'">\
//     //         <span class='+cs.convertAmount+'>'+convertOut+'</span>\
//     //         </div>\
//     //     </div>\
//     //     </div>';



//     // asset is the token symbol
//     // a defines the show/hide condition of the div
//     // let a = thisRow.asset;

//     // let listRow = "";    //init

//     // /** THIS IS THE MONTH HEADER SELECTOR HERE */

//     // // insert date header here - conditional on month change
//     // let dString = tNice.toDateString();
//     // let dStringArr = dString.split(" ");
//     // let dStringMonth = dStringArr[1];
//     // let dStringYear = dStringArr[3];

//     // if(dStringMonth !== curMonth){
//     //     curMonth = dStringMonth;
//     //     // console.log("Month Change - trigger new header (on first shown element)");

//     //     // console.log("index: ",i , dStringMonth, curMonth);

//     //     // skip if element is not shown and defer to next in index

//     //     dateHeader = "<div class="+cs.dateHeader+">"+getMonthOut(curMonth)+" "+dStringYear+"</div>";

//     //     if(incomeState === "NOT") {
//     //     // its not shown so we need to defer the display until one that is shown
//     //     deferHeader = true;   // thihs will trigger display of header later
//     //     } else {
//     //     deferHeader = false;
        

//     //     // output here IF monthh change && is income
//     //     listRow += dateHeader;    // add the header before the containeer element.

//     //     }

        
//     // }

//     // if(deferHeader){
//     //     // then we need to call the header display here
//     //     if(incomeState === "INCOME"){
//     //     // only on income, so we may miss months if no income recorded.

//     //     listRow += dateHeader;    // add the header before the containeer element.

//     //     deferHeader = false;    // reset the flag

//     //     }
//     // }

//     /** Start of tx container li element **/
//     // include the date/time in local format, as title of the list item
//     // listRow += "<li id="+i+" title='"+tNice+"' class='"+cs.tx + " " + a + " " + cs[incomeState] + "'>";

//     // let closeIcon = "<span class="+cs.closeIcon+"><img src='/img/close.png' alt='close' /></span>";    

//     // listRow += outBox;    // main tx output and more button to reveal detail
//     // // listRow += getTokenLogo(thisRow.asset);


//     // let dayClean = tNice.toDateString();
//     // let timeClean = tNice.toLocaleTimeString();     // use users local time to display :)
//     // let dayArr = dayClean.split(" ");
//     // let dayOut = getMonthOut(dayArr[1]) + " " + dayArr[2] + ", " + dayArr[3] + " | " + timeClean;

//     // let copyLink = "<a class="+cs.copyLink+" onclick=alert('"+thisRow.from+"')>[]</a>";

//     // // detail view starts here
//     // listRow += "<div class="+cs.detail+"><strong><hr/>DETAIL VIEW:"+a+" tx</strong>"+ closeIcon;

//     // listRow += "<div class="+cs.dayOut+">" + dayOut + "<br><span class="+cs.convertAmount+">Converted "+convertRatio+"</span></div>";

//     // listRow += "<a target='_blank' class="+cs.buttonStyle+" href=https://etherscan.io/tx/"+thisRow.hash+">View TX on Etherscan</a>";

//     // listRow += "<div class="+cs.fromAddr+"><strong>From:</strong> <br/>"+thisRow.from+copyLink+"</div>";

//     // listRow += clearBoth+"<a href=https://etherscan.io/address/"+thisRow.from+" target=_blank class="+cs.buttonStyle+">View Sender</a>" + clearBoth;

//     // listRow += "<div class="+cs.incomeToggleContainer+">";     // income toggle container

//     // // default view for BANK token is income
//     // if(incomeState === "INCOME"){
//     //     listRow += "<img src='/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  />";   // active income image

//     //     // not used?
//     //     listRow += "<img src='/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
//     // } else {
//     //     // non-income display
//     //     listRow += "<img src='/img/in.png' alt=income class="+cs.toggleButton+" />";   // income image
//     //     listRow += "<img src='/img/ni.png' alt=notincome class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
//     // }

//     // listRow += "</div>";    // end of income toggle container

//     // listRow += "<a href='#' class='"+cs.buttonStyle+ " "+cs.saveBtn+"' title='save (auto) & hide detail view'>Save</a><hr />"
    
//     // listRow += "</div></div></li>";   // end of detail, flexView container & list item

//     // // add the matched row to the output list 
//     // if (output) {
//     //     output!.innerHTML = output?.innerHTML + listRow;

//     // }

//     // globalIndex++;    // increment the global index


//     // } else{
//     // // skip non-matches - do not add to the list
//     // // still increment the counter
//     // globalIndex++;
//     // }


    

//   }   // end for all polygon transactions

//   for (var i=0; i<opArr.length; i++) {
  
//     let thisRow = opArr[i];

//     let t = thisRow.metadata.blockTimestamp;    // date from tx record
//     let tNice = new Date(t);
//     let unixT = Date.parse(t)/1000

//     // Income Label - Toggle SWITCH
    
//     let incomeState = "NOT";
//     // console.log("add other assets here to autoflag as income");

//     // BANK is always income
//     // console.log(daoSel["BANK"]);
//     if(thisRow.asset === "BANK"){
//       incomeState = "INCOME";
//     }

//     // save to globalTxs
//     thisRow.unixT = unixT;   // add unix timestamp to global object
//     thisRow.currency = displayConvertAmount(thisRow.value, thisRow.asset, unixT, "CAD");
//     thisRow.img_url = getTokenLogo(thisRow.asset);      //"./img/dao.jpg";
//     thisRow.tokenLabel = getTokenLabel(thisRow.asset);

//     thisRow.crypto = displayTokenAmount(thisRow.value,thisRow.asset);

//   }

//     // adjust all txs to fit the format
//     let fullObjArr = {
//       id: 1,
//       title: "Ethereum Mainnet",
//       transactions: objArr,
//     }

//     let fullPolyArr = {
//       id: 2,
//       title: "Polygon Transactions",
//       transactions: polyArr
//     }

//     let fullOpArr = {
//       id: 3,
//       title: "Optimism Transactions",
//       transactions: opArr
//     }

//     const alTxs = [
//       fullObjArr,
//       fullPolyArr,
//       fullOpArr,
//     ];
//     // console.log(alTxs);

//     // return it

//   return alTxs;
// }

const AccountForm = () => {
  const [screenSize, setScreenSize] = useState("");
  // This hook is to get the screen size and its used because  its the best way I foun to render the modal on mobile devices
  useLayoutEffect(() => {
    function updateScreenSize() {
      if (window.innerWidth < 768) {
        setScreenSize("small");
      } else {
        setScreenSize("large");
      }
    }

    updateScreenSize(); // Actualiza el estado inicialmente

    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const [{ isCTAclicked, showTransactionModal }] = useUI();
  const [step, setStep] = useState(1);

  const [addrOverride, setAddrOverride] = useState("");
  const [txData, setTxData] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    // this obsoleted on index load - triggered on arrival at step 2
    async function fetchData() {

      console.log(address);
      console.log(addrOverride);

      let walletAddress = address;    // this will be 'undefined' if not connected

      if(addrOverride){
        console.log("Using inserted wallet address.");
        walletAddress = addrOverride;
      } else if(typeof address === 'undefined') {
        // set default address to use
        console.log("Using default wallet address.");
        walletAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";   // vitalik
      }

      const txDataTemp = await callAlchemyGo(walletAddress, addrOverride);

      // read and parse data first:
      setTxData(txDataTemp);
      // setLoading(false);
      console.log(txDataTemp);

    }
    //fetchData();
  }, []);

  const classForTransactionModal = showTransactionModal
    ? styles.form_container_with_modal
    : styles.form_container;

  return (
    <AnimatePresence>
      {isCTAclicked && (
        <>
          {screenSize === "small" && showTransactionModal ? (
            <TransactionModalMobile activeItem={activeItem} />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              exit={{ opacity: 0 }}
              className={classForTransactionModal}
            >
              <form style={{ height: "100%" }} title={addrOverride} >
                <div className={styles.form_inner_container}>
                  <StepsButtons currentStep={step} stepChange={setStep} />
                  <div style={{ flex: "1" }}>
                    {step === 1 && <FormFirstStep currentStep={step} setAddrOverride={setAddrOverride} />}
                    {step === 2 && <FormSecondStep currentStep={step} />}
                    {step === 3 && <FormThirdStep currentStep={step} txData={txData} setActiveItem={setActiveItem} />}
                    {step === 4 && <FormFourthStep txData={txData} />}
                  </div>
                  <FormButton currentStep={step} stepChange={setStep} addrOverride={addrOverride} txData={txData} setTxData={setTxData} />
                </div>
              </form>
              {/* <div id="output"></div> */}
              {showTransactionModal && screenSize === "large" && (
                <TransactionModal activeItem={activeItem} />
              )}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountForm;
