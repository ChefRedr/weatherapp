export default function Recap( {location, currentDegrees, weatherCondition, high, low, feelsTemp} ) {
    return(
        <div id="recapData">
            <p>{location}</p>
            <p>{currentDegrees}°</p>
            <p>{weatherCondition}</p>
            <p>{high}° / {low}°</p>
            <p>Feels like {feelsTemp}°</p>
        </div>
    );
}