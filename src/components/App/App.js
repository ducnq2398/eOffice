import RouterURL from '../RouterURL/RouterURL';
import {BrowserRouter as Router} from 'react-router-dom';
import '../../css/App.css';


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
