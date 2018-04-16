#!/usr/bin/env node

// <bitbar.title>Bitbar Wunderground</bitbar.title>
// <bitbar.version>v0.1</bitbar.version>
// <bitbar.author>Leo Herzog</bitbar.author>
// <bitbar.author.github>xd1936</bitbar.author.github>
// <bitbar.desc>Local Wunderground conditions, in your Bitbar</bitbar.desc>
// <bitbar.dependencies>node.js, wundergrounded, ipapi.co (if using auto location)</bitbar.dependencies>
// <bitbar.image></bitbar.image>

const apikey = 'axxxxxxxxxxxxxxxx';
const location = 'auto'; // 'auto', zip code, city and state, latlong, pws:ID, etc
const imperial = false; // true or false

const Wundergrounded = require('wundergrounded');
const wundergrounded = new Wundergrounded().apiKey(apikey);

function start() {
  determineLocation();
}

function determineLocation() {
  if (!location || location == 'auto') {
    const ip = require('ipapi.co');
    ip.location(ipLocationDetermined);
  } else {
    getWeather(location);
  }
}

function ipLocationDetermined(loc) {
  if (!loc) {
    printError("Problem getting IP location");
  }
  getWeather(loc.latitude + ',' + loc.longitude);
}

function getWeather(loc) {
  wundergrounded.conditions().astronomy().request(loc, function(error, response) {
    if (error) {
      printError(error.response.error.toString());
    } else if (response.response.results) {
      var locations = [];
      for (var i in response.response.results) {
        locations.push(response.response.results[i].city + ", " + response.response.results[i].state + ", " + response.response.results[i].country);
      }
      printError("Found " + response.response.results.length + " possible locations. " + locations.join("; "));
    } else {
      printWeather(response);
    }
  });
}

function printWeather(weather) {
  var observed = new Date(weather.current_observation.local_time_rfc822);
  var sunrise = new Date(weather.current_observation.local_time_rfc822);
  var sunset = new Date(weather.current_observation.local_time_rfc822);
  sunrise.setHours(weather.sun_phase.sunrise.hour, weather.sun_phase.sunrise.minute);
  sunset.setHours(weather.sun_phase.sunset.hour, weather.sun_phase.sunset.minute);
  var nighttime = true;
  if (observed > sunrise && observed < sunset) {
    nighttime = false;
  }

  var w = weather.current_observation;

  var icon = getWundergroundIcon(w.icon, nighttime);
  if (imperial) {
    console.log(icon + " " + w.temp_f + "°F");
    console.log("---");
    console.log("Currently " + w.weather + " " + icon);
    console.log("Feels Like: " + w.feelslike_f + "°F");
    console.log("Dewpoint: " + w.dewpoint_f + "°F");
    console.log("Relative Humidity: " + w.relative_humidity);
    console.log("Pressure: " + w.pressure_in + "in/Hg " + convertPressure(w.pressure_trend));
    console.log("Visibility: " + w.visibility_mi + "mi");
    console.log("Wind: " + convertWindDirection(w.wind_degrees) + " From the " + w.wind_dir + " at " + w.wind_mph.toString().split(".")[0] + "mph, gusting to " + w.wind_gust_mph.toString().split(".")[0] + "mph");
  } else {
    console.log(icon + " " + w.temp_c + "°C");
    console.log("---");
    console.log("Currently " + w.weather + " " + icon);
    console.log("Feels Like: " + w.feelslike_c + "°C");
    console.log("Dewpoint: " + w.dewpoint_c + "°C");
    console.log("Relative Humidity: " + w.relative_humidity);
    console.log("Pressure: " + w.pressure_mb + "mb " + convertPressure(w.pressure_trend));
    console.log("Visibility: " + w.visibility_km + "km");
    console.log("Wind: " + convertWindDirection(w.wind_degrees) + " From the " + w.wind_dir + " at " + w.wind_kph.toString().split(".")[0] + "km/h, gusting to " + w.wind_gust_kph.toString().split(".")[0] + "km/h");
  }

  console.log("---");
  console.log("Forecast for " + w.display_location.full + " | href=" + w.forecast_url);
  console.log("Station " + w.station_id + " | href=" + w.history_url);
  console.log(w.observation_time + "  ↻ | refresh=true");

  process.exit();

}

function printError(error) {
  console.log("🛰️");
  console.log("---");
  console.log("Error: " + error);
  process.exit();
}

// possible options: https://www.wunderground.com/weather/api/d/docs?d=resources/icon-sets (image file names)
function getWundergroundIcon(condition, nighttime) {
  if (!nighttime || typeof nighttime != "boolean") {
    var nighttime = false;
  }
  switch (true) {
    case condition.includes("sunny") && nighttime:
    case condition.includes("clear") && nighttime:
      var conditionEmoji = "🌙 ";
      break;
    case condition.includes("sunny") && !nighttime:
    case condition.includes("clear") && !nighttime:
      var conditionEmoji = "☀️ ";
      break;
    case condition.includes("partlysunny"):
    case condition.includes("mostlysunny"):
      var conditionEmoji = "⛅ ";
      break;
    case condition.includes("partlycloudy"):
    case condition.includes("mostlycloudy"):
      var conditionEmoji = "🌥️ ";
      break;
    case condition.includes("cloudy"):
    case condition.includes("fog"):
    case condition.includes("hazy"):
      var conditionEmoji = "☁️ ";
      break;
    case condition.includes("rain"):
    case condition.includes("sleet"):
      var conditionEmoji = "🌧️ ";
      break;
    case condition.includes("tstorms"):
      var conditionEmoji = "⛈️ ";
      break;
    case condition.includes("snow"):
    case condition.includes("flurries"):
      var conditionEmoji = "🌨️ ";
      break;
    default:
      var conditionEmoji = "🛰️";
  }
  return conditionEmoji;
}

function convertPressure(trend) {
  switch (trend) {
    case "+":
      return "↗";
    case "-":
      return "↘";
    default:
      return "→";
  }
}

// reversed, since we start with the direction that the wind is coming _from_
function convertWindDirection(degrees) {
  degrees = new Number(degrees);
  switch (true) {
    case (degrees < 22.5):
      return "↓";
    case (degrees < 67.5):
      return "↙";
    case (degrees < 112.5):
      return "←";
    case (degrees < 157.5):
      return "↖";
    case (degrees < 202.5):
      return "↑";
    case (degrees < 247.5):
      return "↗";
    case (degrees < 292.5):
      return "→";
    case (degrees < 337.5):
      return "↘";
    case (degrees < 360):
      return "↓";
    default:
      return "↻";
  }
}

start();
