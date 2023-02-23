import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'

import { createElement, useState } from 'react'

import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';


// components from library
import { Account } from './components'
import { Card } from './components'
import { Clock } from './components'
import { Btn } from './components'

import { DaoSelectors } from './components';

// data from library
import { bankFeed } from './data'   // import pricefeed Data

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


// get api key from .env
const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
const apiHC = "szbJviwD1JXcAcbDNY0Mk7qn6uql-sN9";

console.log(import.meta.env.VITE_SOME_KEY) // 123
console.log(apiKey)

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: apiHC, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);



// import './style.module.css'
// Sample of dynamically applied CSS
import cs from './style.module.css'


async function alchemyGo(){

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


  const toAddress = walletAddress;    // for connected or inserted wallet address

  // estimated starting eth block for 2022
  // https://etherscan.io/block/13916169

  const blockNumInt = 13916169;   //for 2022 eth mainnet START - hc
  const startBlock = "0x" + blockNumInt.toString(16);   // format for 0x + hex

  const endBlockNumInt = 16308155;   //for 2022 eth mainnet END - hc
  const endBlock = "0x" + endBlockNumInt.toString(16);

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

  // setup output object to DOM
  let output = document.getElementById("output");
  output?.classList.add(cs.output);

  let objArr = res.transfers;   //this is the transaction list data object
  if(output){
    output!.innerHTML = "";   // clear to start
    console.log("output cleared");
  }

    // for each of the transactions
  for (var i=0; i<objArr.length; i++) {
    // console.log(i, objArr[i] );
    let thisRow = objArr[i];
    // console.log(thisRow.hash, thisRow.from, thisRow.nonce, thisRow.gas, thisRow.gasUsed, thisRow.gasPrice);

    let t = thisRow.metadata.blockTimestamp;    // date from tx record
    let tNice = new Date(t);
    // console.log(tNice);


    var unixT = Date.parse(t)/1000
    // console.log(unixT);

    //output elements

    // token label -> thisRow.asset
    // token amount -> thisRow.value

    // date/time -> from blockNum?

    // calculated elements

    // USD/FIAT value @ timefrom blockNum

    // Income Label - Toggle SWITCH
    
    let incomeState = "NOT";
    if(thisRow.asset === "BANK"){
      incomeState = "INCOME";
    }

    let incomeBadge = toggleSwitch(incomeState); // 'Income Label - Toggle SWITCH';
    let tokenLogo = getTokenLogo(thisRow.asset);   // token logo - '+thisRow.asset+'



    let tokenLabel = getTokenLabel(thisRow.asset);   // token label - '+thisRow.asset+'
    let tokenAmount = displayTokenAmount(thisRow.value,thisRow.asset);   // token amount - '+thisRow.value+'
    let convertAmount = await displayConvertAmount(thisRow.value, thisRow.asset, unixT)// "USD/FIAT value @ timefrom blockNum";   // USD/FIAT value @ timefrom blockNum

    let outBox = '<div class=' + cs.flexCont + '>\
      <div class="'+cs.row+" "+cs.even+'">\
        <div class="'+cs.col+" "+cs.logoClick+'">\
          '+ tokenLogo + ' \
        </div>\
        <div class='+cs.col+'>\
          <div class='+cs.row+'>\
            <span>'+tokenLabel+'</span>\
          </div>\
          <div class='+cs.row+'>\
            '+incomeBadge+' Income | Received\
          </div>\
        </div>\
        <div class='+cs.col+'>\
          <div class="'+cs.row+" "+cs.end+'">\
            <span class='+cs.tokenAmount+'>'+tokenAmount+'</span>\
          </div>\
          <div class="'+cs.row+" "+cs.end+'">\
            <span class='+cs.convertAmount+'>'+convertAmount+'</span>\
          </div>\
        </div>\
      </div>';


    // enable token logo for clickable -> show details
    // console.log("Enable Show Details for Next onClick");
    // outBox.find(cs.tokenClick).addEventListener("click", showDetails);      
    // let outElem = document.createElement('div');
    // outElem.innerHTML = outBox;

    // console.log(outElem);

            // </div>\

            // try to have flexcont also contain the detail view

    
    // let moreMsg = console.log("more button has been clicked");

    // more needs to target the detail div
    let moreBtn = "<h3><a href='#' title='show/hide detail view'>MORE</a></h3>";

    // override
    moreBtn = "<hr />";

    // asset is the token symbol
    // a defines the show/hide condition of the div
    let a = thisRow.asset;

    // include the date/time in local format, as title of the list item
    let listRow = "<li title='"+tNice+"' class='"+cs.tx + " " + a + " " + cs[incomeState] + "'>";
    listRow += outBox;    // main tx output and more button to reveal detail
    // listRow += getTokenLogo(thisRow.asset);

    listRow += "<div class="+cs.detail+"><strong><hr/>DETAIL VIEW:"+a+" tx</strong><span style=float:right>X</span><br />";
    listRow += "<div class="+cs.row+">";
      listRow += "<div class="+cs.col+">";
        listRow += getTokenLogo(a) + getTokenLabel(a);
      listRow += "</div>";
    
    
    listRow += "<div class="+cs.col+">";
    listRow += "TokenAmt: <strong>" + thisRow.value +"</strong>" + "<br/>ConvertAmt: <strong>";
    listRow += await displayConvertAmount(thisRow.value, a, unixT) +"</strong></div>";

    listRow += "</div>";

    // fetch trasaction detail based on tx hash
    /*
    let tx = "0x5da2844afb6826d4baed6ad7e8b536c00cbc921ac147773ad056f29f2e7c1762"
    web3.eth.getTransaction(tx).blockNumber
      1920050
    web3.eth.getBlock(1920050).timestamp
    */
    
    // let thisTimestamp = web3.eth.getBlock(1920050).timestamp;

    // "<br/>DATE/TIME AS CAPTURED FROM BLOCKnum: "+thisRow.blockNum+" or TXhash: "+thisRow.hash+

    let clearBoth = "<div style=clear:both></div>";

    listRow += "<div class="+cs.left+">"+tNice + "</div> "+clearBoth+"<a target='_blank' class="+cs.buttonStyle+" href=https://etherscan.io/tx/"+thisRow.hash+">View TX on Etherscan</a> <br /><div class="+cs.left+">From address: <br/>"+thisRow.from+"</div>"+clearBoth+"<a href=https://etherscan.io/address/"+thisRow.from+" target=_blank class="+cs.buttonStyle+">View Sender</a>" + clearBoth;

    // default view for BANK token is income
    if(a === "BANK"){
      listRow += "<a onClick=handleClick(e)><img src='./src/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  /></a>";   // active income image

      listRow += "<img src='./src/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
    } else {
      // non-income display
      listRow += "<a onClick=handleClick(e)><img src='./src/img/in.png' alt=income width=50 height=50 class="+cs.toggleButton+" /></a>";   // income image
      listRow += "<img src='./src/img/ni.png' alt=income width=60 height=40 class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
    }

    

    listRow += "<br /><a href='#' class="+cs.buttonStyle+" title='revert & hide detail view'>Cancel</a>";
    listRow += "<a href='#' class="+cs.buttonStyle+" title='save (auto) & hide detail view'>Save</a>"
    
    listRow += "</div></div></li>";   // end of detail, flexView container & list item

        // should log to console the block detail
        // getBlock(thisRow.blockNumber);

    if (output) {
      output!.innerHTML = output?.innerHTML + listRow;
      // output!.innerHTML = outElem + output?.innerHTML;
    }

    // using blockHash -> generate URL link to etherscan
    //  -> pull tx data from block with hash
  }


  // Access the Alchemy NFT API
   // alchemy.nft.getNftsForOwner('vitalik.eth').then(console.log);

  // Access WebSockets and Alchemy-specific WS methods
  // alchemy.ws.on(
  //   {
  //     method: 'alchemy_pendingTransactions'
  //   },
  //   res => console.log(res)
  // );
}
// triggers the alchemyGo() function
function triggerTx(props:any) {
  console.log(props);
  console.log("TX trigger call ");
  // let gt = GetTransactions({address:props});
  // console.log(gt);

  alchemyGo();    // re-run the txlist

  // change the background image
  document.body.style.backgroundImage = "url('./src/img/bg2.jpg')";
}

