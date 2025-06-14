import { Slit, DifferentialEquation } from '../types';

/**
 * Checks if a given solution to the differential equation passes through the slit.
 * @param equation - The differential equation object.
 * @param constant - The random constant for the solution.
 * @param slit - The slit parameters.
 * @returns boolean - True if it's a "catch", false otherwise.
 */
export function isCatch(
  equation: DifferentialEquation,
  constant: number,
  slit: Slit
): boolean {
  // Calculate the y-value of the solution at the slit's x-position
  const yAtSlitX = equation.solve(slit.x, constant);

  // Define the top and bottom boundaries of the slit
  const slitTop = slit.y + slit.width / 2;
  const slitBottom = slit.y - slit.width / 2;

  // Check if the y-value falls within the slit's opening
  return yAtSlitX >= slitBottom && yAtSlitX <= slitTop;
}