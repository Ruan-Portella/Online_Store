import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { SaveProduct } from '../helper/SaveCart';

export default class DetailsProduct extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: '',
    attributes: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const categories = await getProductById(id);
    this.setState({ ...categories });
    console.log(categories);
  }

  render() {
    const { title, thumbnail, price, attributes } = this.state;
    return (
      <section>
        <h2 data-testid="product-detail-name">{ title }</h2>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-price">{price}</p>
        <ul>
          {
            attributes.map((value) => (
              <li key={ value.value_name }>
                <p>{ value.name }</p>
                <p>{value.value_name}</p>
              </li>

            ))

          }
          <Link
            to="/ShoppingCart"
            data-testid="shopping-cart-button"
          >
            Carrinho de Compras

          </Link>
        </ul>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => SaveProduct(this.state) }>
           Adicionar Ao Carrinho De Compras</button>
      </section>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
