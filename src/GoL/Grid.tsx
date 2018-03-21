import * as React from 'react';
import { Component } from 'react';
import * as Immutable from 'immutable';
import styled from 'styled-components';
// import { Grid as GridType } from './engine/types';
import { getNextGrid } from './engine';

import gunnar from './engine/GUNNAR';

import Row from './Row';

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// const generateGrid = (x, y): GridType => {
//   const grid = [];

//   for (let i = 0; i < x; i++) {
//     const row = [];

//     for (let j = 0; j < y; j++) {
//       row.push(0);
//     }

//     grid.push(row);
//   }

//   return grid;
// };

class Grid extends Component {
  state = {
    grid: Immutable.fromJS(gunnar),
    playing: false,
    interval: null,
  };

  render () {
    const { grid, playing } = this.state;

    return (
      <div>
        <button onClick={this.handlePlay}>{playing ? 'Pause' : 'Play'}</button>
        <button onClick={this.handleNext}>Prochaine génération</button>

        <GridWrapper>
          { grid.map((row, rowIndex) => (
            <Row key={rowIndex} elms={row} onClick={this.handleClick(rowIndex)} />
          )) }
        </GridWrapper>
      </div>
    );
  }

  // tslint:disable-next-line:no-any
  shouldComponentUpdate (nextProps: any, nextState: any) {
    return !nextState.grid.equals(this.state.grid) || nextState.playing !== this.state.playing;
  }

  handleClick = row => cell => event => {
    const prevCellState = this.state.grid.getIn([row, cell]);

    const nextState = prevCellState === 1 ? 0 : 1;
    const nextGrid = this.state.grid.setIn([row, cell], nextState);

    this.setState({
      grid: nextGrid
    });
  }

  handleNext = event => {
    event.preventDefault();

    this.setState({
      grid: getNextGrid(this.state.grid)
    });
  }

  updateGrid = () => {
    if (this.state.playing) {
      this.setState({ grid: getNextGrid(this.state.grid) });
      requestAnimationFrame(this.updateGrid);
    }
  }

  handlePlay = event => {
    event.preventDefault();

    this.setState(
      {
        playing: !this.state.playing
      },
      () => {
        this.updateGrid();
      }
    );
  }
}

export default Grid;
