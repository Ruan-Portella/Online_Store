import React from 'react';
import { Link } from 'react-router-dom';
import FilterCategories from '../Components/FilterCategories';
import { getProductByQuery } from '../services/api';
import ProductCard from '../Components/ProductCard';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      productsList: [],
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  searchProducts = async () => {
    const { search } = this.state;
    const products = await getProductByQuery(search);
    console.log(products);
    this.setState({
      productsList: products,
    });
  };

  render() {
    const { search, productsList } = this.state;
    return (
      <>
        <aside><FilterCategories /></aside>
        <label>
          <input
            data-testid="query-input"
            type="text"
            name="search"
            value={ search }
            onChange={ this.handleInputChange }
          />
          <button
            data-testid="query-button"
            onClick={ this.searchProducts }
          >
            Buscar
          </button>
        </label>
        {!search && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        <Link to="/ShoppingCart" data-testid="shopping-cart-button" />
        <ProductCard productsList={ productsList } />
      </>
    );
  }
}
export default Home;
