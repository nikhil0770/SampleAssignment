import "./App.css";
import Events from "./Components/Events";
import Filter from "./Components/Filter";

function App() {
  return (
    <div className="App">
      <h3 style={{ margin: "20px", textAlign: "center" }}>All Events</h3>
      <Events />
    </div>
  );
}

export default App;
