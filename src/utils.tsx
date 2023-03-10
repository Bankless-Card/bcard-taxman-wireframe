// this function to handle the details display view - click on the tx Logo
export function handleOpen(thisLink: any) {
  console.log(thisLink.currentTarget); // OK targets button
  // figure out where we are in the DOM
  // open/close the next details tab
  let details = thisLink.currentTarget.parentNode.parentNode.nextSibling;
  console.log(details);
  console.log(details.style.display);

  if (details.style.display === "block") {
    details.style.display = "none";
  } else {
    details.style.display = "block";
  }
}

// function searchTree(element:any, matchingTitle:any) {
//     if(element.title == matchingTitle) {
//        return element;
//   } else if (element.children != null) {
//        var i;
//        var result = null;
//        for(i=0; result == null && i < element.children.length; i++){
//             result = searchTree(element.children[i], matchingTitle);
//        }
//        return result;
//   }
//   return null;
// }

// this function handles the save button press within the detail view
export function handleSave(evt: any) {
  evt.preventDefault();

  console.log(evt.currentTarget.parentNode); // OK targets button
  // figure out where we are in the DOM

  evt.currentTarget.parentNode.style.display = "none";

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

export function handleIncomeToggle(evt: any) {
  console.log(evt.currentTarget); // OK targets button?

  let imgSrc = evt.currentTarget.src;
  // console.log(imgSrc);

  let imgClassList = evt.currentTarget.classList;
  let otherTarget = evt.currentTarget.nextSibling; // target other button

  let mainTx = evt.currentTarget.parentNode.parentNode.previousSibling;
  // console.log(evt.currentTarget.parentNode.parentNode.previousSibling);
  console.log(mainTx); // should be the main tx data container

  // set container class for future summation
  let txContainer = mainTx.parentNode.parentNode;
  console.log(txContainer);
  // get ID of container -> should match the tx ID in the global
  let txContainerID = txContainer.id;
  console.log(txContainerID);

  let findBadge = searchTree(mainTx, "badge");
  console.log(findBadge);

  // console.log(cs.INCOME, cs.NOT);

  console.log(
    "ALSO SET THE GLOBAL OBJECT DATA HERE WHEN CHANGING THE INCOME STATUS"
  );

  // check for image in or ni
  if (imgSrc.includes("ni.png")) {
    // currently it is not income

    // get prev sibling to target the income tab
    // console.log(evt.currentTarget.previousSibling);
    otherTarget = evt.currentTarget.previousSibling; // override
  } else {
    // currently it is income
    // get next sibling to target the non-income tab (default)
    // console.log(evt.currentTarget.nextSibling);
  }

  // check for active or not & toggle the visual display on clicked element
  if (imgClassList.contains(cs.activeIncome)) {
    // currently it is active
    imgClassList.remove(cs.activeIncome);
    otherTarget.classList.add(cs.activeIncome);

    findBadge.innerHTML =
      "<img class=" +
      cs.inBadge +
      ' src="./src/img/inBadge.png" alt="Income" />' +
      " Income | Received";

    txContainer.classList.remove(cs.NOT);
    txContainer.classList.add(cs.INCOME);

    globalTxs[txContainerID].income = "INCOME";
  } else {
    // currently it is not active
    imgClassList.add(cs.activeIncome);
    otherTarget.classList.remove(cs.activeIncome);

    //set badge not income
    findBadge.innerHTML =
      "<img class='" +
      cs.niBadge +
      "' src='./src/img/close.png' alt='Income Off' /> NOT INCOME";

    // txContainer.classList.remove(cs.INCOME);
    txContainer.classList.add(cs.NOT);

    globalTxs[txContainerID].income = "NOT";
  }
}

export function getMonthOut(month: string) {
  let monthOut = "";

  switch (month) {
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

export async function alchemyGo(FIAT: string) {
  console.log("FIAT: " + FIAT);

  // get address to use
  let walletAddress: string = "";

  let currentWallet = document.getElementById("walletInput");
  // let inVal = (<HTMLInputElement>currentWallet).value;
  if (currentWallet) {
    const inVal = (
      document.getElementById("walletInput") as HTMLInputElement | null
    )?.value;

    console.log(inVal);

    if (inVal !== walletAddress) {
      // override the wallet connect input with what is displaayed in the box
      walletAddress = inVal!;
    }
  }

  console.log(walletAddress);

  // Access standard Ethers.js JSON-RPC node request
  // alchemy.core.getBlockNumber().then(console.log);

  // Access Alchemy Enhanced API requests
  alchemy.core.getTokenBalances(walletAddress).then(console.log);

  const toAddress = walletAddress; // for connected or inserted wallet address

  // estimated starting eth block for 2022
  // https://etherscan.io/block/13916169

  const blockNumInt = 13916169; //for 2022 eth mainnet START - hc
  const startBlock = "0x" + blockNumInt.toString(16); // format for 0x + hex

  const endBlockNumInt = 16308155; //for 2022 eth mainnet END - hc
  const endBlock = "0x" + endBlockNumInt.toString(16);

  // console.log(startBlock);

  const res = await alchemy.core.getAssetTransfers({
    fromBlock: startBlock,
    toBlock: endBlock,
    toAddress: toAddress,
    excludeZeroValue: true,
    withMetadata: true,
    // order: "desc",       // default asc for ascending
    category: [AssetTransfersCategory.ERC20],
  });

  // AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.INTERNAL, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155,

  console.log(res);

  // setup output object to DOM
  let output = document.getElementById("output");
  output?.classList.add(cs.output);

  let objArr = res.transfers; //this is the transaction list data object

  // assign the list of trasnctions to the DOM
  globalTxs = objArr;

  if (output) {
    output!.innerHTML = ""; // clear to start
    console.log("output cleared");
  }

  // internal variables to the tx loop
  // var first = true;
  let curMonth = "Start";
  let dateHeader = ""; // init
  let deferHeader = false;

  // for each of the transactions
  for (var i = 0; i < objArr.length; i++) {
    // console.log(i, objArr[i] );
    let thisRow = objArr[i];
    // console.log(thisRow.hash, thisRow.from, thisRow.nonce, thisRow.gas, thisRow.gasUsed, thisRow.gasPrice);

    let t = thisRow.metadata.blockTimestamp; // date from tx record
    let tNice = new Date(t);
    // console.log(tNice);

    var unixT = Date.parse(t) / 1000;
    // console.log(unixT);

    //output elements

    // token label -> thisRow.asset
    // token amount -> thisRow.value

    // date/time -> from blockNum?

    // calculated elements

    // USD/FIAT value @ timefrom blockNum

    // Income Label - Toggle SWITCH

    let incomeState = "NOT";
    console.log("add other assets here to autoflag as income");

    // console.log(daoSel.WETH);
    //is enabled check
    if (daoSel.WETH) {
      console.log("WETH is enabled");
      if (thisRow.asset === "WETH") {
        incomeState = "INCOME"; // only enable if WETH is enabled && it matches
      }
    }

    if (daoSel.DAI) {
      console.log("DAI is enabled");
      if (thisRow.asset === "DAI") {
        incomeState = "INCOME"; // only enable if WETH is enabled && it matches
      }
    }

    // BANK is always income
    console.log(daoSel["BANK"]);
    if (thisRow.asset === "BANK") {
      incomeState = "INCOME";
    }

    let incomeBadge = toggleSwitch(incomeState); // 'Income Label - Toggle SWITCH';
    let tokenLogo = getTokenLogo(thisRow.asset); // token logo - '+thisRow.asset+'
    let tokenLabel = getTokenLabel(thisRow.asset); // token label - '+thisRow.asset+'
    let tokenAmount = displayTokenAmount(thisRow.value, thisRow.asset); // token amount - '+thisRow.value+'
    let convertAmount = await displayConvertAmount(
      thisRow.value,
      thisRow.asset,
      unixT,
      FIAT
    ); // "USD/FIAT value @ timefrom blockNum";   // USD/FIAT value @ timefrom blockNum

    // htmlhelpers
    let clearBoth = "<div style=clear:both></div>";

    // save to globalTxs
    globalTxs[i].unixT = unixT; // add unix timestamp to global object
    globalTxs[i].incomeState = incomeState; // add income state to global object
    globalTxs[i].incomeBadge = incomeBadge; // add income state to global object
    globalTxs[i].tokenLogo = tokenLogo; // add income state to global object
    globalTxs[i].tokenLabel = tokenLabel; // add income state to global object
    globalTxs[i].tokenAmount = tokenAmount; // add income state to global object
    globalTxs[i].convertAmount = convertAmount; // add income state to global object

    // let inx = (e:any) => handleOpen(e);

    let outBox =
      "<div class=" +
      cs.flexCont +
      '>\
        <div class="' +
      cs.row +
      " " +
      cs.even +
      '">\
          <div class="' +
      cs.col +
      " " +
      cs.logoClick +
      '">\
            <button class="' +
      cs.clickable +
      '">\
            ' +
      tokenLogo +
      " \
            </button>\
          </div>\
          <div class=" +
      cs.col +
      ">\
            <div class=" +
      cs.row +
      ">\
              <span class=" +
      cs.tokenLabel +
      ">" +
      tokenLabel +
      '</span>\
            </div>\
            <div class="' +
      cs.row +
      " " +
      cs.incBadge +
      '" title="badge">\
              ' +
      incomeBadge +
      " Income | Received\
            </div>\
          </div>\
          <div class=" +
      cs.col +
      '>\
            <div class="' +
      cs.row +
      " " +
      cs.end +
      '">\
              <span class=' +
      cs.tokenAmount +
      ">" +
      tokenAmount +
      '</span>\
            </div>\
            <div class="' +
      cs.row +
      " " +
      cs.end +
      '">\
              <span class=' +
      cs.convertAmount +
      ">" +
      convertAmount +
      "</span>\
            </div>\
          </div>\
        </div>";

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

    let listRow = ""; //init

    // insert date header here - conditional on month change
    let dString = tNice.toDateString();
    let dStringArr = dString.split(" ");
    let dStringMonth = dStringArr[1];
    let dStringYear = dStringArr[3];

    if (dStringMonth !== curMonth) {
      curMonth = dStringMonth;
      // console.log("Month Change - trigger new header (on first shown element)");

      // console.log("index: ",i , dStringMonth, curMonth);

      // skip if element is not shown and defer to next in index

      dateHeader =
        "<div class=" +
        cs.dateHeader +
        ">" +
        getMonthOut(curMonth) +
        " " +
        dStringYear +
        "</div>";

      if (incomeState === "NOT") {
        // its not shown so we need to defer the display until one that is shown
        deferHeader = true; // thihs will trigger display of header later
      } else {
        deferHeader = false;

        // output here IF monthh change && is income
        listRow += dateHeader; // add the header before the containeer element.
      }
    }

    if (deferHeader) {
      // then we need to call the header display here
      if (incomeState === "INCOME") {
        // only on income, so we may miss months if no income recorded.

        listRow += dateHeader; // add the header before the containeer element.

        deferHeader = false; // reset the flag
      }
    }

    /** Start of tx container li element **/
    // include the date/time in local format, as title of the list item
    listRow +=
      "<li id=" +
      i +
      " title='" +
      tNice +
      "' class='" +
      cs.tx +
      " " +
      a +
      " " +
      cs[incomeState] +
      "'>";

    let closeIcon =
      "<span class=" +
      cs.closeIcon +
      "><img src='./src/img/close.png' alt='close' /></span>";

    // <span style=float:right>X</span><br />

    listRow += outBox; // main tx output and more button to reveal detail
    // listRow += getTokenLogo(thisRow.asset);

    // detail view starts here
    listRow +=
      "<div class=" +
      cs.detail +
      "><strong><hr/>DETAIL VIEW:" +
      a +
      " tx</strong>" +
      closeIcon;

    // skip this row for now?
    if (false) {
      listRow += "<div class=" + cs.row + ">";
      listRow += "<div class=" + cs.col + ">";
      listRow += getTokenLogo(a) + getTokenLabel(a);
      listRow += "</div>";

      listRow += "<div class=" + cs.col + ">";
      listRow +=
        "TokenAmt: <strong>" +
        thisRow.value +
        "</strong>" +
        "<br/>ConvertAmt: <strong>";
      listRow +=
        (await displayConvertAmount(thisRow.value, a, unixT, FIAT)) +
        "</strong></div>";
      listRow += "</div>";

      listRow += clearBoth;
    }

    // fetch trasaction detail based on tx hash
    /*
      let tx = "0x5da2844afb6826d4baed6ad7e8b536c00cbc921ac147773ad056f29f2e7c1762"
      web3.eth.getTransaction(tx).blockNumber
        1920050
      web3.eth.getBlock(1920050).timestamp
      */

    // let thisTimestamp = web3.eth.getBlock(1920050).timestamp;

    // "<br/>DATE/TIME AS CAPTURED FROM BLOCKnum: "+thisRow.blockNum+" or TXhash: "+thisRow.hash+

    let dayClean = tNice.toDateString();
    let timeClean = tNice.toLocaleTimeString(); // use users local time to display :)
    let dayArr = dayClean.split(" ");
    let dayOut =
      getMonthOut(dayArr[1]) +
      " " +
      dayArr[2] +
      ", " +
      dayArr[3] +
      " | " +
      timeClean;
    // console.log(dayClean, timeClean);

    // navigator.clipboard.writeText(thisRow.from);

    let copyLink =
      "<a class=" +
      cs.copyLink +
      " onclick=alert('" +
      thisRow.from +
      "')>[]</a>";

    listRow += "<div class=" + cs.dayOut + ">" + dayOut + "</div>";

    listRow +=
      "<a target='_blank' class=" +
      cs.buttonStyle +
      " href=https://etherscan.io/tx/" +
      thisRow.hash +
      ">View TX on Etherscan</a>";

    listRow +=
      "<div class=" +
      cs.fromAddr +
      "><strong>From:</strong> <br/>" +
      thisRow.from +
      copyLink +
      "</div>";

    listRow +=
      clearBoth +
      "<a href=https://etherscan.io/address/" +
      thisRow.from +
      " target=_blank class=" +
      cs.buttonStyle +
      ">View Sender</a>" +
      clearBoth;

    listRow += "<div class=" + cs.incomeToggleContainer + ">"; // income toggle container

    //console.log(incomeState);

    // default view for BANK token is income
    if (incomeState === "INCOME") {
      listRow +=
        "<img src='./src/img/in.png' class='" +
        cs.activeIncome +
        " " +
        cs.toggleButton +
        "' alt=income  />"; // active income image

      // not used?
      listRow +=
        "<img src='./src/img/ni.png' alt=notincome class=" +
        cs.toggleButton +
        " />"; // not income image
    } else {
      // non-income display
      listRow +=
        "<img src='./src/img/in.png' alt=income class=" +
        cs.toggleButton +
        " />"; // income image
      listRow +=
        "<img src='./src/img/ni.png' alt=notincome class='" +
        cs.activeIncome +
        " " +
        cs.toggleButton +
        "' />"; // not income image
    }

    listRow += "</div>"; // end of income toggle container

    // listRow += clearBoth;   // add a clear to give save button a new line.

    // listRow += "<br /><a href='#' class="+cs.buttonStyle+" title='revert & hide detail view'>Cancel</a>";
    listRow +=
      "<a href='#' class='" +
      cs.buttonStyle +
      " " +
      cs.saveBtn +
      "' title='save (auto) & hide detail view'>Save</a><hr />";

    listRow += "</div></div></li>"; // end of detail, flexView container & list item

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
export async function triggerTx(FIAT: string) {
  console.log(FIAT);
  console.log("TX trigger call ");
  // let gt = GetTransactions({address:props});
  // console.log(gt);

  await alchemyGo(FIAT); // re-run the txlist, confirm FIAT value

  // find all clickable elements and add event listener
  let clickable = document.getElementsByClassName(cs.clickable);
  console.log(clickable);

  for (let i = 0; i < clickable.length; i++) {
    clickable[i].addEventListener("click", handleOpen);
  }

  // income toggle buttons
  let toggleButton = document.getElementsByClassName(cs.toggleButton);
  console.log(toggleButton);

  for (let i = 0; i < toggleButton.length; i++) {
    toggleButton[i].addEventListener("click", handleIncomeToggle);
  }

  // save/close button
  let saveBtn = document.getElementsByClassName(cs.saveBtn);
  console.log(saveBtn);

  for (let i = 0; i < saveBtn.length; i++) {
    saveBtn[i].addEventListener("click", handleSave);
  }

  // change the background image
  document.body.style.backgroundImage = "url('./src/img/bg2.jpg')";
}

/* Function cleanup TBD */

export function callSetFiat(setFIAT: any) {
  // lookup state of DOM for select option (country code)
  let country = document.getElementsByClassName("fiatSelect");
  let fiatCode = (country[0] as HTMLSelectElement).value;

  console.log(fiatCode);

  // assign to state variable
  setFIAT(fiatCode);
}

export function getProvinceSelect(FIAT: string) {
  if (FIAT === "CAD") {
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

export function exportData() {
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

  console.log(globalTxs); // benefits here are easy access to tx data OK here

  // for each tx, we need to build a row of data
  //  -> if(income) timestamp, tokenLabel, tokenAmount, fiatConversion, fiatAmount

  // first line is 'header'
  let csvData =
    "txID, timestamp, asset, tokenAmount, fiatRatio, fiatAmount, fiatLabel" +
    "\r\n";
  let fiatCode = "";

  if (globalTxs.length > 0) {
    let newLine = "";

    [].forEach.call(globalTxs, function (el: any, index: any) {
      if (el.incomeState === "INCOME") {
        console.log(el);

        newLine =
          index +
          "," +
          el.unixT +
          "," +
          el.asset +
          "," +
          el.value +
          "," +
          el.convertAmount.split(" ")[3] +
          "," +
          el.convertAmount.split(" ")[1] +
          "," +
          el.convertAmount.split(" ")[0] +
          "\r\n";

        // only add to csvData if income
        csvData += newLine;
        fiatCode = el.convertAmount.split(" ")[0]; // get the fiat code from each
      }
    });
  }

  console.log(csvData);

  let totalBANK = document.getElementById("totalBANK");
  let totalWETH = document.getElementById("totalWETH");
  let totalDAI = document.getElementById("totalDAI");
  let totalIncome = document.getElementById("totalIncome");

  let taxRate = document.getElementById("taxRate") as HTMLInputElement;

  // last line of output should be summation of all income
  csvData +=
    "SUM, timestamp, TaxRate, Total Income to Report, FiatCode" + "\r\n";
  csvData +=
    "RUN@, " +
    Date.now() +
    "," +
    taxRate?.value +
    "," +
    totalIncome?.innerHTML +
    "," +
    fiatCode +
    "\r\n";

  let summaryData =
    "<div>\
      <h2>Thank you for using Bankless Card TaxMan!</h2>\
      <p>Your detailed transactions are attached to this email as a CSV.  Be sure to download the CSV and save it in a safe place</p>\
      \
      <h3>Your 2022 DAO Income:</h3>\
      <ul>\
        <li>" +
    totalBANK?.innerHTML +
    " BANK </li>";
  if (totalWETH) {
    summaryData += "<li>" + totalWETH?.innerHTML + " WETH </li>";
  }
  if (totalDAI) {
    summaryData += "<li>" + totalDAI?.innerHTML + " DAI </li>";
  }
  summaryData +=
    "<li>y POOL </li>\
        <li>(add whatever else here)</li>\
      </ul>\
      \
      <p><strong>For a total of: " +
    totalIncome?.innerHTML +
    " " +
    fiatCode +
    "</strong> at income tax rate of " +
    taxRate.value +
    "%.</p>\
      \
      <p>TaxMan is a project by Bankless Card.</p>\
    </div>";

  // csvData = "a,b,c\r\n1,2,x\r\n2,1,x\r\n3,5,y\r\n4,6,y\r\n";

  // "data:text/csv;charset=utf-8,a%2Cb%2Cc%0A1%2C2%2Cx%0A2%2C1%2Cx%0A3%2C5%2Cy%0A4%2C6%2Cy%0A";
  let encodeCsv = btoa(csvData);
  console.log(encodeCsv);

  // get user email from DOM
  let emailReceipt = (document.getElementById(
    "mailSubmit"
  ) as HTMLInputElement)!.value;
  console.log(emailReceipt);

  if (emailReceipt !== "") {
    alert(
      "Email send -> pending. Please wait for next dialog confirmation before closing app."
    );
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
          name: "TaxManSummary2022-" + emailReceipt + ".csv",
          // path: "./data/csvSample.csv",    // this is the file path
          data: encodeCsv, // this is the encoded file data
          contentType: "text/csv",
        },
      ],
    }).then(function (message: any) {
      console.log(message);
      if (message === "OK") {
        alert(
          "Email sent successfully. Thanks for using Bankless Card TaxMan! You're free to go check your mail."
        );
      } else {
        alert("mail failed to send with message: " + message);
      }
    });
  } else {
    alert("Please enter your email address");
  }
}
