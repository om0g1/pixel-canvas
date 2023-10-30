import React from "react";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import ColorPicker from "./ColorPicker";

const LeftBar = () => {
    return (
        <Sidebar>
            <Toolbar />
            <ColorPicker />
        </Sidebar>
    )
}

export default LeftBar;