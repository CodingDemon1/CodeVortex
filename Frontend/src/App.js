import "./App.css";
import AllRoutes from "./component/AllRoutes";
import Navbar from "./component/Navbar";
// import SpeechToText from "./component/SpeechToText";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      {/* <SpeechToText /> */}
    </div>
  );
}

export default App;
