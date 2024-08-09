import "./index.css"

export default function Recap( { recapImg, location, currentDegrees, weatherCondition, high, low, feelsTemp} ) {
    return(
        <div id="recap">
            <img src={recapImg} alt="" />
            <div id="recapData">
                <p id="location">{location}</p>
                <p id="currentDegrees">{currentDegrees}°</p>
                <p id="weatherCondition">{weatherCondition}</p>
                <p id="high-low">{low}° / {high}°</p>
                <p id="feelsTemp">Feels like {feelsTemp}°</p>
            </div>
        </div>
    );
}