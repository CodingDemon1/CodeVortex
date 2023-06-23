import { useEffect } from "react";
import "./App.css";
import AllRoutes from "./component/AllRoutes";
import Navbar from "./component/Navbar";
import useVerify from "./Hooks/useVerify";
import { useDispatch, useSelector } from "react-redux";
import { USER_AUTH } from "./Redux/actionTypes";
// import SpeechToText from "./component/SpeechToText";

function App() {
  const verified = useVerify();

  const dispatch = useDispatch();
  const store = useSelector((store) => store.reducer);

  useEffect(() => {
    dispatch({ type: USER_AUTH, auth: verified });
  }, [verified]);

  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      {/* <SpeechToText /> */}
    </div>
  );
}

export default App;
