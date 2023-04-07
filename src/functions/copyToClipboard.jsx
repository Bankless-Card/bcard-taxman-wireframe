// Function for copying
export function copyToClipboard(text) {
    const tempElement = document.createElement("textarea");
    tempElement.value = text;
    document.body.appendChild(tempElement);

    tempElement.select();
    tempElement.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(tempElement);
  }