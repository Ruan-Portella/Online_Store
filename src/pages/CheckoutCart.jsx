import React, { Component } from 'react'
import CheckoutForm from '../Components/CheckoutForm';
import { GetSavedProductQuantity } from '../helper/SaveCart';

export default class CheckoutCart extends Component {
  state = {
    products: [],
  }
  componentDidMount() {
    const cartProducts = GetSavedProductQuantity();
    this.setState({
      products: cartProducts,
    });
  }
  render() {
    const { products } = this.state;
    return (
      <section>
        {
          products.map((product) => (
            <div>
              <p>{ product.productCart.title }</p>
            </div>
          ))
        }
        <CheckoutForm />
      </section>
    )
  }
}
