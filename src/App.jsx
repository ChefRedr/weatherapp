import "./index.css"
import Nav from "./Nav.jsx";
import Menu from "./Menu.jsx";
import { useEffect, useState } from "react";
import Recap from './Recap.jsx';
import appIcon from "./assets/appicon.png";
import DailyWeather from "./DailyWeather.jsx";
import WeeklyWeather from "./WeeklyWeather.jsx";
import BarStat from "./BarStat.jsx";
import Astro from "./Astro.jsx";
import sunImage from "./assets/sun.png"
import moonImage from "./assets/moon.png"

function getTime() {
  const currentDate = new Date();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return currentTime;
}

export default function App() {

  const [updatedTime, setUpdatedTime] = useState("00:00");
  const [city, setCity] = useState("");

  // Recap.jsx
  const [displayCity, setDisplayCity] = useState("Search City...");
  const [weatherImg, setWeatherImg] = useState(appIcon);
  const [currentTemp, setCurrentTemp] = useState("#");
  const [condition, setCondition] = useState("...");
  const [dailyHigh, setDailyHigh] = useState("#");
  const [dailyLow, setDailyLow] = useState("#");
  const [feelsLikeTemp, setFeelsLikeTemp] = useState("#");

  // DailyWeather.jsx
  const [hourlyTempArray, setHourlyTempArray] = useState("");

  // WeeklyWeather.jsx
  const [weeklyTempArray, setWeeklyTempArray] = useState("");

  // BarStat.jsx
  const [humidity, setHumidity] = useState(0);
  const [aqi, setAqi] = useState(0);
  const [uvIndex, setUvIndex] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState("");
  const [visibility, setVisibility] = useState(0);
  const [dewPoint, setDewPoint] = useState(0);

  // Astro.jsx
  const [sunriseTime, setSunriseTime] = useState("00:00");
  const [sunsetTime, setSunsetTime] = useState("00:00");
  const [moonPhase, setMoonPhase] = useState("...");
  const [moonIllumination, setMoonIllumination] = useState("...");

  const API_KEY = "e63fee57e5524ff38e615336240808";

  async function weatherData(currCity) {
    const FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${currCity}&days=7&aqi=yes`;
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
      setCurrentTemp(Math.round(weatherJson["current"]["temp_f"]));
      setCondition(weatherJson["current"]["condition"]["text"]);
      setDailyLow(Math.round(weatherJson["forecast"]["forecastday"][0]["day"]["mintemp_f"]));
      setDailyHigh(Math.round(weatherJson["forecast"]["forecastday"][0]["day"]["maxtemp_f"]));
      setFeelsLikeTemp(Math.round(weatherJson["current"]["feelslike_f"]));

      setHourlyTempArray(weatherJson["forecast"]["forecastday"][0]["hour"]);
      setWeeklyTempArray(weatherJson["forecast"]["forecastday"])

      setHumidity(weatherJson["current"]["humidity"]);
      setAqi(weatherJson["current"]["air_quality"]["us-epa-index"]);
      setUvIndex(weatherJson["current"]["uv"]);
      setWindSpeed(weatherJson["current"]["wind_mph"]);
      setWindDirection(weatherJson["current"]["wind_dir"]);
      setVisibility(weatherJson["forecast"]["forecastday"][0]["day"]["avgvis_miles"]);
      setDewPoint(Math.round(weatherJson["current"]["dewpoint_f"]));

      setSunriseTime(weatherJson["forecast"]["forecastday"][0]["astro"]["sunrise"]);
      setSunsetTime(weatherJson["forecast"]["forecastday"][0]["astro"]["sunset"]);
      setMoonPhase(weatherJson["forecast"]["forecastday"][0]["astro"]["moon_phase"]);
      setMoonIllumination(weatherJson["forecast"]["forecastday"][0]["astro"]["moon_illumination"]);
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
      <Menu />
      <Nav time={updatedTime} handleClick={updateCity} reload={reload}/>
      <main id="content">
        <Recap recapImg={weatherImg} location={displayCity} currentDegrees={currentTemp} weatherCondition={condition} high={dailyHigh} low={dailyLow} feelsTemp={feelsLikeTemp}/>
        <DailyWeather dailyWeather={hourlyTempArray}/>
        <WeeklyWeather weeklyWeather={weeklyTempArray}/>
        <section className="barStats">
          <BarStat type="🌧 Humidity" value={humidity+"%"}/>
          <BarStat type="△ AQI" value={aqi}/>
          <BarStat type="☼ UV Index" value={uvIndex}/>
        </section>
        <section className="barStats">
          <BarStat type="༄ Wind" value={windSpeed} windDirection={windDirection}/>
          <BarStat type="🌡Dewpoint" value={dewPoint + "°"}/>
          <BarStat type="◉ Visibility" value={visibility + " miles"}/>
        </section >
        <Astro img={sunImage} info1={"Sunrise: " + sunriseTime} info2={"Sunset: " + sunsetTime}/>
        <Astro img={moonImage} info1={"Phase: " + moonPhase} info2={"Light: " + moonIllumination + "%"}/>
      </main>
      <footer>
        <p>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>
      </footer>
    </div>
  );

}