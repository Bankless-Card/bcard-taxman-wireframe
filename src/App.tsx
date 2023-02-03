import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'

import { Account } from './components'
import { Card } from './components'
import { Clock } from './components'
import { Btn } from './components'


import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: 'szbJviwD1JXcAcbDNY0Mk7qn6uql-sN9', // Replace with your Alchemy API Key.
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

  const blockNumInt = 13916169;   //for 2022 eth mainnet hc
  const startBlock = "0x" + blockNumInt.toString(16);   // format for 0x + hex

  console.log(startBlock);

  const res = await alchemy.core.getAssetTransfers({
    fromBlock: startBlock,
    toAddress: toAddress,
    excludeZeroValue: true,
    category: [ AssetTransfersCategory.ERC20],
  });

  // AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155,

  console.log(res);

  // setup output object to DOM
  let output = document.getElementById("output");

  let objArr = res.transfers;   //this is the transaction list data object
  if(output){
    output!.innerHTML = "";   // clear to start
  }

  for (var i=0; i<objArr.length; i++) {
    // console.log(i, objArr[i] );
    let thisRow = objArr[i];
    // console.log(thisRow.hash, thisRow.from, thisRow.nonce, thisRow.gas, thisRow.gasUsed, thisRow.gasPrice);


    //output elements

    // token label -> thisRow.asset
    // token amount -> thisRow.value

    // date/time -> from blockNum?

    // calculated elements

    // USD/FIAT value @ timefrom blockNum



    let listRow = "<li> <strong>"+thisRow.asset+"</strong> - TokenAmt: <strong>" + thisRow.value +"</strong>";
      listRow += "<br /> <a target='_blank' href=https://etherscan.io/tx/"+thisRow.hash+">etherscan_link</a> and blocknum: "+thisRow.blockNum+"</li>";

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
  return (<div><input type="checkbox" id={props.token} name={props.name} value={props.name} />
        <label htmlFor={props.name}> {props.name} ({props.token})</label></div>);
}

export function App() {
  const { address, isConnected } = useAccount()
  // console.log(address);

  //kickoff alchemyGo function
  const myFunc = alchemyGo();

  return (
    <div className={cs.container}>
      <header>
        <img src="https://via.placeholder.com/25?text=logo" alt="" />
        <h1>BCard TaxMan</h1>

        <Web3Button />
      </header>
      {/* example of class component - can be set to update live with tick() */}
      <Clock />

      <div className={cs.page}>

        <h2 className={cs.red}>DAO Income Tax Helper</h2>

        <img src="https://via.placeholder.com/500?text=Hero+Image" alt="" className={cs.scaleWidth} />

        {/* <div className={cs.buttonContainer} >
          <Btn name="Calculate your tax now (it's free)" url="#info" />
        </div> */}

        <aside className={cs.buttonContainer}>
          <a 
            href="#info"
            className={cs.btn} 
            // onClick={() => triggerTx(address)}
          >Calculate your tax now (it's free)</a>
        </aside>

        <hr />
      
      </div>

      <div className={cs.page}>
        {/*<!-- sample page for initial info collect -->*/}
        <a id="info"></a>
        <h2 className={cs.red}>First we will need some info about you!</h2>

        <div className={cs.inputBox}>
          <label>What is your wallet address?</label>
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
        <h2 className={cs.red}>Which DAOs are you a part of?</h2>
        <DaoSelect name="BanklessDAO" token="BANK" />
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

        <hr />

      </div>

      <div id="tx-list" className={cs.page}>

        <a id="tx-page"></a>

        <h2 className={cs.red}>Matched Transactions</h2>

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
      <Card title="Card Title" paragraph="This is paragraph data for sample card." />

      <SampleFunc here="here" />


    </div>
  )
}
