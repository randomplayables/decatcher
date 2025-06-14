import React, { useState } from 'react';
import { useDecatchersGame } from '../hooks/useDecatchersGame';
import { Slit, SimulationConfig } from '../types';

interface ControlsProps {
  slit: Slit;
  onSlitChange: (newSlit: Slit) => void;
  onStart: (config: SimulationConfig) => void;
  isSimulating: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ slit, onSlitChange, onStart, isSimulating }) => {
  const { equations, distributions } = useDecatchersGame();
  const [config, setConfig] = useState<SimulationConfig>({
    equationId: equations[0].id,
    distributionId: distributions[0].id,
    distributionParams: distributions[0].params.map(p => p.defaultValue),
    numThrows: 1000,
  });

  const handleStartClick = () => {
    onStart(config);
  };
  
  const selectedDist = distributions.find(d => d.id === config.distributionId)!;

  return (
    <div className="controls-panel">
      {/* Slit Controls */}
      <div className="control-group">
        <h4>Slit Controls</h4>
        <label>X-Axis Location: {slit.x}</label>
        <input type="range" min="-10" max="10" step="0.5" value={slit.x} onChange={(e) => onSlitChange({ ...slit, x: +e.target.value })} />
        
        <label>Y-Axis Location: {slit.y}</label>
        <input type="range" min="-50" max="50" step="1" value={slit.y} onChange={(e) => onSlitChange({ ...slit, y: +e.target.value })} />

        <label>Slit Width: {slit.width}</label>
        <input type="range" min="1" max="50" step="1" value={slit.width} onChange={(e) => onSlitChange({ ...slit, width: +e.target.value })} />
      </div>

      {/* Simulation Setup */}
      <div className="control-group">
        <h4>Simulation Setup</h4>
        <label>Differential Equation:</label>
        <select value={config.equationId} onChange={(e) => setConfig({...config, equationId: e.target.value})}>
            {equations.map(eq => <option key={eq.id} value={eq.id}>{eq.label}</option>)}
        </select>
        <p className="description">{equations.find(e=>e.id === config.equationId)?.description}</p>
        
        <label>Distribution:</label>
        <select value={config.distributionId} onChange={(e) => setConfig({...config, distributionId: e.target.value, distributionParams: distributions.find(d=>d.id === e.target.value)!.params.map(p=>p.defaultValue)})}>
            {distributions.map(dist => <option key={dist.id} value={dist.id}>{dist.label}</option>)}
        </select>

        {selectedDist.params.map((param, index) => (
            <div key={param.name}>
                <label>{param.name}: {config.distributionParams[index]}</label>
                <input type="range" min="-50" max="50" value={config.distributionParams[index]} onChange={(e) => {
                    const newParams = [...config.distributionParams];
                    newParams[index] = +e.target.value;
                    setConfig({...config, distributionParams: newParams});
                }}/>
            </div>
        ))}
        
        <label>Number of Throws: {config.numThrows}</label>
        <input type="range" min="100" max="10000" step="100" value={config.numThrows} onChange={(e) => setConfig({...config, numThrows: +e.target.value})}/>
      </div>
      
      <button onClick={handleStartClick} disabled={isSimulating}>{isSimulating ? "Simulating..." : "Run Simulation"}</button>
    </div>
  );
};