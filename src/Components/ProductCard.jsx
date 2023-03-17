import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { productsList } = this.props;
    return (
      <ul>
        {
          productsList.map((product) => (
            <li key={ product.id } data-testid="product">
              <h2>{product.title}</h2>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{`Preço: R$ ${product.price}`}</p>
            </li>
          ))
        }
      </ul>
    );
  }
}

ProductCard.propTypes = {
  productList: PropTypes.shape,
}.isRequired;
