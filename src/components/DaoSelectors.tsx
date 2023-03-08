import { useState } from 'react'

// import '../style.module.css'
// import cs from '../style.module.css'

export function DaoSelectors(props:any){

  console.log(props);

  // get incoming state of token selection with props.tokenState

  // console.log(props.tokenState);

  const [TOKEN, setTOKEN] = useState(props.tokenState);
  console.log(props.token, TOKEN);    // see current state

  //set the state to checked if true
  // props.tokenState = TOKEN;
  console.log ("Need to update the global token based on the selected state")

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
  if(props.name){

  
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
  
  } else {
    return (<div>Oops</div>);
  }
}