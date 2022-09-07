import { Component, React } from "react";
import NewsItems from "./NewsItems";
import { Routes, Route, useRoutes } from "react-router-dom";
import About from "./About"

export default class NewsHome extends Component {
  render() {
    return (
      <>
      
        <h1
          style={{
            color: "#5f19ad",
            textAlign: "center",
            fontFamily: "cursive",
          }}
        >
          World's Fast NewsTime
        </h1>
      
    <Routes>
        {["/", "/business", "/entertainment", "/health", "/science", "/sports", "/technology"].map((path, index) => {
            return <Route key={index} path={path} element={<NewsItems country="in" key={index} category={path.slice(1)} />} /> 
          }
    )}
            <Route exact path="/About" element={<About />}/>
    </Routes>
      </>
    );
  }
}
