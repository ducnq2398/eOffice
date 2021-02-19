import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import RouterURL from '../RouterURL/RouterURL';
import {BrowserRouter as Router} from 'react-router-dom';
import '../../css/App.css';
import Login from '../Login/Login';


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
