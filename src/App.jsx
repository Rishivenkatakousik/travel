import "./App.css";
import Hero from "./components/custom/Hero";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("https://travel-hs2t.onrender.com/track-visit")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <div>
      <Hero />
    </div>
  );
}

export default App;
