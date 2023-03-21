import React from 'react';
import { Link } from 'react-router-dom';
import { GetSavedProductQuantity, removeCartID,
  removeCartIDButton, SaveProduct } from '../helper/SaveCart';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
    };
  }

  componentDidMount() {
    const Cart = GetSavedProductQuantity();
    this.setState({ productsList: Cart });
  }

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
    SaveProduct(product);
    this.componentDidMount();
  };

  render() {
    const { productsList } = this.state;
    return (
      <section>
        <ul data-testid="product-add-to-cart">
          {
            productsList.length <= 0 ? (
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
              : (
                productsList.map((product) => (
                  <li key={ product.productCart.id }>
                    <h2 data-testid="shopping-cart-product-name">
                      { product.productCart.title }
                    </h2>
                    <img
                      src={ product.productCart.thumbnail }
                      alt={ product.productCart.title }
                    />
                    <p>{ product.productCart.price }</p>
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
                    <button
                      onClick={ () => this.RemoveCartButtom(product) }
                      data-testid="remove-product"
                    >
                      Remover
                    </button>
                  </li>
                )))
          }
        </ul>
        <Link data-testid="checkout-products" to="/ShoppingCart/Checkout">Continuar Compra</Link>
      </section>
    );
  }
}
export default ShoppingCart;
