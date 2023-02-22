import React from 'react'; // we need this to make JSX compile

// import '../style.module.css'
import cs from '../style.module.css'

export function toggleAlts(e:any) {
  e.preventDefault();

  console.log(cs.NOT);
  let nots = document.getElementsByClassName(cs.NOT);
  console.log(nots);

  [].forEach.call(nots, function (el:any) {
    el.style.display = 'block';
  });

  let alts = document.getElementsByClassName("BANK");
  console.log(alts);

  [].forEach.call(alts, function (el:any) {
    el.style.display = 'none';
  });


}