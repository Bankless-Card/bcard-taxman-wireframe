import cs from '../style.module.css'
export function finishButton() {

  // const [BANK, setBANK] = useState();
  // console.log(BANK);

  console.log("! have to pre-setup the output div in the DOM - app.tsx");

  console.log("finish button has been clicked");

  // change the background image
  document.body.style.backgroundImage = "url('./src/img/bg.jpg')";

  // output the displayed tx summary
  let totalIncome = 0;
  let totalBalance = 0;

  //actually calculate the total income and balance
  // get the BANK as Fiat values and add them up
  let myIncome = document.getElementsByClassName(cs.convertAmount);
  let myTokens = document.getElementsByClassName(cs.tokenAmount);

  [].forEach.call(myIncome, function (el:any) {
    // console.log(el.innerHTML);

    let txCont = el.parentElement.parentElement.parentElement.parentElement.parentElement;
    // console.log(txCont)

    // console.log(txCont.style.display)
    // if the tx is displayed 
    if(txCont.style.display === "block"){
      // if the tx is not due a conversion
      if(!el.innerHTML.startsWith("Convert")){
        // if converted -> sum for total income
        let f = parseFloat(el.innerHTML.split(" ")[1]);
        // console.log(f);

        totalIncome += f;
      }

    }

  });

  [].forEach.call(myTokens, function (el:any) {

    let txContTwo = el.parentElement.parentElement.parentElement.parentElement.parentElement;

    // console.log(txContTwo)
    // console.log(txContTwo.style.display)
    // if the tx is displayed 
    if(txContTwo.style.display === "block"){
      // if the tx is not due a conversion
      if(!el.innerHTML.startsWith("Token")){
        // if converted -> sum for total income
        let thisAmt = el.innerHTML.split(" ")[0];
        // console.log(thisAmt);

        let f = parseFloat(thisAmt.replace(",",""));
        // console.log(f);

        totalBalance += f;
      }

    }

  });


  // DOM Output
  // console.log(totalIncome.toFixed(2), totalBalance.toFixed(3));

  let txSummary = document.getElementById("txSummary");

  if(txSummary){

    // add class to txSummary

    txSummary.innerHTML = "<h3>2022 DAO income: "+totalIncome.toFixed(2) + " FIAT(USD)</h3>";
    txSummary.innerHTML += "<h3>2022 BANK balance: "+totalBalance.toFixed(3)+" BANK</h3>";
  } else  {
    console.log("no txSummary div found");
  }
}