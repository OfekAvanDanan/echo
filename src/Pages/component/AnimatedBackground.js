import React, { useRef, useEffect, useState } from "react";
import { render } from "react-dom";
import canvasSketch from "canvas-sketch";

const random = require("canvas-sketch-util/random");

const BackgroundCanvas = (props) => {
  const canvasRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 999999, y: 999999 });
  const [particles, setParticles] = useState([]);
};

export default BackgroundCanvas;
