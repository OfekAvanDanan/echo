import React, { useRef, useEffect, useState } from "react";
import { render } from "react-dom";
import canvasSketch from "canvas-sketch";

const random = require("canvas-sketch-util/random");

const num = 5;
const particles = [];

const bg = "#1B2623";
const col1 = "#5DBA85";
const col2 = "#1E6091";

const minRad = 150;
const maxRad = 300;

class Particle {
  constructor({ x, y, radius = 10, color = "white" }) {
    this.x = x;
    this.y = y;
    this.ax = 0;
    this.ay = 0;
    this.vx = 0;
    this.vy = 0;
    this.ix = x;
    this.iy = y;
    this.radius = radius;
    this.scale = 1;
    this.color = color;
    this.minDist = random.range(150, 250);
    this.pushFactor = random.range(0.002, 0.004);
    this.pullFactor = random.range(0.0002, 0.0006);
    this.dampFactor = random.range(0.95, 1);
  }

  update(cursor) {
    let dx, dy, dd, distDelta;

    dx = this.ix - this.x;
    dy = this.iy - this.y;
    dd = Math.sqrt(dx * dx + dy * dy);

    this.ax = dx * this.pullFactor;
    this.ay = dy * this.pullFactor;

    dx = this.x - cursor.x;
    dy = this.y - cursor.y;
    dd = Math.sqrt(dx * dx + dy * dy);

    distDelta = this.minDist - dd;
    if (dd < this.minDist) {
      this.ax += (dx / dd) * distDelta * this.pushFactor;
      this.ay += (dy / dd) * distDelta * this.pushFactor;
    }

    this.vx += this.ax;
    this.vy += this.ay;

    this.vx *= this.dampFactor;
    this.vy *= this.dampFactor;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = this.color;

    context.beginPath();
    context.filter = "blur(80px)";
    context.arc(0, 0, this.radius * this.scale, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
}

const BackgroundCanvas = (props) => {
  const canvasRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 999999, y: 999999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = props.width;
    const height = props.height;

    for (let i = 0; i < num; i++) {
      const x = random.range(0, width);
      const y = random.range(0, height);
      const radius = random.range(minRad, maxRad);
      const color = i % 2 === 0 ? col1 : col2;
      particles.push(new Particle({ x, y, radius, color }));
    }

    const sketch = () => {
      context.fillStyle = bg;
      context.fillRect(0, 0, width, height);

      context.save();

      particles.forEach((particle) => {
        particle.update(cursor);
        particle.draw(context);
      });

      context.restore();
    };

    const handleMouseMove = (e) => {
      const x = (e.offsetX / canvas.offsetWidth) * canvas.width;
      const y = (e.offsetY / canvas.offsetHeight) * canvas.height;

      setCursor({ x, y });
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const settings = {
      dimensions: [width, height],
      animate: true,
    };

    return () => {
      canvasSketch(sketch, settings); // Cancel the sketch animation
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [props.animate]);

  return <canvas ref={canvasRef} width={props.width} height={props.height} />;
};

export default BackgroundCanvas;
