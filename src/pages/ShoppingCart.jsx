import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { GetSavedProduct, GetSavedProductQuantity, removeCartID,
  removeCartIDButton, SaveProduct, SaveSearch } from '../helper/SaveCart';
import '../style/ShoppingCart.css';
import VoltarImage from '../images/Voltar.png';
import CartEmpty from '../Components/CartEmpty';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      search: '',
      FirstPage: true,
      quantityCart: '',
      priceTotal: 0,
    };
  }

  componentDidMount() {
    const Cart = GetSavedProductQuantity();
    const CartLength = GetSavedProduct();
    let price = 0;
    CartLength.forEach((product) => {
      price += product.price;
    });
    this.setState({ productsList: Cart, quantityCart: CartLength, priceTotal: price });
  }

  RemoveCart = (product) => {
    if (product.quantityCart === 1) {
      return;
    }
    removeCartID(product.productCart);
    this.componentDidMount();
  };

  handleInputChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  searchProducts = async () => {
    const { history } = this.props;
    const { search, FirstPage } = this.state;
    SaveSearch(search, FirstPage);
    history.push('/');
  };

  RemoveCartButtom = (product) => {
    removeCartIDButton(product.productCart.id);
    this.componentDidMount();
  };

  SaveCarts = (product) => {
    const { productsList } = this.state;
    let productIndex = 0;
    productsList.forEach((element, index) => {
      if (element.productCart.id === product.id) {
        productIndex = index;
      }
    });
    if (productsList[productIndex].quantityCart === product.available_quantity) {
      return;
    }
    SaveProduct(product);
    this.componentDidMount();
  };

  render() {
    const { productsList, search, quantityCart, priceTotal } = this.state;
    return (
      <section>
        <Header
          search={ search }
          searchProducts={ () => this.searchProducts }
          handleInputChange={ () => this.handleInputChange }
          quantityCart={ quantityCart }
        />
        <Link to="/" style={ { textDecoration: 'none' } }>
          <section className="ProductLeftBack">
            <img src={ VoltarImage } alt="Imagem de Voltar" />
            <p>Voltar</p>
          </section>
        </Link>
        <section className="ShoppingCartMain">
          {
            !productsList.length <= 0 && (
              <section className="ShoppingCartContent">
                <ul data-testid="product-add-to-cart">
                  {
                    !productsList.length <= 0 && (
                      productsList.map((product) => (
                        <li key={ product.productCart.id }>
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
                          <h2 data-testid="shopping-cart-product-name">
                            { product.productCart.title }
                          </h2>
                          <button
                            data-testid="product-decrease-quantity"
                            onClick={ () => this.RemoveCart(product) }
                          >
                            -
                          </button>
                          <p data-testid="shopping-cart-product-quantity">
                            { product.quantityCart }
                          </p>
                          <button
                            data-testid="product-increase-quantity"
                            id={ product.productCart.id }
                            onClick={ () => this.SaveCarts(product.productCart) }
                          >
                            +
                          </button>
                          <span>{ ` R$${product.productCart.price}` }</span>
                        </li>
                      )))
                  }
                </ul>
              </section>
            )
          }
          {
            !productsList.length <= 0 && (
              <section className="FinalContent">
                <section className="Content">
                  <p>Valor Total da Compra:</p>
                  <p>{priceTotal.toFixed(2)}</p>
                  <Link
                    data-testid="checkout-products"
                    to="/ShoppingCart/Checkout"
                    className="LinkButton"
                    style={ { textDecoration: 'none' } }
                  >
                    Finalizar Compra

                  </Link>
                </section>
              </section>
            )
          }
        </section>
        {
          productsList.length <= 0 && (
            <section
              className="CartEmpty"
            >
              <CartEmpty />

            </section>)
        }
      </section>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.func.isRequired,
};
export default ShoppingCart;
