import {BrowserRouter as Router } from "react-router-dom";
import Header from "../Nav/Header";
import RouterURL from "../RouterURL/RouterURL";
import Sidebar from "../Sidebar/Sidebar";

function PreviewLocalFile(){
    return(
        <Router>
            <Sidebar/>
            <div className="App">
                <Header/>
                <RouterURL></RouterURL>
            </div>
        </Router>
    )
};

export default PreviewLocalFile;
