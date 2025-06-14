import React from 'react';
import { SimulationResult } from '../types';

interface ResultsDisplayProps {
  results: SimulationResult;
  onReset: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onReset }) => {
  return (
    <div className="results-panel">
      <h3>Simulation Complete</h3>
      <div className="result-item">
        <span>Catches:</span>
        <span>{results.catches}</span>
      </div>
      <div className="result-item">
        <span>Catch Proportion:</span>
        <span>{results.catchProportion.toFixed(4)}</span>
      </div>
      <div className="result-item score">
        <span>Score:</span>
        <span>{results.score.toFixed(4)}</span>
      </div>
      <button onClick={onReset}>Play Again</button>
    </div>
  );
};