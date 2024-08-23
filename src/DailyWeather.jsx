import "./index.css"

function DailyMetric({ time, weatherImg, temp, rainChance }) {
    return(
        <article id="dailyWeatherMetric">
            <p>{time}</p>
            <img src={weatherImg} alt="weather condition image" />
            <p>{temp}°</p>
            <p id="rain2">☂{rainChance}%</p>
        </article>
    );
}

export default function DailyWeather({ dailyWeather }) {
    let dailyMetrics;
    if(dailyWeather.length != 0) {
        dailyMetrics = dailyWeather.map((dailyInfo)=>{
            const time = dailyInfo["time"].slice(11, 16);
            const weatherImg = dailyInfo["condition"]["icon"];
            const temp = Math.round(dailyInfo["temp_f"]);
            const rainChance = dailyInfo["chance_of_rain"];
            return(
                <DailyMetric key={time} time={time} weatherImg={weatherImg} temp={temp} rainChance={rainChance}/>
            );
        });
    }

    return(
        <section id="dailyWeatherContainer" tabIndex="0">
            {dailyMetrics}
        </section>
    );
}