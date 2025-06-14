import React from 'react';
import Plot from 'react-plotly.js';
import { Slit, DifferentialEquation } from '../types';
import { jStat } from 'jstat';

interface VisualizationProps {
  equation: DifferentialEquation | undefined;
  slit: Slit;
  config: { distributionId: string; distributionParams: number[] } | null;
}

export const Visualization: React.FC<VisualizationProps> = ({ equation, slit, config }) => {
  const traces: any[] = [];
  
  // Draw a sample of solution curves
  if (equation && config) {
    const xValues = Array.from({ length: 201 }, (_, i) => (i - 100) / 10);
    for (let i = 0; i < 50; i++) {
        let constant;
        if(config.distributionId === 'normal') {
            constant = jStat.normal.sample(config.distributionParams[0], config.distributionParams[1]);
        } else {
            constant = jStat.uniform.sample(config.distributionParams[0], config.distributionParams[1]);
        }

      traces.push({
        x: xValues,
        y: xValues.map(x => equation.solve(x, constant)),
        mode: 'lines',
        line: { color: 'rgba(0, 100, 255, 0.1)' },
        type: 'scatter',
        hoverinfo: 'none',
      });
    }
  }

  return (
    <Plot
      data={traces}
      layout={{
        title: { text: 'Family of Solutions & Your Slit' },
        showlegend: false,
        xaxis: { range: [-10, 10] },
        yaxis: { range: [-50, 50] },
        shapes: [
          // The slit
          {
            type: 'rect',
            x0: slit.x - 0.1,
            x1: slit.x + 0.1,
            y0: slit.y - slit.width / 2,
            y1: slit.y + slit.width / 2,
            fillcolor: 'rgba(255, 0, 0, 0.5)',
            line: { width: 0 },
          },
        ],
      }}
      style={{ width: '100%', height: '500px' }}
      config={{ responsive: true }}
    />
  );
};