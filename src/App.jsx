import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [lines, setLines] = useState(0);
  const [bet, setBet] = useState(0);
  const [reels, setReels] = useState([]);
  const [stage, setStage] = useState("deposit");

  return (
    <div>
      <h1>Slot Machine</h1>
      <p>Stage: {stage}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}

export default App;