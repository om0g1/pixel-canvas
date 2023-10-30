import React from "react";
import LeftBar from "./LeftBar";
import CanvasWrapper from "./CanvasWrapper";
import RightBar from "./RightBar";

const WorkingArea = () => {
    return (
        <div id="working-area">
            <LeftBar />
            <CanvasWrapper />
            <RightBar />
        </div>
    )
}

export default WorkingArea;