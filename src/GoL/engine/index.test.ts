import * as Immutable from 'immutable';
import { getNextGrid, getNeighbors, getNextLivingState } from './index';
import { GridElement, Grid } from './types';

describe('`Game of Life` engine', () => {
  describe('getNeighbors', () => {
    it('should return direct neighbors with nomical case', () => {
      const N: GridElement = 0;
      const NE: GridElement = 0;
      const E: GridElement = 1;
      const SE: GridElement = 0;
      const S: GridElement = 0;
      const SO: GridElement = 0;
      const O: GridElement = 1;
      const NO: GridElement = 0;

      const grid: Grid = [
        [NO,  N, NE],
        [ O,  1,  E],
        [SO,  S, SE],
      ];

      expect(getNeighbors(grid)({ x: 1, y: 1 })).toEqual([
        N, NE, E, SE, S, SO, O, NO
      ]);
    });

    it('should return direct neighbors when it is at borders', () => {
      const N: GridElement = 0;
      const E: GridElement = 1;
      const SE: GridElement = 0;
      const S: GridElement = 0;
      const SO: GridElement = 0;
      const O: GridElement = 1;
      const NO: GridElement = 0;
      const C: GridElement = 1;

      const grid: Grid = [
        [NO,  N, 1],
        [ O,  C,  E],
        [SO,  S, SE],
      ];

      expect(getNeighbors(grid)({ x: 0, y: 2 })).toEqual([
        E, C, N
      ]);
    });
  });

  describe('getNextLivingState', () => {
    describe('when it\'s already alive', () => {
      it('should return `true` if conditions are okay', () => {
        const N:  GridElement = 0;
        const NE: GridElement = 0;
        const E:  GridElement = 1;
        const SE: GridElement = 0;
        const S:  GridElement = 0;
        const SO: GridElement = 0;
        const O:  GridElement = 1;
        const NO: GridElement = 0;
        const C:  GridElement = 1;

        const grid: Grid = [
          [NO,  N, NE],
          [ O,  C,  E],
          [SO,  S, SE],
        ];

        expect(getNextLivingState(grid)({ x: 1, y: 1 })).toBe(1); // Center case
        expect(getNextLivingState(grid)({ x: 1, y: 0 })).toBe(0); // O
        expect(getNextLivingState(grid)({ x: 1, y: 2 })).toBe(0); // E
        expect(getNextLivingState(grid)({ x: 0, y: 1 })).toBe(1); // N
      });
    });
  });

  describe('getNextGrid', () => {
    it('with Immutable.JS, should return correct next grid', () => {
      const grid: Grid = Immutable.fromJS([
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ]);

      const result = getNextGrid(grid);

      // tslint:disable-next-line:no-any
      expect((result as any).equals(Immutable.fromJS([
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ]))).toBe(true);
    });

    it('should return correct next grid', () => {
      const grid: Grid = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ];

      expect(getNextGrid(grid)).toEqual([
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ]);
    });
  });
});