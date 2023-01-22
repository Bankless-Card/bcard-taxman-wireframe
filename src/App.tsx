import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'

import { Account } from './components'
import { Card } from './components'
import { Clock } from './components'
import { Btn } from './components'

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


function triggerTx(props:any) {
  console.log(props);
  let gt = GetTransactions({address:props});
  // console.log(gt);
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

        {isConnected && <GetTransactions address={address} />}

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
