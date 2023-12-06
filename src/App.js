import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BackgroundCanvas from "./Pages/component/AnimatedBackground";

const App = () => {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const watchSize = () => {
      const newSize = [window.innerWidth, window.innerHeight];
      setWindowSize(newSize);
    };

    window.addEventListener("resize", watchSize);

    return () => {
      window.removeEventListener("resize", watchSize);
    };
  }, []);

  console.log(windowSize);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="background">
                  <BackgroundCanvas width={1920} height={1080} animate={true} />
                </div>
                <Home />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
