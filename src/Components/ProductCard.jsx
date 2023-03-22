import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SaveProduct } from '../helper/SaveCart';

export default class ProductCard extends Component {
  SaveProductAndQuantity = (product) => {
    const { SaveQuantity } = this.props;
    SaveProduct(product);
    SaveQuantity();
  };

  render() {
    const { productsList } = this.props;
    return (
      <ul>
        {
          productsList.map((product) => (
            <li
              key={ product.id }
              data-testid="product"
            >
              <Link
                data-testid="product-detail-link"
                to={ `/DetailsProduct/${product.id}` }
              >
                <h2>{product.title}</h2>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{`Preço: R$ ${product.price}`}</p>
              </Link>
              <button
                onClick={ () => this.SaveProductAndQuantity(product) }
                data-testid="product-add-to-cart"
                id={ product.id }
              >
                Adicionar Ao Carrinho
              </button>
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
