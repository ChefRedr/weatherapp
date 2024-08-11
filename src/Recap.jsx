import "./index.css"

export default function Recap( { recapImg, location, currentDegrees, weatherCondition, high, low, feelsTemp} ) {
    return(
        <section id="recap">
            <img src={recapImg} alt="Picture of the weather condition" />
            <div id="recapData">
                <p id="location">{location}</p>
                <p id="currentDegrees">{currentDegrees}°</p>
                <p id="weatherCondition">{weatherCondition}</p>
                <p id="high-low">{high}° / {low}°</p>
                <p id="feelsTemp">Feels like {feelsTemp}°</p>
            </div>
        </section>
    );
}