import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import BackgroundCanvas from "./Pages/component/AnimatedBackground";
import { render } from "react-dom";

const App = () => {
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
