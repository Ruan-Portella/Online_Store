import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import DetailsProduct from './pages/DetailsProduct';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/ShoppingCart" component={ ShoppingCart } />
          <Route exact path="/DetailsProduct/:id" component={ DetailsProduct } />
        </Switch>
      </div>
    );
  }
}

export default App;
