import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productList: [],
    };
  }

  render() {
    const { productList } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ App } />
        </Switch>
        <header className="App-header">
          <input type="text" placeholder="Digite o que você busca" />
          <img src={ logo } className="App-logo" alt="logo" />
          <p>Edit src/App.js and save to reload.</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <main>
          {!productList.length > 0 && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        </main>
      </div>
    );
  }
}

export default App;
