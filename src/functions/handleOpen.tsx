// import cs from '../style.module.css'
export function handleOpen(thisLink:any) {
  // figure out where we are in the DOM
  console.log(thisLink + 'This not yet working');
  // open/close the next details tab
  let details = thisLink.nextElementSibling;
  console.log(details);
  if (details.style.display === 'block') {
    details.style.display = 'none';
  } else {
    details.style.display = 'block';
  }

}