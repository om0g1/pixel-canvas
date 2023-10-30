import React from "react";
import Sidebar from "./Sidebar";
import CanvasWrapper from "./CanvasWrapper";

const WorkingArea = () => {
    return (
        <div id="working-area">
            <Sidebar />
            <CanvasWrapper />
            <Sidebar />
        </div>
    )
}

export default WorkingArea;