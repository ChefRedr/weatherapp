import "./index.css"

export default function BarStat({ type, value, windDirection="?" }) {
    if(type == "༄ Wind") {
        return(
            <article className="barStat">
                <p className="type">{type}</p>
                <p>{value} mph ({windDirection})</p>
            </article>
        );
    }
    else {
        return(
            <article className="barStat">
                <p className="type">{type}</p>
                <p>{value}</p>
            </article>
        );
    }
}