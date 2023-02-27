export function searchTree(element, matchingTitle) {
    if(element.title == matchingTitle) {
       return element;
  } else if (element.children != null) {
       var i;
       var result = null;
       for(i=0; result == null && i < element.children.length; i++){
            result = searchTree(element.children[i], matchingTitle);
       }
       return result;
  }
  return null;
}