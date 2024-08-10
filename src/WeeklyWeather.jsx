import "./index.css"

function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
}

function WeeklyMetric({ date, rainChance, weatherImg, lowTemp, highTemp }) {
    return(
        <div id="weeklyWeatherMetric">
            <p>{date}</p>
            <p className="weeklyWeatherRight" id="rain1">☂{rainChance}%</p>
            <img className="weeklyWeatherRight" src={weatherImg} alt="weather condition image" />
            <p className="weeklyWeatherRight">{highTemp}° / {lowTemp}°</p>
        </div>
    );
}

export default function WeeklyWeather({ weeklyWeather }) {
    let weeklyMetrics;
    if(weeklyWeather.length != 0) {
        weeklyMetrics = weeklyWeather.map((weeklyInfo)=>{
            const date = getDayOfWeek(weeklyInfo["date"]);
            const rainChance = weeklyInfo["day"]["daily_chance_of_rain"];
            const weatherImg = weeklyInfo["day"]["condition"]["icon"];
            const lowTemp = weeklyInfo["day"]["mintemp_f"];
            const highTemp = weeklyInfo["day"]["maxtemp_f"];
            return(
                <WeeklyMetric key={date} date={date} rainChance={rainChance} weatherImg={weatherImg} lowTemp={lowTemp} highTemp={highTemp} />
            );
        });
    }

    return(
        <div id="weeklyWeatherContainer">
            {weeklyMetrics}
        </div>
    );
}