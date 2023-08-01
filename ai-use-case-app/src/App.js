import "./App.css";
import { generateData } from "./utils/utils";

function App() {
  return (
    <div className="App">
      <div className="content-wrapper">
        <button onClick={generateData}>GENERATE DATA</button>
      </div>
    </div>
  );
}

export default App;
