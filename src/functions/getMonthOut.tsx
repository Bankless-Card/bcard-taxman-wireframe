export function getMonthOut(month:string) {
    let monthOut = "";
  
    switch(month) {
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