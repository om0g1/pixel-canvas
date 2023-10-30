import React, { useState , useEffect, useRef} from "react";
import ColorPicker from "./ColorPicker";

const CanvasWrapper = () => {
    let zooming = 1.5;
    const canvasRef = useRef(null);
    const gridCanvasRef = useRef(null);
    const [penColor, setPenColor] = useState("black");

    let isDragging = false;
    let handlePan = {
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0
    }
    let cellSize = 0;

    useEffect(() => {
        const pixelCanvas = canvasRef.current;
        const gridCanvas = gridCanvasRef.current;
        const canvasWrapper = pixelCanvas.parentElement;
        const pen = pixelCanvas.getContext("2d");
        const gridPen = gridCanvas.getContext("2d");

        const canvases = [pixelCanvas, gridCanvas]

        function magnifyCanvases() {
            cellSize = pixelCanvas.width / 16;
            const width = canvasWrapper.getBoundingClientRect().width / zooming;
            const height = canvasWrapper.getBoundingClientRect().height / zooming;
            canvases.forEach((canvas) => {
                canvas.width = width + cellSize - (width % cellSize);
                canvas.height = height + cellSize - (height % cellSize);
            })
            drawGrid();
        }

        function drawGrid() {
            gridPen.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
            gridPen.beginPath();
            for (let x = 0; x <= pixelCanvas.width + cellSize; x += cellSize) {
                gridPen.moveTo(x, 0);
                gridPen.lineTo(x, pixelCanvas.height);
            }
            for (let y = 0; y <= pixelCanvas.height + cellSize; y += cellSize) {
                gridPen.moveTo(0, y);
                gridPen.lineTo(pixelCanvas.width, y);
            }
            gridPen.stroke();
        }
        
        function drawPixel(x, y) {
            pen.fillStyle = penColor;
            const xIndex = Math.floor(x - (x % cellSize));
            const yIndex = Math.floor(y - (y % cellSize));
            pen.fillRect(xIndex, yIndex, cellSize, cellSize);
            pen.fill();
        }

        function changeColor(color) {
            setPenColor(color);
        }

        pixelCanvas.onwheel = (e) => {
            zooming += e.deltaY * 0.001;
            magnifyCanvases();
        }

        pixelCanvas.onmousedown = (e) => {
            if (e.button == 0) {
                const x = e.clientX - pixelCanvas.getBoundingClientRect().left;
                const y = e.clientY - pixelCanvas.getBoundingClientRect().top;
                drawPixel(x, y);
            } else if (e.button == 1) {
                isDragging = true;
                handlePan.startX = e.clientX;
                handlePan.startY = e.clientY;
            }
        }

        pixelCanvas.onmouseup = (e) => {
            isDragging = false;
            pixelCanvas.style.cursor = "auto";
        }

        pixelCanvas.onmouseleave = (e) => {
            isDragging = false;
            pixelCanvas.style.cursor = "auto";
        }

        pixelCanvas.onmousemove = (e) => {
            if (e.buttons == 1) {
                const x = e.clientX - pixelCanvas.getBoundingClientRect().left;
                const y = e.clientY - pixelCanvas.getBoundingClientRect().top;
                drawPixel(x, y);
            } else if (isDragging) {
                pixelCanvas.style.cursor = "grab";
                const deltaX = e.clientX - handlePan.startX;
                const deltaY = e.clientY - handlePan.startY;
                canvases.forEach((canvas) => {
                    canvas.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                })
                
            }
        }

        // pen.clearRect(0, 0, pixelCanvas.width, pixelCanvas.height);
        pen.fillRect(0, 0, pixelCanvas.width, pixelCanvas.height);
        gridPen.strokeStyle = "black";
        magnifyCanvases();

    }, [zooming]);

    return (
        <div id="canvas-wrapper">
            <ColorPicker changeColor={setPenColor} />
            <canvas ref={canvasRef} id="canvas"></canvas>
            <canvas ref={gridCanvasRef} id="grid"></canvas>
        </div>
    )
}

export default CanvasWrapper;