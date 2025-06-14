export interface DifferentialEquation {
    id: string;
    label: string;
    // Takes x and a constant c, returns y
    solve: (x: number, c: number) => number;
    description: string;
  }
  
  export interface Distribution {
    id: string;
    label: string;
    // Takes parameters and returns a random sample
    sample: (...args: number[]) => number;
    params: { name: string; defaultValue: number }[];
  }
  
  export interface Slit {
    x: number;
    y: number;
    width: number;
  }
  
  export interface SimulationConfig {
    equationId: string;
    distributionId: string;
    distributionParams: number[];
    numThrows: number;
  }
  
  export interface GameState {
    isSetup: boolean;
    isSimulating: boolean;
    isFinished: boolean;
    config: SimulationConfig | null;
    results: SimulationResult | null;
  }
  
  export interface SimulationResult {
    catches: number;
    catchProportion: number;
    score: number;
  }