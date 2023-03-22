import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { GetSavedAssessment, GetSavedProduct, SaveProduct } from '../helper/SaveCart';
import AssessmentForm from '../Components/AssessmentForm';
import AssessmentReview from '../Components/AssessmentReview';

export default class DetailsProduct extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: '',
    attributes: [],
    idUrl: '',
    DataReview: [],
    quantityCart: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const categories = await getProductById(id);
    const Review = GetSavedAssessment(id);
    const CartLength = GetSavedProduct();
    this.setState({ ...categories,
      idUrl: id,
      DataReview: Review,
      quantityCart: CartLength });
  }

  DidMount = () => {
    this.componentDidMount();
  };

  SaveProductAndQuantity = (product) => {
    SaveProduct(product);
    this.componentDidMount();
  };

  render() {
    const { title, thumbnail, price, attributes,
      idUrl, DataReview, quantityCart } = this.state;
    return (
      <section>
        <p data-testid="shopping-cart-size">{ quantityCart.length }</p>
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
          onClick={ () => this.SaveProductAndQuantity(this.state) }
        >
          Adicionar Ao Carrinho De Compras
        </button>
        <AssessmentForm idUrl={ idUrl } DidMount={ () => this.DidMount() } />
        <AssessmentReview DataReview={ DataReview } />
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
