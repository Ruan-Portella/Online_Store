import React, { Component } from 'react';
import '../style/CartEmpty.css';

export default class CartEmpty extends Component {
  render() {
    return (
      <section className="CartEmptyMain">
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
      </section>
    );
  }
}
