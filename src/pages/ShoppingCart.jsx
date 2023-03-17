import React from 'react';

class ShoppingCart extends React.Component {
  constructor() {
    super();

    this.state = {
      productsList: [],
    };
  }

  render() {
    const { productsList } = this.state;
    return (
      <section>
        {
          productsList.length <= 0 && (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
        }
      </section>
    );
  }
}

export default ShoppingCart;
