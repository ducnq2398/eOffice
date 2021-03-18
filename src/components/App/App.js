import RouterURL from "../RouterURL/RouterURL";
import { BrowserRouter as Router } from "react-router-dom";
import "../../css/App.css";
import '@progress/kendo-theme-default/dist/all.css';

function App() {
  return (
    <Router>
      <div className="App">
        <RouterURL></RouterURL>
      </div>
    </Router>
  );
}

export default App;
