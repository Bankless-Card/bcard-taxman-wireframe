import { useAccount, useEnsName, useEnsAvatar, useDisconnect, } from 'wagmi'
import { useBalance, } from 'wagmi'

import { TxComp } from './TxComponent';

function sampleFunc(here:any) {
  console.log(here)   // we can get the list of tx array here

    const data =[{"name":"test1"},{"name":"test2"}];
    const listItems = data.map((d) => <li key={d.name}>{d.name}</li>);

    return (
      <div>
      {listItems }
      </div>
    );
}

function GetTransactions(props:any) : any {

  const walletAddress = props;
  // console.log(props)

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
  // console.log(output);

  // Simple GET request using fetch
  fetch(etherscanAPIurl)
  .then(response => response.json())
  .then(data => {
    // console.log( data.result );

    // let myData;
    let objArr = data.result;

    let jsObj = JSON.stringify(objArr);

    // objArr.map((tx) => {
    //   myData = (        
    //     <li key={tx.hash}>
    //     {tx.hash}
    //     </li>
    //   )
    // });

    // let objDump = dump(objArr);
    // console.log(objDump);
    // console.log(typeof(objDump));

    // output.empty();
    if(output){
      // output!.innerHTML = output?.innerHTML + jsObj; //objDump;

      // use this to call other function with data that we want
      return sampleFunc(data.result)

      // return data.result;

    } else {
      return false
    }


  })
  

}


export function Account() {
  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })

  // read wallet data
  const { data, isError, isLoading } = useBalance({
    address: address,
  })

  let addressString = address?.toString();
  // console.log(addressString);

  // let myTx = GetTransactions(addressString)
  // console.log(myTx);


  const { disconnect } = useDisconnect()

  return (
    <div>
      <div>
        <img src={ensAvatar!} alt="ENS Avatar" />
      </div>
      {ensName ?? address}
      {ensName ? ` (${address})` : null}
      <div>
        Balance (eth value): {data?.formatted} {data?.symbol}
      </div>
      {/* <h4>Connection Info</h4> */}
      {/* <div>Connected to {connector.name}</div> */}
      {/* <button onClick={disconnect}>Disconnect</button> */}
      <h4>Account Transaction Info</h4>
      <div id="output">
        {/* <TxComp txs={myTx} /> */}
      </div>
    </div>
  )
}
