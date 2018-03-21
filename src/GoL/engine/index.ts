import { Grid, GridElement, Pos } from './types';

const getGridElement = (grid) => (pos: Pos) => {
  if (grid.getIn) {
    return grid.getIn([pos.x < 0 ? undefined : pos.x, pos.y < 0 ? undefined : pos.y ]);
  }

  return (grid[pos.x] || [])[pos.y];
};

/**
 *     |--------------
 *     |  A | B  | C  |
 * ----|--------------
 * | 1 | A1 | B1 | C1 |
 * ----|--------------
 * | 2 | A2 | B2 | C2 |
 * ----|--------------
 * | 3 | A3 | B3 | C3 |
 * ----|--------------
 */

export const getNeighbors = (grid: Grid) => (pos: Pos): GridElement[] => {
  const N =  getGridElement(grid)({ x: pos.x - 1, y: pos.y });
  const NE = getGridElement(grid)({ x: pos.x - 1, y: pos.y + 1 });
  const E =  getGridElement(grid)({ x: pos.x    , y: pos.y + 1 });
  const SE = getGridElement(grid)({ x: pos.x + 1, y: pos.y + 1 });
  const S =  getGridElement(grid)({ x: pos.x + 1, y: pos.y     });
  const SO = getGridElement(grid)({ x: pos.x + 1, y: pos.y - 1 });
  const O =  getGridElement(grid)({ x: pos.x    , y: pos.y - 1 });
  const NO = getGridElement(grid)({ x: pos.x - 1, y: pos.y - 1 });

  return [
    N, NE, E, SE, S, SO, O, NO
  ].filter(i => typeof (i) === 'number');
};

export const getNextLivingState = (grid: Grid) => (pos: Pos): GridElement => {
  const neighbors = getNeighbors(grid)(pos);
  const livingNeighbors = neighbors.filter(item => item === 1);
  const isLiving = getGridElement(grid)(pos);

  switch (isLiving) {
    case 1:
      switch (livingNeighbors.length) {
        case 2:
        case 3:
          return 1;
        default:
          return 0;
      }

    case 0:
      switch (livingNeighbors.length) {
        case 3:
          return 1;
        default:
          return 0;
      }

    default:
      return 0;
  }
};

export const getNextGrid = (grid: Grid): Grid => grid.map((row, rowIndex) => (
  row.map((col, colIndex) => (
    getNextLivingState(grid)({ x: rowIndex, y: colIndex })
  ))
));
