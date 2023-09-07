// Search form

class MyScriptHelper {
  static formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  static getTime() {
    let now = new Date();

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[now.getDay()];
    let hour = now.getHours();
    let minutes = (`0` + now.getMinutes()).slice(-2);
    return { day, minutes, hour };
  }
}
