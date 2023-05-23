import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SaveProduct } from '../helper/SaveCart';
import Frete from '../images/Frete.png';
import '../style/ProductCard.css';

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
        <section className="ProductCardMain">
          {
            productsList.map((product) => (
              <li
                key={ product.id }
                data-testid="product"
              >
                <Link
                  data-testid="product-detail-link"
                  to={ `/DetailsProduct/${product.id}` }
                  style={ { textDecoration: 'none' } }
                >
                  <section key={ product.id } className="ProductCardContent">
                    {
                      product.shipping.free_shipping && <img
                        src={ Frete }
                        alt="Frete Grátis"
                        className="FreteGratisProduct"
                      />
                    }
                    <img
                      className="ImageProduct"
                      src={ product.thumbnail }
                      alt={ product.title }
                    />
                    <p>{product.title}</p>
                    <span>{`R$ ${product.price}`}</span>
                  </section>
                </Link>

                <button
                  onClick={ () => this.SaveProductAndQuantity(product) }
                  data-testid="product-add-to-cart"
                  className="ButtonProductCard"
                  id={ product.id }
                >
                  Adicionar Ao Carrinho
                </button>
              </li>
            ))
          }
        </section>
      </ul>
    );
  }
}

ProductCard.propTypes = {
  productList: PropTypes.shape,
}.isRequired;
