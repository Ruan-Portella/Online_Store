import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../images/logo.png';
import Carrinho from '../images/Carrinho.png';
import Buscar from '../images/Buscar.png';
import '../style/Header.css';

export default class Header extends Component {
  render() {
    const { search, handleInputChange, searchProducts,
      quantityCart } = this.props;
    return (
      <section className="MainHeader">
        <section className="ImageHeader">
          <Link to="/">
            <img src={ logoImage } alt="LogoImage" />
          </Link>
        </section>
        <section className="SearchHeader">
          <input
            data-testid="query-input"
            type="text"
            name="search"
            value={ search }
            placeholder="Digite o que você busca"
            onChange={ handleInputChange() }
          />
          <button
            type="submit"
            data-testid="query-button"
            onClick={ searchProducts() }
          >
            <img src={ Buscar } alt="Buscar Produtos" />
          </button>
        </section>
        <section className="CartHeader">
          <Link
            to="/ShoppingCart"
            data-testid="shopping-cart-button"
          >
            <img src={ Carrinho } alt="Carrinho De Compras" className="CartHeaderImage" />
          </Link>
          <span data-testid="shopping-cart-size">{ quantityCart.length }</span>
        </section>
      </section>
    );
  }
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  searchProducts: PropTypes.func.isRequired,
  quantityCart: PropTypes.number.isRequired,
};
