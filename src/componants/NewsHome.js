import { Component, React } from "react";
import NewsItems from "./NewsItems";
import { Routes, Route } from "react-router-dom";
import About from "./About"
import LoadingBar from 'react-top-loading-bar'


export default class NewsHome extends Component {

  state = {
    progress: 0
  }


  // ******************************** loading progress ************************//
  setProgress(progress){
    this.setState({
      progress: progress
    })
    console.log(this.props.query)
  }

  render() {
  
    return (
      <>
        <LoadingBar
        color='#00ffb7'
        progress={this.state.progress}
      />
        <h1
          style={{
            color: "#5f19ad",
            textAlign: "center",
            fontFamily: "cursive",
          }}
        >
          World's Fast NewsTime
        </h1>
      

     {/************************* category selection ********************/}
    <Routes>
        {["/", "/business", "/entertainment", "/health", "/science", "/sports", "/technology"].map((path, index) => {
            return <Route key={index} path={path} element={<NewsItems progress={this.setProgress.bind(this)} country="in" key={index} category={path.slice(1)} />} /> 
          }
    )}
g
            <Route exact key={this.props.serachInput} path={`search=${this.props.serachInput}`} element={<NewsItems progress={this.setProgress.bind(this)} key={this.props.serachInput} query={this.props.serachInput} country= "" category= "" />} />
            {/* <Route exact path="/Contact" element={<Contact />}/> */}
            <Route exact path="/About" element={<About />}/>

            {/* <Route element={PageNotFound}/> */}
    </Routes>
      </>
    );
  }
}
