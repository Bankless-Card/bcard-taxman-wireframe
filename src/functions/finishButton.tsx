import cs from '../style.module.css'
export function finishButton(FIAT:string) {

  // console.log("! have to pre-setup the output div in the DOM - app.tsx");

  console.log("finish button has been clicked");

  // find all clickable elements and add event listener
  // let clickable = document.querySelectorAll(cs.clickable);
  // console.log(clickable);

  // change the background image
  document.body.style.backgroundImage = "url('./src/img/bg.jpg')";

  // output the displayed tx summary
  let totalIncome = 0;
  let totalBalance = 0;

  //actually calculate the total income and balance
  // get the BANK as Fiat values and add them up
  let myIncome = document.getElementsByClassName(cs.convertAmount);
  let myTokens = document.getElementsByClassName(cs.tokenAmount);

  // console.log(myIncome);    // OK
  // console.log(myTokens);    // OK

  [].forEach.call(myIncome, function (el:any) {
    console.log(el.innerHTML);

    let txCont = el.parentElement.parentElement.parentElement.parentElement.parentElement;
    // console.log(txCont);

    if(txCont.classList.contains(cs.NOT)){
      // skip it
      console.log("NOT INCOME");
    } else {


      // if the tx is not due a conversion
      if(!el.innerHTML.startsWith("Convert")){
        
        console.log("Adding to income: ", el.innerHTML);

        // if converted -> sum for total income
        let f = parseFloat(el.innerHTML.split(" ")[1]);
        // console.log(f);

        totalIncome += f;
      }

    }

  });

  [].forEach.call(myTokens, function (el:any) {

    let txCont = el.parentElement.parentElement.parentElement.parentElement.parentElement;

    if(txCont.classList.contains(cs.NOT)){
      // skip it
      console.log("NOT INCOME");
    } else {

      // if the tx is not due a conversion
      if(!el.innerHTML.startsWith("Token")){
        // if converted -> sum for total income
        let thisAmt = el.innerHTML.split(" ")[0];
        // console.log(thisAmt);

        let f = parseFloat(thisAmt.replace(",",""));
        console.log(f);

        totalBalance += f;
      }

    }

  });


  // DOM Output
  // console.log(totalIncome.toFixed(2), totalBalance.toFixed(3));

  let txSummary = document.getElementById("txSummary");

  if(txSummary){

    // check out which checkboxes are enabled on DAO select
    let daoSelect = document.getElementById("dao-select");
    let daoCheckboxes = daoSelect!.querySelectorAll("input[type=checkbox]");
    let daoNames:any = [];
    [].forEach.call(daoCheckboxes, function (el:any) {
      if(el.checked){
        console.log(el);
        daoNames.push(el.id);
      }
    });

    console.log(daoNames);

    // add class to txSummary

    let taxRate = 100;
    txSummary.innerHTML = "<p>Ensure all DAO tokens you want included are checked in <a href='#dao-page'>DAO select</a> above & flagged as income in the <a href='#tx-page'>tx list</a>.</p>";   // empty to start fresh

    console.log(totalIncome.toFixed(2), totalBalance.toFixed(3));

    if(daoNames.includes("BANK")){
      txSummary.innerHTML += "<h3>2022 BANK income: <span id=totalBANK>"+totalBalance.toFixed(3)+"</span> BANK</h3>";
    } 
    if(daoNames.length > 1){
      // add others
      txSummary.innerHTML += "<h3>2022 OTHER DAO balance: XXX.YYY ODAO</h3>";
    }

      // income needs to be sum of all DAO tokens
    txSummary.innerHTML += "<h3>2022 Total DAO income: "+totalIncome.toFixed(2) + " $"+FIAT+"</h3>";
  
    txSummary.innerHTML += "<h3 title='Your tax rate - most countries classify 100% of income from any source as taxable.'>Tax Rate: <input type='number' id='taxRate' value='"+taxRate+"' />%</h3><hr />";

    txSummary.innerHTML += "<h2>Total Income to Report: $<span id=totalIncome>"+(totalIncome*taxRate/100).toFixed(2)+"</span></h2>";

    txSummary.innerHTML += "<h3 title=''><input type='email' class='"+cs.mailSubmit+"' id='mailSubmit' placeholder='Write your email...' /></h3><hr />";
  
    // enable button for Send to email
    let exportBtn = document.getElementById(cs.exportBtn);
    console.log(exportBtn);
    exportBtn!.style.display = "block";
  
  } else  {
    console.log("no txSummary div found");
  }
}