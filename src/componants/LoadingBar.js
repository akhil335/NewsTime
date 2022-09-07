import { Component } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import "./loadingbar.css"

export default class LoadingBar extends Component{

    render(){
        return (
            <div className="loader">
                <CircularProgress />
            </div>
        )
    }
}