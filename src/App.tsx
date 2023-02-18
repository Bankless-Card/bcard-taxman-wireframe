import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'

import { useState } from 'react'

import { Account } from './components'
import { Card } from './components'
import { Clock } from './components'
import { Btn } from './components'

// web3 for tx data - can probably use wagmi for same
// import Web3 from 'web3';
// const web3 = new Web3();


import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';

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



import './style.module.css'


// Sample of dynamically applied CSS
import cs from './style.module.css'
let foo = document.getElementById('foo');
// console.log(classes.red)
if(foo) {
  foo.className = cs.red
}

let heroImg = document.getElementById('heroImage');
if(heroImg) { heroImg.className = cs.scaleWidth }

function toggleSwitch(state:any){
  // console.log('toggleSwitch', state)

  let incomeOn = '<img src="./src/img/in.png" alt="Income" width="30" height="30" />';
  let incomeOff = '<img src="./src/img/ni.png" alt="Income Off" height="30" width="50" />';

  if(state === "INCOME"){
    return incomeOn;
  } else {
    return incomeOff;
  }
}

function getTokenLogo(asset:any){

  if(asset === "BANK"){
    return '<img src="./src/img/bankless-temp.png" alt="Bankless DAO" width="50" height="50" />';
  }

  return "Token Logo - " + asset;
}

function getTokenLabel(asset:any){

  if(asset === "BANK"){
    return "Bankless DAO";
  }

  return "Token Label - " + asset;
}

function displayTokenAmount(value:any, asset:any){

  if(asset === "BANK"){
    return  parseFloat(value).toFixed(3) + " " + asset;
  }

  return "Token Amount - " + value + " " + asset;
}

var gBankUsd = 0.0101;

async function displayConvertAmount(value:any, asset:any, timestamp:any){
  // USD/FIAT value @ timefrom blockNum

  if(asset === "BANK"){

    let bankUSD = gBankUsd;   // 1 BANK = 0.01 USD (or newer price)

    console.log(timestamp);

    if(!timestamp){ timestamp=1676311028 }

    let timeMin = timestamp - 250;
    let timeMax = timestamp + 250;
    let tokenAPI = 'bankless-dao';
    let vsCurrency = 'usd';

    // use coingecko api to get price
    // https://api.coingecko.com/api/v3/simple/price?ids=bankless-dao&vs_currencies=usd

    let apiURLcall = 'https://api.coingecko.com/api/v3/coins/bankless-dao/market_chart/range?vs_currency=usd&from=1676311028&to=1676311528';

    // let apiURLcall = 'https://api.coingecko.com/api/v3/coins/'+tokenAPI+'/market_chart/range?vs_currency='+vsCurrency+'&from='+timeMin+'&to='+timeMax;

    // THIS IS ON HOLD FOR NOW

    // fetch(apiURLcall).then((response) => response.json()).then((data) => {
      
    //   // return object has prices, market_caps, and total_volumes

    //   console.log(data);   // this shoud be BANK price at closest timestamp to end

    //   if(data.prices.length >= 1){
    //     // it has received a price
    //     bankUSD = data.prices[0][1];
    //     gBankUsd = bankUSD;   // update global var with new price

    //     console.log((bankUSD*parseFloat(value)).toFixed(2) + " $USD")
    //   }
      

    //   return (bankUSD*parseFloat(value)).toFixed(2) + " $USD";
    
    // });

    return (bankUSD*parseFloat(value)).toFixed(2) + " $USD";



  } else {
    return "Convert Amount - " + value;
  }

}

function doSomething(){
  console.log("doSomething");

  return "doSomething";
}

function moreTarget(event:any){
  var caller = event.target;
  console.log(caller+'more');
}

// function toggleItem(elem:any) {
//   for (var i = 0; i < elem.length; i++) {
//     elem[i].addEventListener("click", function(e:any) {
//       var current = this;
//       for (var i = 0; i < elem.length; i++) {
//         if (current != elem[i]) {
//           elem[i].classList.remove('active');
//         } else if (current.classList.contains('active') === true) {
//           current.classList.remove('active');
//         } else {
//           current.classList.add('active')
//         }
//       }
//       e.preventDefault();
//     });
//   };
// }
// toggleItem(document.querySelectorAll('.link'));

