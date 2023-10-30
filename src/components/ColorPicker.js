import React,{ useState } from "react";
import CanvasWrapper from "./CanvasWrapper";

const ColorPicker = ({ changeColor }) => {
    const [selectedColor, setSelectedColor] = useState("#000000");
    
    const handleColorChange = (e) => {
      const color = e.target.value;
      setSelectedColor(color);
      changeColor(color); // Call the changeColor prop function here.
    };
  
    return (
      <div id="color-picker">
        <input type="color" value={selectedColor} onChange={handleColorChange} />
      </div>
    );
  };

export default ColorPicker;