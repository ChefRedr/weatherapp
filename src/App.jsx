import "./index.css"
import Nav from "./Nav.jsx";
import { useEffect, useState } from "react";
import Recap from './Recap.jsx';
import appIcon from "./assets/appicon.png";
import DailyWeather from "./DailyWeather.jsx"
import WeeklyWeather from "./WeeklyWeather.jsx"

// Make sure to shout out the API

function getTime() {
  const currentDate = new Date();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return currentTime;
}

export default function App() {

  const [loadDailyWeather, setLoadDailyWeather] = useState(false);

  const [updatedTime, setUpdatedTime] = useState("00:00");
  const [city, setCity] = useState("");
  const [displayCity, setDisplayCity] = useState("Search City...");
  const [weatherImg, setWeatherImg] = useState(appIcon);
  const [currentTemp, setCurrentTemp] = useState("#");
  const [condition, setCondition] = useState("...");
  const [dailyHigh, setDailyHigh] = useState("#");
  const [dailyLow, setDailyLow] = useState("#");
  const [feelsLikeTemp, setFeelsLikeTemp] = useState("#");
  const [weeklyTempArray, setWeeklyTempArray] = useState("");
  const [hourlyTempArray, setHourlyTempArray] = useState("");

  const API_KEY = "e63fee57e5524ff38e615336240808";

  async function weatherData(currCity) {
    const FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${currCity}&days=7`;
    const response = await fetch(FORECAST_URL);
    const weatherJson = await response.json(); 
    console.log(weatherJson);

    // Failed to retrieve data
    if("error" in weatherJson) {
      setDisplayCity("No matching location found");
    }
    else {
      setWeatherImg(weatherJson["current"]["condition"]["icon"]);
      setCity(weatherJson["location"]["name"]);
      setDisplayCity(weatherJson["location"]["name"]);
      setCurrentTemp(weatherJson["current"]["temp_f"]);
      setCondition(weatherJson["current"]["condition"]["text"]);
      setDailyLow(weatherJson["forecast"]["forecastday"][0]["day"]["mintemp_f"]);
      setDailyHigh(weatherJson["forecast"]["forecastday"][0]["day"]["maxtemp_f"]);
      setFeelsLikeTemp(weatherJson["current"]["feelslike_f"]);
      setWeeklyTempArray(weatherJson["forecast"]["forecastday"])
      setHourlyTempArray(weatherJson["forecast"]["forecastday"][0]["hour"]);
    }
  }

  // Fetches API and updates data everytime the city changes
  useEffect(()=>{
    if(city) {
      console.log(hourlyTempArray);
    }
  }, [city]);

  function updateCity(newCity) {
    if(newCity != "") {
      let newTime = getTime();
      setUpdatedTime(newTime);
      setCity(newCity);
      weatherData(newCity);
    }
  }

  function reload() {
    if(city != "") {
      let newTime = getTime();
      setUpdatedTime(newTime);
      weatherData(city);
    }
  }

  return (
    <div>
      <Nav time={updatedTime} handleClick={updateCity} reload={reload}/>
      <div id="content">
        <Recap recapImg={weatherImg} location={displayCity} currentDegrees={currentTemp} weatherCondition={condition} high={dailyHigh} low={dailyLow} feelsTemp={feelsLikeTemp}/>
        <DailyWeather dailyWeather={hourlyTempArray}/>
        <WeeklyWeather weeklyWeather={weeklyTempArray}/>
      </div>
    </div>
  );

}