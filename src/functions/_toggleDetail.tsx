// import React from 'react'; // we need this to make JSX compile
import cs from '../style.module.css'

export function toggleDetail(e:any){
  if(e){e.preventDefault();}
 
   let allDetails = document.getElementsByClassName(cs.detail);
   console.log(allDetails);
 
   [].forEach.call(allDetails, function (el:any) {
     if(el.style.display === 'block') {
       el.style.display = 'none';
     } else {
       el.style.display = 'block';
     }
     
   });
 
 }

// export function toggleAlts(e:any) {
//   e.preventDefault();

//   console.log(cs.NOT);
//   let nots = document.getElementsByClassName(cs.NOT);
//   console.log(nots);

//   [].forEach.call(nots, function (el:any) {
//     el.style.display = 'block';
//   });

//   let alts = document.getElementsByClassName("BANK");
//   console.log(alts);

//   [].forEach.call(alts, function (el:any) {
//     el.style.display = 'none';
//   });


// }