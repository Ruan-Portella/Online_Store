/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CheckoutForm from '../Components/CheckoutForm';
import Header from '../Components/Header';
import VoltarImage from '../images/Voltar.png';
import { GetSavedProduct,
  GetSavedProductQuantity, removeCartID,
  removeCartIDButton, SaveProduct, SaveSearch } from '../helper/SaveCart';
import '../style/CheckoutCart.css';

export default class CheckoutCart extends Component {
  state = {
    products: [],
    search: '',
    FirstPage: true,
    quantityCart: '',
    priceTotal: 0,
  };

  componentDidMount() {
    const cartProducts = GetSavedProductQuantity();
    const CartLength = GetSavedProduct();
    this.setState({
      products: cartProducts,
      quantityCart: CartLength,
    });
    let price = 0;
    CartLength.forEach((product) => {
      price += product.price;
    });
    this.setState({ priceTotal: price });
  }

  handleInputChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  RemoveCart = (product) => {
    if (product.quantityCart === 1) {
      return;
    }
    removeCartID(product.productCart);
    this.componentDidMount();
  };

  RemoveCartButtom = (product) => {
    removeCartIDButton(product.productCart.id);
    this.componentDidMount();
  };

  SaveCarts = (product) => {
    const { products } = this.state;
    let productIndex = 0;
    products.forEach((element, index) => {
      if (element.productCart.id === product.id) {
        productIndex = index;
      }
    });
    if (products[productIndex].quantityCart === product.available_quantity) {
      return;
    }
    SaveProduct(product);
    this.componentDidMount();
  };

  searchProducts = async () => {
    const { history } = this.props;
    const { search, FirstPage } = this.state;
    SaveSearch(search, FirstPage);
    history.push('/');
  };

  render() {
    const { products, search, quantityCart, priceTotal } = this.state;
    return (
      <section>
        <Header
          search={ search }
          handleInputChange={ () => this.handleInputChange }
          searchProducts={ () => this.searchProducts }
          quantityCart={ quantityCart }
        />
        <Link style={ { textDecoration: 'none' } } to="/ShoppingCart">
          <section className="ProductLeftBack">
            <img src={ VoltarImage } alt="Imagem de Voltar" />
            <p>Voltar</p>
          </section>
        </Link>
        <section className="CheckoutCartMain">
          <section className="CheckoutCartContent">
            <ul>
              {(
                products.map((product) => (
                  <li key={ product.id }>
                    <button
                      onClick={ () => this.RemoveCartButtom(product) }
                      data-testid="remove-product"
                    >
                      X
                    </button>
                    <img
                      src={ product.productCart.thumbnail }
                      alt={ product.productCart.title }
                    />
                    <h2>{product.productCart.title}</h2>
                    <button
                      data-testid="product-decrease-quantity"
                      onClick={ () => this.RemoveCart(product) }
                    >
                      -
                    </button>
                    <p>{ product.quantityCart }</p>
                    <button
                      data-testid="product-increase-quantity"
                      id={ product.productCart.id }
                      onClick={ () => this.SaveCarts(product.productCart) }
                    >
                      +
                    </button>
                    <span>{ ` R$${product.productCart.price}` }</span>
                  </li>
                ))
              )}
            </ul>
            <section className="PriceTotal">
              <p>{`Total: ${priceTotal.toFixed(2)}`}</p>
            </section>
          </section>
          <section className="FinalContentCheckout">
            <CheckoutForm searchProducts={ this.searchProducts } />
          </section>
        </section>
      </section>
    );
  }
}

CheckoutCart.propTypes = {
  history: PropTypes.func.isRequired,
};
