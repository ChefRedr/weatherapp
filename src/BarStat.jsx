import "./index.css"

function getDirection(degrees) {
    if(degrees > 337 && degrees <= 22)  { return("N"); }
    if(degrees > 22 && degrees <= 67)   { return("NE"); }
    if(degrees > 67 && degrees <= 112)  { return("E"); }
    if(degrees > 112 && degrees <= 157) { return("SE"); }
    if(degrees > 157 && degrees <= 202) { return("S"); }
    if(degrees > 202 && degrees <= 247) { return("SW"); }
    if(degrees > 247 && degrees <= 292) { return("W"); }
    if(degrees > 292 && degrees <= 337) { return("NW"); }
    else                                { return("?"); }
}

export default function BarStat({ type, value, windDirection="" }) {
    if(type == "༄ Wind") {
        let direction = getDirection(windDirection);
        return(
            <div className="barStat">
                <p className="type">{type}</p>
                <p>{value} ({direction})</p>
            </div>
        );
    }
    else {
        return(
            <div className="barStat">
                <p className="type">{type}</p>
                <p>{value}</p>
            </div>
        );
    }
}