import './App.css';
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import RouterURL from '../RouterURL/RouterURL';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <RouterURL></RouterURL>
      </BrowserRouter>
    </div>
  );
}

export default App;