// type GreetFunction = (asset: string) => Array;

// called by the triggerPrice function
// function getPriceHistory(asset:any){
//   // USD/FIAT value @ timefrom blockNum

//   if(asset === "BANK"){

//     let tokenAPI = 'bankless-dao';
//     let vsCurrency = 'usd';

//     // console.log(bankFeed.prices);

//     let bankHistory = bankFeed.prices;

//     // bankHistory.forEach((element:any) => {
//     //   console.log(element[0]);  // timestamp
//     //   console.log(element[1]);  // price
//     // });

//     return bankHistory;

//     // use coingecko api to get price
//     // https://api.coingecko.com/api/v3/simple/price?ids=bankless-dao&vs_currencies=usd

//     const blockNumInt = 13916169;   //for 2022 eth mainnet START - hc
//     const startBlock = "0x" + blockNumInt.toString(16);   // format for 0x + hex

//     const endBlockNumInt = 16308155;   //for 2022 eth mainnet END - hc
//     const endBlock = "0x" + endBlockNumInt.toString(16);

//     // this is hard coded for 2022 data as pulled from historical data
//     const startTime = 1640993039;
//     const endTime = 1672529039;

//     // this call for BANK vs USD for all 2022

//     let apiURLcall = 'https://api.coingecko.com/api/v3/coins/'+tokenAPI+'/market_chart/range?vs_currency='+vsCurrency+'&from='+startTime+'&to='+endTime;

