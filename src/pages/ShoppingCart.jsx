import React from 'react';
import { SaveProduct, GetSavedProductQuantity } from '../helper/SaveCart';

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

  increaseProductQuantity = (productId) => {
    const { productsList } = this.state;
    const newProductsList = productsList.map((product) => {
      if (product.productCart.id === productId) {
        return {
          productCart: product.productCart,
          quantityCart: product.quantityCart + 1,
        };
      }
      return product;
    });
    this.setState({ productsList: newProductsList });
    GetSavedProductQuantity(newProductsList);
  };

  decreaseProductQuantity = (productId) => {
    const { productsList } = this.state;
    const newProductsList = productsList.map((product) => {
      if (product.productCart.id === productId) {
        if (product.quantityCart > 1) {
          return {
            productCart: product.productCart,
            quantityCart: product.quantityCart - 1,
          };
        }
        return product;
      }
      return product;
    });
    this.setState({ productsList: newProductsList });
    GetSavedProductQuantity(newProductsList);
  };

  removeProductFromCart = (productId) => {
    const { productsList } = this.state;
    const newProductsList = productsList.filter((product) => product
      .productCart.id !== productId);
    this.setState({ productsList: newProductsList });
    SaveProduct(newProductsList);
  };

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
                      {product.productCart.title}

                    </h3>
                    <img
                      src={ product.productCart.thumbnail }
                      alt={ product.productCart.title }
                    />
                    <p>{product.productCart.price}</p>
                    <p data-testid="shopping-cart-product-quantity">
                      {product.quantityCart}
                    </p>
                    <div>
                      <button
                        type="button"
                        data-testid="product-decrease-quantity"
                        onClick={ () => this.decreaseProductQuantity(product
                          .productCart.id) }
                      >
                        -
                      </button>
                      <p data-testid="shopping-cart-product-quantity">
                        { product.quantityCart }
                      </p>
                      <button
                        type="button"
                        data-testid="product-increase-quantity"
                        onClick={ () => this.increaseProductQuantity(product
                          .productCart.id) }
                      >
                        +
                      </button>
                      <button
                        type="button"
                        data-testid="remove-product"
                        onClick={ () => this.removeProductFromCart(product
                          .productCart.id) }
                      >
                        Remover
                      </button>
                    </div>
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
