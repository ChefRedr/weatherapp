import "./index.css"

export default function BarStat({ type, value }) {
    return(
        <div className="barStat">
            <p className="type">{type}</p>
            <p>{value}</p>
        </div>
    );
}