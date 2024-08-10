import "./index.css"
import Nav from "./Nav.jsx";
import { useEffect, useState } from "react";
import Recap from './Recap.jsx';
import appIcon from "./assets/appicon.png";

// Make sure to shout out the API

function getTime() {
  const currentDate = new Date();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return currentTime;
}

export default function App() {

  const [updatedTime, setUpdatedTime] = useState("00:00");
  const [city, setCity] = useState("Search City...");
  const [displayCity, setDisplayCity] = useState("Search City...");
  const [weatherImg, setWeatherImg] = useState(appIcon);
  const [currentTemp, setCurrentTemp] = useState("#");
  const [condition, setCondition] = useState("...");
  const [dailyHigh, setDailyHigh] = useState("#");
  const [dailyLow, setDailyLow] = useState("#");
  const [feelsLikeTemp, setFeelsLikeTemp] = useState("#");

  const API_KEY = "e63fee57e5524ff38e615336240808";

  async function weatherData(currCity) {
    // const CURRENT_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${currCity}`;
    const FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${currCity}`;
    const response = await fetch(FORECAST_URL);
    const weatherJson = await response.json(); 
    console.log(weatherJson);

    // Failed to retrieve data
    if("error" in weatherJson) {
      setDisplayCity("No matching location found");
    }
    else {
      setCity(weatherJson["location"]["name"]);
      setDisplayCity(weatherJson["location"]["name"]);
      setWeatherImg(weatherJson["current"]["condition"]["icon"]);
      setCurrentTemp(weatherJson["current"]["temp_f"]);
      setCondition(weatherJson["current"]["condition"]["text"]);
      setDailyHigh(weatherJson["forecast"]["forecastday"][0]["day"]["maxtemp_f"]);
      setDailyLow(weatherJson["forecast"]["forecastday"][0]["day"]["mintemp_f"]);
      setFeelsLikeTemp(weatherJson["current"]["feelslike_f"]);
    }
  }

  // Fetches API and updates data everytime the city changes
  // useEffect(()=>{
  //   if(city) {
  //     weatherData();
  //   }
  // }, [city]);

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
      </div>
    </div>
  );

}