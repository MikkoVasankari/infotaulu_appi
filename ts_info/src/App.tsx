import "./App.css";
import Datetime from "./components/date";
import Weather from "./components/weather";
import Spot_price from "./components/spot_price";

function App() {

  return (
    <div className="container">

      <Datetime />
      
      <Weather />

      <Spot_price />

    </div>
  );
}

export default App;
