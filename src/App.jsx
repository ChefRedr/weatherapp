import Nav from "./Nav.jsx";
import { useEffect, useState } from "react";
import Recap from './Recap.jsx';

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
  const [city, setCity] = useState("");

  const API_KEY = "e63fee57e5524ff38e615336240808";

  async function weatherData() {
    const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
    const response = await fetch(API_URL);
    const jsonObject = await response.json();
    console.log(jsonObject);
  }

  // Fetches API and updates data everytime the city changes
  useEffect(()=>{
    if(city) {
      weatherData();
    }
  }, [city]);

  function updateCity(newCity) {
    let newTime = getTime();
    setUpdatedTime(newTime);
    setCity(newCity);
  }

  function reload() {
    if(city != "") {
      let newTime = getTime();
      setUpdatedTime(newTime);
      weatherData();
    }
  }

  return (
    <div>
      <Nav time={updatedTime} handleClick={updateCity} reload={reload}/>
      <div id="content">
        <Recap location={city} currentDegrees={32} weatherCondition={"Sunny"} high={32} low={32} feelsTemp={32}/>
      </div>
    </div>
  );

}