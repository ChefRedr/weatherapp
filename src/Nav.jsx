import "./index.css"
import { useEffect, useRef } from "react";
import appIcon from "./assets/appicon.png";

export default function Nav({ time, handleClick, reload }) {

    const cityInputRef = useRef(null);

    useEffect(()=>{
        const cityInputElem = cityInputRef.current;

        let handleKeyUp = (event)=>{
            // Checking if the enter key is pressed and the search bar is selected
            if(event.key == "Enter") {
                updateCity();
            }
        }

        if(cityInputElem) {
            cityInputElem.addEventListener("keyup", handleKeyUp)
        }

        // Cleanup
        return () => {
            if (cityInputElem) {
                cityInputElem.removeEventListener("keyup", handleKeyUp);
            }
        }

    }, []);

    function updateCity() {
        const city = cityInputRef.current.value;
        handleClick(city);
    }

    return(
        <nav>
            <div>
                <p id="menuIcon">☰</p>
                <p className="zoomHide">Weather App API</p>
                <p id="updatedTimeLabel" className="zoomHide">Last Updated: {time}</p>
                <button id="reloadButton" className="zoomHide hoverable" type="button" onClick={reload}>⟳</button>
                <input id="searchCity" type="text" placeholder="🔍︎ Search City" ref={cityInputRef} />
            </div>
        </nav>
    );

} 