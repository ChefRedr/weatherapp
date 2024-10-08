import "./index.css"

function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
}

function WeeklyMetric({ date, rainChance, weatherImg, lowTemp, highTemp }) {
    return(
        <section id="weeklyWeatherMetric">
            <p className="weeklyWeatherComponent date">{date}</p>
            <p className="weeklyWeatherComponent rain" id="rain1">☂{rainChance}%</p>
            <img className="weeklyWeatherComponent weatherImg" src={weatherImg} alt="weather condition image" />
            <p className="weeklyWeatherComponent temp">{highTemp}° / {lowTemp}°</p>
        </section>
    );
}

export default function WeeklyWeather({ weeklyWeather }) {
    let weeklyMetrics;
    if(weeklyWeather.length != 0) {
        weeklyMetrics = weeklyWeather.map((weeklyInfo)=>{
            const date = getDayOfWeek(weeklyInfo["date"]);
            const rainChance = weeklyInfo["day"]["daily_chance_of_rain"];
            const weatherImg = weeklyInfo["day"]["condition"]["icon"];
            const lowTemp = Math.round(weeklyInfo["day"]["mintemp_f"]);
            const highTemp = Math.round(weeklyInfo["day"]["maxtemp_f"]);
            return(
                <WeeklyMetric key={date} date={date} rainChance={rainChance} weatherImg={weatherImg} lowTemp={lowTemp} highTemp={highTemp} />
            );
        });
    }

    return(
        <section id="weeklyWeatherContainer" tabIndex="0">
            {weeklyMetrics}
        </section>
    );
}