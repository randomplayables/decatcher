import './App.css';
import { Controls } from './components/Controls';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Visualization } from './components/Visualization';
import { useDecatchersGame } from './hooks/useDecatchersGame';
import { EQUATIONS } from './utils/equations';

function App() {
  const {
    gameState,
    slit,
    setSlit,
    startSimulation,
    resetGame,
    equations,
    distributions,
  } = useDecatchersGame();

  const selectedEquation = EQUATIONS.find(e => e.id === gameState.config?.equationId);

  return (
    <div className="app-container">
      <header>
        <h1>DEcatchers</h1>
        <p>A citizen science game about differential equations.</p>
      </header>
      <main>
        <div className="visualization-container">
          <Visualization equation={selectedEquation} slit={slit} config={gameState.config} />
        </div>
        <div className="controls-container">
          {gameState.isFinished && gameState.results ? (
            <ResultsDisplay results={gameState.results} onReset={resetGame} />
          ) : (
            <Controls 
                slit={slit} 
                onSlitChange={setSlit}
                onStart={startSimulation}
                isSimulating={gameState.isSimulating}
                equations={equations}
                distributions={distributions}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;