import React, { useEffect, useRef } from "react";
import canvasSketch from "canvas-sketch";
import random from "canvas-sketch-util/random";

const cursor = { x: 999999, y: 999999 };
class Particle {
  constructor({ x, y, radius = 10, color = "white" }) {
    //position
    this.x = x;
    this.y = y;

    //acceleration
    this.ax = 0;
    this.ay = 0;

    //velocity
    this.vx = 0;
    this.vy = 0;

    //initial position
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

  update() {
    let dx, dy, dd, distDelta;

    //pull force
    dx = this.ix - this.x;
    dy = this.iy - this.y;
    dd = Math.sqrt(dx * dx + dy * dy);

    this.ax = dx * this.pullFactor;
    this.ay = dy * this.pullFactor;

    //push force
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

  useEffect(() => {
    let elCanvas;
    const settings = {
      dimensions: [props.width, props.height],
      animate: true,
    };

    const background = ({ width, height, canvas }) => {
      const num = 8;
      const particles = [];

      const bg = "#1B2623";
      const col1 = "#5DBA85";
      const col2 = "#1E6091";

      const minRad = 150;
      const maxRad = 300;

      elCanvas = canvas;
      canvas.addEventListener("mousemove", OnMouseMove);

      for (let i = 0; i < num; i++) {
        const x = random.range(0, width);
        const y = random.range(0, height);
        const radius = random.range(minRad, maxRad);
        const color = i % 2 === 0 ? col1 : col2;
        particles.push(new Particle({ x, y, radius, color }));
      }

      return ({ context, width, height }) => {
        context.fillStyle = bg;
        context.fillRect(0, 0, width, height);

        context.save();

        particles.forEach((particle) => {
          particle.update();
          particle.draw(context);
        });

        context.restore();
      };
    };

    const OnMouseMove = (e) => {
      const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width;
      const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height;

      cursor.x = x;
      cursor.y = y;
    };

    // Initialize canvas sketch
    const canvasSketchInstance = canvasSketch(background, settings);

    // Cleanup: Remove event listener when the component unmounts

    return () => {
      if (elCanvas) {
        elCanvas.removeEventListener("mousemove", OnMouseMove);
      }
      elCanvas = null; // Set canvas to null
    };
  }, []); // Add dependencies as needed

  return <canvas ref={canvasRef} />;
};

export default BackgroundCanvas;