function handleClick(e:any) {
  var curr = e.target.textContent;
  var elem = document.querySelectorAll('#kiran');
  for (var i = 0; i < elem.length; i++) {
      if (elem[i].textContent === curr) {
          elem[i].className = 'active';
      } else {
          elem[i].className = '';
      }
  }
};


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

  console.log(startBlock);

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
        <div class='+cs.col+'>\
          '+ tokenLogo + ' \
        </div>\
        <div class='+cs.col+'>\
          <div class='+cs.row+'>\
          <strong>'+tokenLabel+'</strong>\
          </div>\
          <div class='+cs.row+'>\
          '+incomeBadge+'Income Received\
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

    let listRow = "<li class='"+cs.tx + " " + a + " " + cs[incomeState] + "'>";
    listRow += outBox;    // main tx output and more button to reveal detail
    // listRow += getTokenLogo(thisRow.asset);

    listRow += "<div class="+cs.detail+"><strong><hr/>DETAIL VIEW:"+a+" tx</strong><span style=float:right>X</span><br />";
    listRow += "<div class="+cs.row+">";
      listRow += "<div class="+cs.col+">";
        listRow += getTokenLogo(a) + getTokenLabel(a);
      listRow += "</div>";
    
    
    listRow += "<div class="+cs.col+">";
    listRow += "TokenAmt: <strong>" + thisRow.value +"</strong>" + "ConvertAmt: <strong>";
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


    listRow += tNice + "<br /> <a target='_blank' class="+cs.buttonStyle+" href=https://etherscan.io/tx/"+thisRow.hash+">View TX on Etherscan</a> <br /><strong>From address: </strong><br />"+thisRow.from+"<br /><a href=https://etherscan.io/address/"+thisRow.from+" target=_blank class="+cs.buttonStyle+">View Sender</a><br />";

    // default view for BANK token is income
    if(a === "BANK"){
      listRow += "<a onClick=handleClick(e)><img id=kiran src='./src/img/in.png' class='"+cs.activeIncome + " " + cs.toggleButton+"' alt=income  /></a>";   // active income image

      listRow += "<img id=kiran src='./src/img/ni.png' alt=notincome class="+cs.toggleButton+" />";   // not income image
    } else {
      // non-income display
      listRow += "<a onClick=handleClick(e)><img id=kiran src='./src/img/in.png' alt=income width=50 height=50 class="+cs.toggleButton+" /></a>";   // income image
      listRow += "<img id=kiran src='./src/img/ni.png' alt=income width=60 height=40 class='"+cs.activeIncome+" "+cs.toggleButton+"' />";   // not income image
    }

    

    listRow += "<br /><a href='#' class="+cs.buttonStyle+" title='revert & hide detail view'>Cancel</a>";
    listRow += "<a href='#' class="+cs.buttonStyle+" title='save (auto) & hide detail view'>Save</a>"
    
    listRow += "</div></div></li>";   // end of detail, flexView container & list item

        // should log to console the block detail
        // getBlock(thisRow.blockNumber);

    if (output) {
      output!.innerHTML = output?.innerHTML + listRow;
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


function triggerTx(props:any) {
  console.log(props);
  console.log("TX trigger call ");
  // let gt = GetTransactions({address:props});
  // console.log(gt);

  alchemyGo();    // re-run the txlist

  // change the background image
  document.body.style.backgroundImage = "url('./src/img/bg2.jpg')";
}

function SampleFunc(here:any) {
  // console.log(here)   // we can get the list of tx array here

    // let myTxs = GetTransactions('0x522d634b6BFfb444FdbCdE5932738995A4cfd1F1');
    // console.log(myTxs)

    const data =[{"name":"test1"},{"name":"test2"}];
    const listItems = data.map((d) => <li key={d.name}>{d.name}</li>);

    // console.log(listItems)

    return (
      <div>
      {listItems }
      </div>
    );
}

async function getBlock(num:any){

  const block = await alchemy.core.getBlock( parseInt(num) );
  console.log(block); 

  return block;

}

// async function getMyTxs() {
//   const toAddress = "0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152";

//   const res = await alchemy.core.getAssetTransfers({
//     fromBlock: "0x0",
//     fromAddress: "0x0000000000000000000000000000000000000000",
//     toAddress: toAddress,
//     excludeZeroValue: true,
//     category: ["erc721", "erc1155"],
//   });

//   console.log(res);
// }

function GetTransactions(props:any) : any {

  let walletAddress = props.address;
  console.log(props);

  // check input box for current address:

  let currentWallet = document.getElementById('walletInput');
  // let inVal = (<HTMLInputElement>currentWallet).value;
  if(currentWallet){

    const inVal = (document.getElementById('walletInput') as HTMLInputElement | null)?.value;

    console.log(inVal);

    if (inVal !==  walletAddress) {
      // override the wallet connect input with what is displaayed in the box
      walletAddress = inVal;
    }
  }

  // address should be passed from connected wallet
  let EsApiKeyToken = "GJEDCGUWPNTHY5PSSRSNZ1SNBZBXTCNHP1";

  let etherscanAPIurl = "https://api.etherscan.io/api"
  etherscanAPIurl += "?module=account"
  etherscanAPIurl += "&action=txlist"
  etherscanAPIurl += "&address=" + walletAddress;     //0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC"
  etherscanAPIurl += "&startblock=16356037"           // start from block X which corresponds to Y
  etherscanAPIurl += "&endblock=99999999"
  etherscanAPIurl += "&page=1"
  etherscanAPIurl += "&offset=10"
  etherscanAPIurl += "&sort=asc"
  etherscanAPIurl += "&apikey=" + EsApiKeyToken;

  let output = document.getElementById("output");

  // Simple GET request using fetch
  fetch(etherscanAPIurl)
  .then(response => response.json())
  .then(data => {
    console.log( data.result );

    // for each data

    // output a row in the html DOM

    // let myData;
    let objArr = data.result;
    if(output){
      output!.innerHTML = "";   // clear to start
    }

    for (var i=0; i<objArr.length; i++) {
      // console.log(i, objArr[i] );
      let thisRow = objArr[i];
      // console.log(thisRow.hash, thisRow.from, thisRow.nonce, thisRow.gas, thisRow.gasUsed, thisRow.gasPrice);


      let listRow = "<li><a target='_blank' href=https://etherscan.io/tx/"+thisRow.hash+">etherscan_link</a> and timestamp: "+thisRow.timeStamp+" & nonce: "+thisRow.nonce+" </li>";

          // should log to console the block detail
          // getBlock(thisRow.blockNumber);

      if (output) {
        output!.innerHTML = output?.innerHTML + listRow;
      }

      // using blockHash -> generate URL link to etherscan
      //  -> pull tx data from block with hash
    }

    return true;

  })
  

}

function DaoSelect(props:any){

  // console.log(props);

  // get incoming state of token selection with props.tokenState

  // console.log(props.tokenState);

  const [TOKEN, setTOKEN] = useState(props.tokenState);
  console.log(props.token, TOKEN);    // see current state

  // using js lookup tokens in the transaction list
  // if found, set the display to true
  let allTxs = document.getElementsByClassName("tx");
  // console.log(allTxs);

  //  SAMPLE: this to hide all the transactions in the list

  // NEXT UP: Make this conditional on the checkbox state
  // if (TOKEN) { its an add, so no need to hide, just reveal
  // } else { its a remove, so hide all the tokens first
  if(!TOKEN){
    [].forEach.call(allTxs, function (el:any) {
      el.style.display = 'block';
    });
  } else {
    [].forEach.call(allTxs, function (el:any) {
      el.style.display = 'none';
    });
  }

  // SAMPLE: this to show all matching transactions in the list
  let myTxs = document.getElementsByClassName(props.token);
  console.log(myTxs);
  if(TOKEN){
    // show all of the matching tokens
    [].forEach.call(myTxs, function (el:any) {
      el.style.display = 'block';
    });
  } else {
    // remove all of the matching tokens
    [].forEach.call(myTxs, function (el:any) {
      el.style.display = 'none';
    });
  }
  





  function handleChange(e:any) {
    setTOKEN(e.target.checked);
  }

  // !this.state.daoState

  // toggle token state 
  // let tokenSel = this.setDAOState(props.token);

  // shows the checkbox for the DAO token
  return (<div>
    <input 
      type="checkbox" 
      id={props.token} 
      name={props.name} 
      // value={props.name} 
      checked={TOKEN} 
      onClick={handleChange} 
    />
    <label htmlFor={props.name}> 
      {props.name} ({props.token})
    </label>
  </div>);
}

function toggleAlts(e:any) {
  e.preventDefault();

  // let allTxs = document.getElementsByClassName("tx");
  // console.log(allTxs);

  // [].forEach.call(allTxs, function (el:any) {
  //   el.style.display = 'none';
  // });

  console.log(cs.NOT);
  let nots = document.getElementsByClassName(cs.NOT);
  console.log(nots);

  [].forEach.call(nots, function (el:any) {
    el.style.display = 'block';
  });

  let alts = document.getElementsByClassName("BANK");
  console.log(alts);

  [].forEach.call(alts, function (el:any) {
    el.style.display = 'none';
  });


}

function toggleDetail(e:any){
  e.preventDefault();

  let allDetails = document.getElementsByClassName(cs.detail);
  console.log(allDetails);

  [].forEach.call(allDetails, function (el:any) {
    if(el.style.display === 'block') {
      el.style.display = 'none';
    } else {
      el.style.display = 'block';
    }
    
  });

}

export function App() {
  const { address, isConnected } = useAccount()
  // console.log(address);

  //kickoff alchemyGo function
  const myFunc = alchemyGo();

  // save state to track dao selection
  // const [daoState, setDaoState] = useState({})

  const [count, setCount] = useState(0);

  // default true on token states to show all
  // example with BANK token
  const [BANK, setBANK] = useState(true);

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
      <h1>TAXMAN</h1>
      <h3>DAO Income Tax Helper</h3>
      <div className={cs.clear}></div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae magnam dolor cum! Repellat impedit quibusdam inventore, rem fugit, voluptate voluptas consequuntur minus quo iure magnam sequi reiciendis nisi officia veritatis!</p>
      <div className={cs.bigButton}>
        <h2>
          <a href="#info"> 
            <img src="./src/img/click-arrow.png" alt="click-arrow" />
            &nbsp;Click here to start
          </a>
        </h2>
      </div>
    </div>
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
            onClick={() => triggerTx(address)}
          >Next Step</a>
        </aside>

        <hr />

      </div>

      <div id="dao-select" className={cs.page}>

        <a id="dao-page"></a>
        <h2 className={cs.label}>Which DAOs are you a part of?</h2>
        <DaoSelect name="BanklessDAO" token="BANK" tokenState={BANK}
          // onClick={() => {
          //   // toggle BANK state
          //   setBANK(!BANK);

          //   console.log(BANK);

          //   // setCount(count => count + 1);
          //   // console.log(count);
          // }} 
        />
        <DaoSelect name="1Inch" token="1INCH" />

        <DaoSelect name="Aragon" token="ANT" />
        <DaoSelect name="Maker DAO" token="MKR" />
        <DaoSelect name="Pocket DAO" token="POKT" />
        <DaoSelect name="Pool Together" token="POOL" />

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

        <p>
        <a 
            href=""
            className={cs.btnW + " " + cs.btn} 
            onClick={(e) => toggleAlts(e)}
          >Show all &amp; Hide all DAO</a>
          </p>
          <p>
          <a 
            href=""
            className={cs.btnW + " " + cs.btn} 
            onClick={(e) => toggleDetail(e)}
          >show/hide all tx details</a></p>

        {isConnected && <Account />}

        {/* {isConnected && <AlchemyGo address={address} />} */}

        <aside className={cs.buttonContainer}>
          <a 
            href="#finish"
            className={cs.btn} 
            // onClick={() => triggerTx(address)}
          >Finish</a>
        </aside>

      </div>


      <hr />
      <hr />
      {/* example of functional component - will display based on input props */}

      <Web3Button />

      <Card title="Card Title" paragraph="This is paragraph data for sample card." />

      <SampleFunc here="here" />


    
    </div>
    <footer>Thisisfooter</footer>
    </>
  )
}
