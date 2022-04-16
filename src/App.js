import { Tordle } from "./GamePlace";
import { TorodleWords } from "./shared/englishWords";
function App() {
  return (
    <Tordle
      TodayWord={TorodleWords[Math.round(Math.random() * 100)].toUpperCase()}
    />
  );
}

export default App;
