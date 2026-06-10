import { useEffect, useRef } from "react";
import p5 from "p5";

export default function P5Canvas() {
  const containerRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let shapes = [];
      let currentShape = [];

      let curX;
      let curY;

      let curStrokeWeight = 11;
      let canvasX = 0, canvasY = 0;
      let newP = false;

      let canvas;

      class LetterShape {
        constructor(shape, strokeW) {
          this.shape = [...shape];
          this.strokeW = strokeW;
        }

        draw() {
          let maxX = -Infinity;
          let maxY = -Infinity;
          let minX = Infinity;
          let minY = Infinity;

          let coreX = 0;
          let coreY = 0;

          for (let pt of this.shape) {
            maxX = Math.max(maxX, pt.x);
            minX = Math.min(minX, pt.x);
            maxY = Math.max(maxY, pt.y);
            minY = Math.min(minY, pt.y);

            coreX += pt.x;
            coreY += pt.y;
          }

          coreX /= this.shape.length;
          coreY /= this.shape.length;

          p.noFill();
          p.stroke(0);
          p.strokeWeight(this.strokeW);

          p.beginShape();

          for (let pt of this.shape) {
            p.vertex(pt.x ,pt.y);
          }

          p.endShape();
        }
      }

      function drawInkSplash(x, y, r) {
        p.beginShape();
        p.strokeWeight(0);
        p.fill(0);

        const points = 30;

        for (let i = 0; i < points; i++) {
          const angle = p.map(i, 0, points, 0, p.TWO_PI);

          r += p.random(-2, 2);

          const px = x + r * p.cos(angle);
          const py = y + r * p.sin(angle);

          p.vertex(px, py);
        }

        p.endShape(p.CLOSE);

        for (let i = 0; i < 3 * curStrokeWeight; i++) {
          const a = p.random(p.TWO_PI);
          const d = p.random(r * 2.6, r * 5);
          const dotSize = p.random(3, 10);

          p.ellipse(
            x + p.cos(a) * d,
            y + p.sin(a) * d,
            dotSize
          );
        }
      }

      function newPaper() {
        if (newP) {
          canvasX = p.lerp(canvasX, p.windowWidth * 2, 0.05 *((p.windowWidth + 1000 - canvasX) /p.windowWidth));

          if (canvasX > p.windowWidth * 1.4) {
            shapes = [];
            p.background("#eaeaea");
            canvasX = - p.windowWidth * 2;
            canvasY = p.windowHeight * 0.7 * 0.05;
            canvas.position(canvasX, canvasY);
            newP = !newP;
          }
        }
        else {
          canvasX = p.lerp(canvasX, (p.windowWidth - canvas.width) / 2, 0.05 *((p.windowWidth + 1000 - canvasX) /p.windowWidth));
        }

        canvas.position(canvasX, canvasY);
      }

      p.setup = () => {
        canvas = p.createCanvas(
          75 * p.windowWidth / 100,
          65 * p.windowHeight / 100
        );
        
        curX = p.mouseX;
        curY = p.mouseY;

        canvasX = (p.windowWidth - canvas.width) / 2;
        canvasY = p.windowHeight * 0.7 * 0.05;
        canvas.position(canvasX, canvasY);

        p.background("#eaeaea");
      };

      p.draw = () => {
        p.background(255, 10);

        p.noFill();
        p.stroke(0);
        p.strokeWeight(5);

        newPaper();


        curX = p.lerp(curX, p.mouseX, 0.45);
        curY = p.lerp(curY, p.mouseY, 0.45);

        shapes.forEach((s) => s.draw());

        p.noFill();
        p.strokeWeight(curStrokeWeight);
        p.stroke(150, 0, 200);

        p.beginShape();

        currentShape.forEach((pt) => {
          p.vertex(pt.x, pt.y);
        });

        p.endShape();
      };

      p.mouseDragged = () => {
        if (curStrokeWeight > 0) {
          currentShape.push(
            p.createVector(curX, curY)
          );
        }
      };

      p.mouseReleased = () => {
        if (currentShape.length > 0) {
          const letter = new LetterShape(
            currentShape,
            curStrokeWeight
          );

          shapes.push(letter);
          currentShape = [];
        }
      };

      p.keyPressed = () => {
        switch (p.key) {
          case "z":
            shapes.pop();
            p.background("#eaeaea");
            break;

          case "c":
            newP = true;
            break;

          case "b":
            if (curStrokeWeight >= 3) {
              drawInkSplash(
                p.mouseX,
                p.mouseY,
                p.random(
                  curStrokeWeight,
                  curStrokeWeight * 2
                )
              );
              curStrokeWeight -= 2;
            }
            break;

          case "r":
            curStrokeWeight = 11;
            break;

          default:
            break;
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(
          75 * p.windowWidth / 100,
          65 * p.windowHeight / 100
        );
        canvasY = p.windowHeight * 0.7 * 0.05;
        canvas.position(canvasX, canvasY);
      };
    };

    const instance = new p5(sketch, containerRef.current);

    return () => instance.remove();
  }, []);

  return <div ref={containerRef} />;
}