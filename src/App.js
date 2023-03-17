import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
          <Route exact path="/" />
        </Switch>
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
