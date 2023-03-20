import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const { productsList } = this.props;
    return (
      <ul>
        {
          productsList.map((product) => (
            <Link
              data-testid="product-detail-link"
              to={ `/DetailsProduct/${product.id}` }
              key={ product.id }
            >
              <li
                data-testid="product"
              >
                <h2>{product.title}</h2>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{`Preço: R$ ${product.price}`}</p>
              </li>
            </Link>
          ))
        }
      </ul>
    );
  }
}

ProductCard.propTypes = {
  productList: PropTypes.shape,
}.isRequired;