//     // console.log(apiURLcall);    // test with direct call

//     // let apiURLcall = 'https://api.coingecko.com/api/v3/coins/'+tokenAPI+'/market_chart/range?vs_currency='+vsCurrency+'&from='+timeMin+'&to='+timeMax;

//     // THIS IS ON HOLD FOR NOW

//     // let data = await fetch(apiURLcall)
//     //   .then((response) => response.json())
//     //   .then((data) => {
      
//     //     // return object has prices, market_caps, and total_volumes

//     //     // console.log(data);   
//     //     // this shoud be BANK prices, mcap and volumes

//     //     if(data.prices.length >= 1){
//     //       // it has received a price(s) object

//     //       console.log(data.prices);   // OK this is an array of arrays
//     //       /*
//     //       [[TIMECODE, PRICE],[TIMECODE, PRICE],...]

//     //       */
//     //       // return the 2022 history price object
//     //       return data.prices

//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.error('Error:', error);
//     //   });

//     // return (bankUSD*parseFloat(value)).toFixed(2) + " $USD";

//     // return {"BANK": 0.001}



//   } else {
//     return "Convert asset - " + asset;
//   }

// }

// async function triggerPrice(BANK:any, setBANK:any) {
//   // console.log(address);
//   console.log("Start - Price call - get BANK historical data with coingecko call");
//   // let gt = GetTransactions({address:props});
//   // console.log(gt);
//   console.log(BANK);

//   // test setBANK function to set live State
//   setBANK(false);

//   console.log(BANK);    // will this be updated? State or local var?

//   // let result = await any Promise, like:
//   let bankHistory = getPriceHistory("BANK");
//   console.log(bankHistory); 

//   bankHistory.forEach((element:any) => {
//     // console.log(element[0]);  // timestamp
//     // console.log(element[1]);  // price
//   });

//   // maybe something like this will help?
//   //const mydata = (async function(){... return data})()
  

//   // alchemyGo();    // re-run the txlist

//   // change the background image
//   // document.body.style.backgroundImage = "url('./src/img/bg2.jpg')";
// }

// function DaoSelect(props:any){

//   console.log(props);

//   // get incoming state of token selection with props.tokenState

//   // console.log(props.tokenState);

//   const [TOKEN, setTOKEN] = useState(props.tokenState);
//   console.log(props.token, TOKEN);    // see current state

//   // using js lookup tokens in the transaction list
//   // if found, set the display to true
//   let allTxs = document.getElementsByClassName("tx");
//   // console.log(allTxs);

//   //  SAMPLE: this to hide all the transactions in the list

//   // NEXT UP: Make this conditional on the checkbox state
//   // if (TOKEN) { its an add, so no need to hide, just reveal
//   // } else { its a remove, so hide all the tokens first
//   if(!TOKEN){
//     [].forEach.call(allTxs, function (el:any) {
//       el.style.display = 'block';
//     });
//   } else {
//     [].forEach.call(allTxs, function (el:any) {
//       el.style.display = 'none';
//     });
//   }

//   // SAMPLE: this to show all matching transactions in the list
//   let myTxs = document.getElementsByClassName(props.token);
//   console.log(myTxs);
//   if(TOKEN){
//     // show all of the matching tokens
//     [].forEach.call(myTxs, function (el:any) {
//       el.style.display = 'block';
//     });
//   } else {
//     // remove all of the matching tokens
//     [].forEach.call(myTxs, function (el:any) {
//       el.style.display = 'none';
//     });
//   }
  


//   function handleChange(e:any) {
//     setTOKEN(e.target.checked);
//   }




//   // !this.state.daoState

//   // toggle token state 
//   // let tokenSel = this.setDAOState(props.token);

//   // shows the checkbox for the DAO token
//   if(props.name){

  
//     return (<div>
//       <input 
//         type="checkbox" 
//         id={props.token} 
//         name={props.name} 
//         // value={props.name} 
//         checked={TOKEN} 
//         onClick={handleChange} 
//       />
//       <label htmlFor={props.name}> 
//         {props.name} ({props.token})
//       </label>
//     </div>);
  
