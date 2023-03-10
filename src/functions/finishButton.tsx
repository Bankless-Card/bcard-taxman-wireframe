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

  let totalBANK = 0;
  let totalWETH = 0;
  let totalDAI = 0;
  let total1INCH = 0;
  let totalANT = 0;
  let totalMKR = 0;
  let totalPOKT = 0;
  let totalPOOL = 0;


  // let totalBANKincome = 0;
  // let totalWETHincome = 0;

  //actually calculate the total income and balance
  // get the BANK as Fiat values and add them up
  let myIncome = document.getElementsByClassName(cs.convertAmount);
  let myTokens = document.getElementsByClassName(cs.tokenAmount);

  // console.log(myIncome);    // OK
  // console.log(myTokens);    // OK

  [].forEach.call(myIncome, function (el:any) {
    // console.log(el.innerHTML);

    let txCont = el.parentElement.parentElement.parentElement.parentElement.parentElement;
    // console.log(txCont);

    if(txCont.classList.contains(cs.NOT)){
      // skip it
      console.log("NOT INCOME");
    } else {

      // let isBANK, isWETH = false;

      // if(txCont.classList.contains("BANK")){
      //   console.log("BANK INCOME");
      //   isBANK = true;
      // } else if(txCont.classList.contains("WETH")){
      //   console.log("WETH INCOME");
      //   isWETH = true;
      // }

      // if the tx is not due a conversion
      if(!el.innerHTML.startsWith("Convert")){
        
        console.log("Adding to income: ", el.innerHTML);

        // if converted -> sum for total income
        let f = parseFloat(el.innerHTML.split(" ")[1]);
        // console.log(f);

        totalIncome += f;

        

        // if(isBANK){
        //   totalBANKincome += f;
        // } else if(isWETH){
        //   totalWETHincome += f;
        // }

      }

    }

  });

  [].forEach.call(myTokens, function (el:any) {

    let txCont = el.parentElement.parentElement.parentElement.parentElement.parentElement;

    if(txCont.classList.contains(cs.NOT)){
      // skip it
      console.log("NOT INCOME");
    } else {

      let isBANK, isWETH, isDAI, is1INCH, isANT, isMKR, isPOKT, isPOOL = false;   // init all

      if(txCont.classList.contains("BANK")){
        console.log("BANK BALANCE");
        isBANK = true;
      } else if(txCont.classList.contains("WETH")){
        console.log("WETH BALANCE");
        isWETH = true;
      } else if(txCont.classList.contains("DAI")){
        // console.log("WETH BALANCE");
        isDAI = true;
      } else if(txCont.classList.contains("1INCH")){
        is1INCH = true;
      } else if(txCont.classList.contains("ANT")){
        isANT = true;
      } else if(txCont.classList.contains("MKR")){
        isMKR = true;
      } else if(txCont.classList.contains("POKT")){
        isPOKT = true;
      } else if(txCont.classList.contains("POOL")){
        isPOOL = true;
      }

      // if the tx is not due a conversion
      if(!el.innerHTML.startsWith("Token")){
        // if converted -> sum for total income
        let thisAmt = el.innerHTML.split(" ")[0];
        // console.log(thisAmt);

        let f = parseFloat(thisAmt.replace(",",""));
        console.log(f);

        totalBalance += f;    // this number means NOTHING as it is the sumtotal of all TOKENS of all TYPES

        if(isBANK){
          totalBANK += f;
        } else if(isWETH){
          totalWETH += f;
        } else if(isDAI){
          totalDAI += f;
        } else if(is1INCH){
          total1INCH += f;
        } else if(isANT){
          totalANT += f;
        } else if(isMKR){
          totalMKR += f;
        } else if(isPOKT){
          totalPOKT += f;
        } else if(isPOOL){
          totalPOOL += f;
        }
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
      txSummary.innerHTML += "<h3>2022 BANK income: <span id=totalBANK>"+totalBANK.toFixed(3)+"</span> BANK</h3>";
    } 
    if(daoNames.includes("WETH")){
      txSummary.innerHTML += "<h3>2022 WETH income: <span id=totalWETH>"+totalWETH.toFixed(3)+"</span> WETH</h3>";
    } 
    if(daoNames.includes("DAI")){
      txSummary.innerHTML += "<h3>2022 DAI income: <span id=totalDAI>"+totalDAI.toFixed(3)+"</span> DAI</h3>";
    } 
    if(daoNames.includes("1INCH") && total1INCH > 0){
      txSummary.innerHTML += "<h3>2022 1INCH income: <span id=total1INCH>"+total1INCH.toFixed(3)+"</span> DAI</h3>";
    } 
    if(daoNames.includes("ANT") && totalANT > 0){
      txSummary.innerHTML += "<h3>2022 ANT income: <span id=totalANT>"+totalANT.toFixed(3)+"</span> DAI</h3>";
    } 
    if(daoNames.includes("MKR") && totalMKR > 0){
      txSummary.innerHTML += "<h3>2022 MKR income: <span id=totalMKR>"+totalMKR.toFixed(3)+"</span> DAI</h3>";
    } 
    if(daoNames.includes("POKT") && totalPOKT > 0){
      txSummary.innerHTML += "<h3>2022 POKT income: <span id=totalPOKT>"+totalPOKT.toFixed(3)+"</span> DAI</h3>";
    } 
    if(daoNames.includes("POOL") && totalPOOL > 0){
      txSummary.innerHTML += "<h3>2022 POOL income: <span id=totalPOOL>"+totalPOOL.toFixed(3)+"</span> DAI</h3>";
    } 



      // income needs to be sum of all DAO & selected tokens
    txSummary.innerHTML += "<h3>2022 Total DAO income: "+totalIncome.toFixed(2) + " $"+FIAT+"</h3>";
  
    // onChange="+changingTax()+"
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

function changingTax(){
  console.log("Tax is changing - recalculate the total income to report");
  let taxRate = document.getElementById("taxRate") as HTMLInputElement;
  let newVal = taxRate.value;

  console.log(newVal);
}