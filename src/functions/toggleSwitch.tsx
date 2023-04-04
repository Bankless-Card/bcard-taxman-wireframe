import cs from '../style.module.css'
export function toggleSwitch(state:any) {

    // console.log('toggleSwitch', state)
  
    let incomeOn = '<img class='+cs.inBadge+' src="/img/inBadge.png" alt="Income" width="30" height="30" />';
    let incomeOff = '<img class='+cs.niBadge+' src="/img/ni.png" alt="Income Off" height="30" width="50" />';
  
    if(state === "INCOME"){
      return incomeOn;
    } else {
      return incomeOff;
    }

}