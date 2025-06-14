import { DifferentialEquation } from '../types';

export const EQUATIONS: DifferentialEquation[] = [
  {
    id: 'y_prime_eq_c',
    label: "y' = c",
    solve: (x, c) => c * x,
    description: "A family of straight lines passing through the origin. The constant 'c' represents the slope."
  },
  {
    id: 'y_prime_eq_x_plus_c',
    label: "y' = x + c",
    solve: (x, c) => 0.5 * x * x + c * x,
    description: "A family of parabolas. The constant 'c' shifts the vertex of the parabola."
  },
  {
    id: 'y_prime_eq_neg_y',
    label: "y' = -y",
    solve: (x, c) => c * Math.exp(-x),
    description: "A family of exponential decay curves. The constant 'c' is the initial value at x=0."
  }
];