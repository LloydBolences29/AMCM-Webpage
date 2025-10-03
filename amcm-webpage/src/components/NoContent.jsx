import React from "react";
import "../styles/NoContent.css"
const NoContent = () => {
    return (
        <>
            <div id="no-content-wrapper">
                <div id="no-content-image-wrapper">
                    <img src="/no-content.png" alt="no-content-available" id="no-content-image" />
                </div>

                <div id="no-content-text-wrapper">
                    <p id="no-content-text">No news and updates at the moment, but good things are coming. Just wait for it.</p>
                </div>
            </div>
        </>
    )
}

export default NoContent;