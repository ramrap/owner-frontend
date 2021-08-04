var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
weekday[7] = "Sun";
weekday[8] = "Mon";
weekday[9] = "Tues";
weekday[10] = "Wed";
weekday[11] = "Thur";
weekday[12] = "Fri";
weekday[13] = "Sat";


export const toLocalTime = () => {
    return null;
};

export const numberToNth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
}

export const stringToTime = function (timeString) {
    var date = new Date("1970-01-01 " + timeString);
    return date.toLocaleTimeString([], { timeStyle: "short" });
};

export const datetimeToDateString = (date) => {
    return date.toISOString().slice(0,10).replace(/-/g,"-");
}

export const datetimeToWeekdayString = (date, small=false) => {
    return weekday[date.getDay() + (small ? 7 : 0)];
}

export function timeStringToDate(timeString) {
    var date = new Date("1970-01-01 " + timeString);
    
    return date;
}

export function datetimeToAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}