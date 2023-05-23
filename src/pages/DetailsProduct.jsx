/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import {
  GetSavedAssessment,
  GetSavedProduct,
  SaveProduct, SaveSearch } from '../helper/SaveCart';
import AssessmentForm from '../Components/AssessmentForm';
import AssessmentReview from '../Components/AssessmentReview';
import Header from '../Components/Header';
import VoltarImage from '../images/Voltar.png';
import '../style/DetailsProduct.css';

export default class DetailsProduct extends Component {
  state = {
    title: '',
    thumbnail: '',
    price: '',
    attributes: [],
    idUrl: '',
    DataReview: [],
    quantityCart: '',
    search: '',
    FirstPage: true,
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

  handleInputChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  searchProducts = async () => {
    const { history } = this.props;
    const { search, FirstPage } = this.state;
    SaveSearch(search, FirstPage);
    history.push('/');
  };

  SaveProductAndQuantity = (product) => {
    SaveProduct(product);
    this.componentDidMount();
  };

  render() {
    const { title, thumbnail,
      price, attributes,
      idUrl, DataReview,
      quantityCart, search } = this.state;
    return (
      <section>
        <Header
          search={ search }
          searchProducts={ () => this.searchProducts }
          handleInputChange={ () => this.handleInputChange }
          quantityCart={ quantityCart }
        />
        <section className="Product">
          <section className="ProductLeft">
            <Link style={ { textDecoration: 'none' } } to="/">
              <section className="ProductLeftBack">
                <img src={ VoltarImage } alt="Imagem de Voltar" />
                <p>Voltar</p>
              </section>
            </Link>
            <section className="ProductLeftMain">
              <section className="ProductLeftContent">
                <h2 data-testid="product-detail-name">{ title }</h2>
                <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
              </section>
            </section>
          </section>
          <section className="ProductRight">
            <section className="ProductRightInfo">
              <h3>Especificações Técnicas</h3>
              <ul>
                {
                  attributes.map((value) => (
                    <li key={ value.value_name }>
                      <span>{` ${value.name}:  `}</span>
                      <span>{value.value_name}</span>
                    </li>

                  ))

                }
              </ul>
            </section>
            <section className="ProductRigthCart">
              <p data-testid="product-detail-price">{`R$ ${price}`}</p>
              <button
                data-testid="product-detail-add-to-cart"
                onClick={ () => this.SaveProductAndQuantity(this.state) }
              >
                Adicionar Ao Carrinho De Compras
              </button>
            </section>
          </section>
        </section>
        <section className="AssessmentMain">
          <AssessmentForm idUrl={ idUrl } DidMount={ () => this.DidMount() } />
          <AssessmentReview DataReview={ DataReview } />
        </section>
      </section>

    );
  }
}

DetailsProduct.propTypes = {
  history: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
