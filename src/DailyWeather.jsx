import "./index.css"
import appIcon from "./assets/appicon.png";

function DailyMetric({ time, weatherImg, temp, rainChance }) {
    return(
        <div id="dailyWeatherMetric">
            <p>{time}</p>
            <img src={weatherImg} alt="wut" />
            <p>{temp}°</p>
            <p>☂{rainChance}%</p>
        </div>
    );
}

// <div id="dailyWeatherContainer">
export default function DailyWeather({ dailyWeather }) {
    let dailyMetrics;
    if(dailyWeather.length != 0) {
        dailyMetrics = dailyWeather.map((dailyInfo)=>{
            const time = dailyInfo["time"].slice(11, 16);
            const weatherImg = dailyInfo["condition"]["icon"];
            const temp = dailyInfo["temp_f"];
            const rainChance = dailyInfo["chance_of_rain"];
            return(
                <DailyMetric key={time} time={time} weatherImg={weatherImg} temp={temp} rainChance={rainChance}/>
            );
        });

        
    }

    return(
        <div id="dailyWeatherContainer">
            {dailyMetrics}
        </div>
    );
}