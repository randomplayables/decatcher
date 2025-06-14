import { useState, useCallback } from 'react';
import { jStat } from 'jstat';
import { EQUATIONS } from '../utils/equations';
import { isCatch } from '../utils/simulation';
import {
  DifferentialEquation,
  Distribution,
  Slit,
  SimulationConfig,
  GameState,
} from '../types';
import * as apiService from '../services/apiService';

export const DISTRIBUTIONS: Distribution[] = [
  {
    id: 'normal',
    label: 'Normal(μ, σ)',
    sample: (mean, std) => jStat.normal.sample(mean, std),
    params: [
      { name: 'μ (Mean)', defaultValue: 0 },
      { name: 'σ (Std Dev)', defaultValue: 10 },
    ],
  },
  {
    id: 'uniform',
    label: 'Uniform(a, b)',
    sample: (min, max) => jStat.uniform.sample(min, max),
    params: [
      { name: 'a (Min)', defaultValue: -20 },
      { name: 'b (Max)', defaultValue: 20 },
    ],
  },
];

const INITIAL_STATE: GameState = {
  isSetup: true,
  isSimulating: false,
  isFinished: false,
  config: null,
  results: null,
};

export function useDecatchersGame() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [slit, setSlit] = useState<Slit>({ x: 5, y: 0, width: 10 });
  const [session, setSession] = useState<any>(null);

  const startSimulation = useCallback(async (config: SimulationConfig) => {
    setGameState({ ...INITIAL_STATE, isSetup: false, isSimulating: true, config });
    
    // Initialize session with the platform
    const gameSession = await apiService.initGameSession();
    setSession(gameSession);

    const equation = EQUATIONS.find((e) => e.id === config.equationId);
    const distribution = DISTRIBUTIONS.find((d) => d.id === config.distributionId);

    if (!equation || !distribution) {
      console.error('Invalid equation or distribution');
      setGameState(INITIAL_STATE);
      return;
    }

    let catchCount = 0;
    for (let i = 0; i < config.numThrows; i++) {
      const constant = distribution.sample(...config.distributionParams);
      if (isCatch(equation, constant, slit)) {
        catchCount++;
      }
    }

    const catchProportion = config.numThrows > 0 ? catchCount / config.numThrows : 0;
    const score = slit.width > 0 ? catchProportion / slit.width : 0;
    
    const results = {
        catches: catchCount,
        catchProportion,
        score,
    };

    setGameState((prev) => ({ ...prev, isSimulating: false, isFinished: true, results }));

    // Save data to the platform
    apiService.saveGameData(gameSession, {
        config,
        slit,
        results
    });

  }, [slit]);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
    setSlit({ x: 5, y: 0, width: 10 });
    setSession(null);
  }, []);

  return {
    gameState,
    slit,
    setSlit,
    startSimulation,
    resetGame,
    equations: EQUATIONS,
    distributions: DISTRIBUTIONS,
  };
}