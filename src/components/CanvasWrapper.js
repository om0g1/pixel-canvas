import React, {useEffect, useRef} from "react";

const CanvasWrapper = () => {
    let zooming = 1.5;
    const canvasRef = useRef(null);
    let isDragging = false;
    let handlePan = {
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0
    }
    let cellSize = 0;

    useEffect(() => {
        const canvas = canvasRef.current;
        const gridCanvas = canvas.firstChild;
        const canvasWrapper = canvas.parentElement;
        const pen = canvas.getContext("2d");
        const gridPen = gridCanvas.getContext("2d");

        canvas.width = canvasWrapper.getBoundingClientRect().width / zooming;
        canvas.height = canvasWrapper.getBoundingClientRect().height / zooming;
        
        cellSize = canvas.width / 16;

        canvas.onwheel = (e) => {
            zooming += e.deltaY * 0.001;
            canvas.width = canvasWrapper.getBoundingClientRect().width / zooming;
            canvas.height = canvasWrapper.getBoundingClientRect().height / zooming;
        }

        canvas.onmousedown = (e) => {
            if (e.button == 1) {
                isDragging = true;
                handlePan.startX = e.clientX;
                handlePan.startY = e.clientY;
            }
        }

        canvas.onmouseup = (e) => {
            isDragging = false;
            canvas.style.cursor = "auto";
        }

        canvas.onmouseleave = (e) => {
            isDragging = false;
            canvas.style.cursor = "auto";
        }

        canvas.onmousemove = (e) => {
            if (isDragging) {
                canvas.style.cursor = "grab";
                const deltaX = e.clientX - handlePan.startX;
                const deltaY = e.clientY - handlePan.startY;
                canvas.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            }
        }

        canvas.onload = () => {
            grid.width = canvas.width;
            grid.height = canvas.height;
        }

    }, [zooming]);

    return (
        <div id="canvas-wrapper">
            <canvas ref={canvasRef} id="canvas">
                <canvas></canvas>
            </canvas>
        </div>
    )
}

export default CanvasWrapper;