import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Canvas from './Canvas';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <Canvas></Canvas>
        <div id = "help">
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
              <a href="https://github.com/vitejs/vite" target="_blank">
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
              <a href="https://chat.vite.dev/" target="_blank">
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
              <a href="https://x.com/vite_js" target="_blank">
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
