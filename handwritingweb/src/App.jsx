import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Canvas from './Canvas';
import { useEffect } from 'react';
export let isDragging = false;

function App() {
  
  useEffect(() => {
    const draggable = document.getElementById('draggable');
    if(!draggable) return;

    let offsetX = 0, offsetY = 0;

    const onMouseDown = (e) => {
      e.preventDefault();
      e.stopPropagation();

      isDragging = true;
      offsetX = e.clientX - draggable.offsetLeft;
      offsetY = e.clientY - draggable.offsetTop;
    }

    const onMouseMove = (e) => {
      e.preventDefault();
      if (isDragging) {
        draggable.style.left = `${e.clientX - offsetX}px`;
        draggable.style.top = `${e.clientY - offsetY}px`;
      }
      offsetX = e.clientX - draggable.offsetLeft;
      offsetY = e.clientY - draggable.offsetTop;
      
    }
    
  draggable.addEventListener("mousedown", onMouseDown);
  draggable.addEventListener("mousemove", onMouseMove);
  draggable.addEventListener("mouseup", () => {isDragging = false;});
  draggable.addEventListener("mouseleave", () => {isDragging = false;});

  }, []);
  const [count, setCount] = useState(0)
  return (
    <>
      <section id="center">
        <Canvas/>
        <div id = "draggable" className = "unselectable">
          <h2>Instructions</h2>
          <ul>
            <li>Draw with your mouse!</li>
            <li>Press 'z' to undo</li>
            <li>Press 'c' to clear</li>
            <li>Press 'b' to reduce stroke weight</li>
            <li>Press 'r' to reset stroke weight</li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="social">
          <h2>Contact</h2>
          <ul>
            <li>
              <a href="https://github.com/Arrogz" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true" 
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="unknown" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/Arrogz" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default App


