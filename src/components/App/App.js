import RouterURL from "../RouterURL/RouterURL";
import { BrowserRouter as Router } from "react-router-dom";
import "../../css/App.css";
import firebase from "./firebase";

function App() {
  const messaging = firebase.messaging();
  messaging
    .requestPermission()
    .then(function () {
      return messaging.getToken();
    })
    .then(function (token) {
      console.log("Token : ", token);
    })
    .catch(function (error) {
      console.log(error);
    });
  return (
    <Router>
      <div className="App">
        <RouterURL></RouterURL>
      </div>
    </Router>
  );
}

export default App;
