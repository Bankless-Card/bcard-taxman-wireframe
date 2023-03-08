import cs from '../style.module.css'
export function toggleSwitch(state:any) {

    // console.log('toggleSwitch', state)
  
    let incomeOn = '<img class='+cs.inBadge+' src="./src/img/inBadge.png" alt="Income" height="30" /> Income | Received';
    let incomeOff = '<img class='+cs.niBadge+' src="./src/img/close.png" alt="Income Off" height="30" /> NOT INCOME';
  
    if(state === "INCOME"){
      return incomeOn;
    } else {
      return incomeOff;
    }

}