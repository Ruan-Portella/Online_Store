import React from 'react';
import { GetSavedProductQuantity } from '../helper/SaveCart';

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

  render() {
    const { productsList } = this.state;
    return (
      <section>
        <ul>
          {
            productsList.length <= 0 ? (
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
              : (
                productsList.map((product) => (
                  <li key={ product.productCart.id }>
                    <h3 data-testid="shopping-cart-product-name">
                      { product.productCart.title }

                    </h3>
                    <img
                      src={ product.productCart.thumbnail }
                      alt={ product.productCart.title }
                    />
                    <p>{product.productCart.price}</p>
                    <p data-testid="shopping-cart-product-quantity">
                      { product.quantityCart }
                    </p>
                  </li>
                ))
              )
          }
        </ul>
      </section>
    );
  }
}

export default ShoppingCart;