//   } else {
//     return (<div>Oops</div>);
//   }
// }

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
  const [BANK, setBANK] = useState(true);

  console.log(BANK);

  return (
    <>
    <header>
      <img className={cs.headerLogo} src="./src/img/bc_logo.png" alt="BanklessCard Logo" /> 
      <ul className={cs.headerLinks}>
        <li><a href="">Blog</a></li>
        <li><a href="">About Us</a></li>
        <li><a href="" className={cs.highlight}>VISIT US</a></li>
        <li className={cs.wcBtn}><Web3Button /></li>
      </ul>
    </header>
    <div id="HomeSplash" className={cs.home}>
      <Clock />
      <h1 className={cs.mainTitle}>TAXMAN</h1>
      <h3>DAO Income Tax Helper</h3>
      <div className={cs.clear}></div>

      <div className={cs.columnWide}>
        <div className={cs.smallButton}>
          <h2>FAST</h2>
          <p>Finish your DAO Income Taxes in 5 minutes</p>
        </div>
        <div className={cs.smallButton}>
          <h2>FREE</h2>
          <p>No credit card or crypto payment required</p>
        </div>
        <div className={cs.wideButton}>
          <h2>BUILT FOR DAOs</h2>
          <p>Earning monney from DAOs? We automatically filter out any transactions that aren't DAO income to make the process EASY for anyone to use.</p>
        </div>
      </div>
      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae magnam dolor cum! Repellat impedit quibusdam inventore, rem fugit, voluptate voluptas consequuntur minus quo iure magnam sequi reiciendis nisi officia veritatis!</p> */}
      
    
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
          <select>
            <option>Canada (CAD)</option>
            <option>United States (USA)</option>
            <option>Other</option>
          </select>
        </div>

        <div className={cs.inputBox}>
          <label>Where in Canada do you live?</label>
          <select>
            <option>Ontario</option>
            <option>British Columbia (BC)</option>
            <option>Other</option>
          </select>
        </div>

        {/* <Btn name="Next Step" onClick={triggerTx} /> */}

        <aside className={cs.buttonContainer}>
          <a 
            href="#dao-page"
            className={cs.btn} 
            onClick={() => console.log("First Button Press - call TX?")}
          >Next Step</a>
        </aside>

        <hr />

      </div>

      <div id="dao-select" className={cs.page}>

        <a id="dao-page"></a>
        <h2 className={cs.label}>Which DAOs are you a part of?</h2>
        <DaoSelectors name="BanklessDAO" token="BANK" tokenState={BANK} />
        
        <DaoSelectors name="1Inch" token="1INCH" />
        <DaoSelectors name="Aragon" token="ANT" />
        <DaoSelectors name="Maker DAO" token="MKR" />
        <DaoSelectors name="Pocket DAO" token="POKT" />
        <DaoSelectors name="Pool Together" token="POOL" />

        {/* <Btn name="Next Step" url="#tx-page" /> */}

        <aside className={cs.buttonContainer}>
          <a 
            href="#tx-page"
            className={cs.btn} 
            onClick={() => triggerTx(address)}
          >Next Step</a>
        </aside>

        <p>If your DAO doesnt appear here. You can write us: <a href="mailto:links@banklesscard.xyz"  target="_blank">links@banklesscard.xyz</a></p>

        <hr />

      </div>

      <div id="tx-list" className={cs.page}>

        <a id="tx-page"></a>

        
        

        <h2 className={cs.label}>We've automatically classified your transactions</h2>

        <p>Verify that each one is correct.</p>

        {/* if the connection is set, this loads in the account info (ad) from Wallet Connect*/}
        {isConnected && <Account />}

        {/* {isConnected && <AlchemyGo address={address} />} */}

        <aside className={cs.buttonContainer}>
          <a 
            href="#finish"
            className={cs.btn} 
            onClick={() => finishButton()}
          >Finish</a>
        </aside>

        <div id="txSummary" className={cs.txSummary}></div>

        <aside className={cs.buttonContainer}>
          <button 
            className={cs.exportBtn} 
            onClick={() => console.log("exportData")}
          >Export</button>
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
          <li><a href="mailto:links@banklesscard.xyz" target="_blank"><img src="./src/img/mail.png" alt="Email Us" /></a></li>
          <li><a href="#" target="_blank"><img src="./src/img/lin.png" alt="LinkedIn" /></a></li>
          <li><a href="#" target="_blank"><img src="./src/img/yt.png" alt="Our YouTube Channel" /></a></li>
          <li><a href="#" target="_blank"><img src="./src/img/insta.png" alt="Instagram" /></a></li>
          <li><a href="#" target="_blank"><img src="./src/img/tw.png" alt="Twitter" /></a></li>
        </ul>
        <div>&copy; 2023 Bankless Card | All rights reserved</div>
      </footer>
    </div>
    </>
  )
}
