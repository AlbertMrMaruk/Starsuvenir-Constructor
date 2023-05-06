import React, { useRef, useEffect } from "react";
import { memo } from "react";
function CanvasComponent({ src, text, fontColor, fontSize, fontFamily }) {
  if (src === "" && text === "") return "";
  const orig_src = new Image();
  let container;
  let resize_canvas;
  let canvas_wrapp;
  const Canvas = (props) => {
    const canvasRef = useRef(null);
    const draw = (ctx) => {
      ctx.beginPath();
      if (src) {
        orig_src.src = src;
        orig_src.onload = function () {
          // Событие onLoad, ждём момента пока загрузится изображение
          // ctx.drawImage(orig_src, 0, 0, 400, 400); // Рисуем изображение от точки с координатами 0, 0
          resizeImage(300, 300);
        };
      } else {
        ctx.font = `${fontSize ?? "25"}px ${fontFamily ?? "Open Sans"}`;
        ctx.fillStyle = fontColor[0] ?? "white";
        ctx.fillText(text, 10, 50);
      }
    };
    useEffect(() => {
      const canvas = canvasRef.current;
      container = document.querySelector(".resize-container");
      canvas_wrapp = document.querySelector(".canvas-wrapp");
      const context = canvas.getContext("2d");
      resize_canvas = document.querySelector("#mainCanvas");
      //Our draw come here
      draw(context);
    }, [draw]);

    return <canvas id="mainCanvas" height={300} ref={canvasRef} {...props} />;
  };
  const startResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    document.addEventListener("mousemove", resizing);
    document.addEventListener("mouseup", endResize);
  };
  const endResize = function (e) {
    e.preventDefault();

    document.removeEventListener("mouseup", endResize);
    document.removeEventListener("touchend", endResize);
    document.removeEventListener("mousemove", resizing);
    document.removeEventListener("touchmove", resizing);
  };
  const event_state = {};
  let constrain = false;
  let min_width = 60;
  let min_height = 60;
  let max_width = 800;
  let max_height = 900;
  const saveEventState = (e) => {
    // Save the initial event details and container state
    event_state.container_width = container.offsetWidth;
    event_state.container_height = container.offsetHeight;
    event_state.container_left = container.offsetLeft;
    event_state.container_top = container.offsetTop;
    event_state.mouse_x =
      (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) +
      window.pageXOffset;
    event_state.mouse_y =
      (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) +
      window.pageYOffset;

    // This is a fix for mobile safari
    // For some reason it does not allow a direct copy of the touches property
    if (typeof e.originalEvent?.touches !== "undefined") {
      event_state.touches = [];
      e.originalEvent.touches.forEach((i, ob) => {
        event_state.touches[i] = {};
        event_state.touches[i].clientX = 0 + ob.clientX;
        event_state.touches[i].clientY = 0 + ob.clientY;
      });
    }
    event_state.evnt = e;
  };
  const resizeImage = function (width, height) {
    resize_canvas.width = width;
    resize_canvas.height = height;
    if (src) {
      resize_canvas.getContext("2d").drawImage(orig_src, 0, 0, width, height);
    } else {
      let ctx = resize_canvas.getContext("2d");
      ctx.font = `${fontSize ?? "25"}px ${fontFamily ?? "Open Sans"}`;
      ctx.fillStyle = fontColor[0] ?? "white";
      ctx.fillText(text, 10, 50);
    }
  };
  const resizing = function (e) {
    let mouse = {};
    let width,
      height,
      left,
      top,
      offset = container.offset;
    mouse.x =
      (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) +
      window.pageXOffset;
    mouse.y =
      (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) +
      window.pageYOffset;

    // Position image differently depending on the corner dragged and constraints
    if (event_state.evnt.target.classList.contains("resize-handle-se")) {
      width = mouse.x - event_state.container_left;
      height = mouse.y - event_state.container_top;
      left = event_state.container_left;
      top = event_state.container_top;
    } else if (event_state.evnt.target.classList.contains("resize-handle-sw")) {
      width =
        event_state.container_width - (mouse.x - event_state.container_left);
      height = mouse.y - event_state.container_top;
      left = mouse.x;
      top = event_state.container_top;
    } else if (event_state.evnt.target.classList.contains("resize-handle-nw")) {
      width =
        event_state.container_width - (mouse.x - event_state.container_left);
      height =
        event_state.container_height - (mouse.y - event_state.container_top);
      left = mouse.x;
      top = mouse.y;
      if (constrain || e.shiftKey) {
        top = mouse.y - ((width / orig_src.width) * orig_src.height - height);
      }
    } else if (event_state.evnt.target.classList.contains("resize-handle-ne")) {
      width = mouse.x - event_state.container_left;
      height =
        event_state.container_height - (mouse.y - event_state.container_top);
      left = event_state.container_left;
      top = mouse.y;
      if (constrain || e.shiftKey) {
        top = mouse.y - ((width / orig_src.width) * orig_src.height - height);
      }
    }
    if (constrain || e.shiftKey) {
      height = (width / orig_src.width) * orig_src.height;
    }

    if (
      width > min_width &&
      height > min_height &&
      width < max_width &&
      height < max_height
    ) {
      resizeImage(width, height);
      // Without this Firefox will not re-calculate the the image dimensions until drag end
      //   container.style.position = "absolute";
      container.style.left = left;
      container.style.top = top;
    }
  };
  const moving = function (e) {
    const mouse = {};
    e.preventDefault();
    e.stopPropagation();

    mouse.x = (e.clientX || e.pageX) + window.pageXOffset;
    mouse.y = (e.clientY || e.pageY) + window.pageYOffset;

    container.style.left =
      mouse.x -
      (event_state.mouse_x - event_state.container_left) -
      canvas_wrapp.offsetLeft +
      "px";
    container.style.top =
      mouse.y -
      (event_state.mouse_y - event_state.container_top) -
      canvas_wrapp.offsetTop +
      "px";
  };
  const endMoving = function (e) {
    e.preventDefault();
    document.removeEventListener("mouseup", endMoving);
    document.removeEventListener("mousemove", moving);
  };
  const startMoving = (e) => {
    e.preventDefault();
    e.stopPropagation();
    saveEventState(e);
    document.addEventListener("mousemove", moving);
    document.addEventListener("mouseup", endMoving);
  };
  return (
    <>
      <div className="resize-container">
        <span
          onMouseDown={startResize}
          className="resize-handle resize-handle-nw"
        ></span>
        <span
          onMouseDown={startResize}
          className="resize-handle resize-handle-ne"
        ></span>

        <Canvas onMouseDown={startMoving} />
        <span
          onMouseDown={startResize}
          className="resize-handle resize-handle-se"
        ></span>
        <span
          onMouseDown={startResize}
          className="resize-handle resize-handle-sw"
        ></span>
      </div>
    </>
  );
}

export default memo(CanvasComponent);
