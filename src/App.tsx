import * as React from 'react';
import './App.css';
import Grid from './GoL/Grid';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to The Game of Life !</h1>
        </header>

        <Grid />
      </div>
    );
  }
}

export default App;
