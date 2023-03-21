import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SaveAssessment } from '../helper/SaveCart';

export default class AssessmentForm extends Component {
  state = {
    email: '',
    text: '',
    rating: '',
    Notvalidate: false,
    ErrorMessage: false,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.ValidateForm);
  };

  ValidateForm = () => {
    const { email, rating } = this.state;
    const regex = /^[\w-]+@([\w-]+\.)+[\w-]{3,4}$/i;
    const Validation = email.match(regex) && email.length > 0
    && rating.length > 0;
    if (!Validation) {
      this.setState({ Notvalidate: true });
    } else {
      this.setState({ Notvalidate: false });
    }
    return Validation;
  };

  CreateAssessment = () => {
    const { Notvalidate } = this.state;
    if (Notvalidate) {
      this.setState({
        ErrorMessage: true,
      });
    } else {
      this.setState({
        ErrorMessage: false,
        email: '',
        text: '',
        rating: '',
      });
    }
    const { idUrl, DidMount } = this.props;
    const { text, email, rating } = this.state;
    const Assessment = { text, email, rating };
    SaveAssessment(Assessment, idUrl);
    DidMount();
  };

  render() {
    const { email, text, ErrorMessage } = this.state;
    return (
      <form>
        <label>
          Email:
          <input
            type="email"
            data-testid="product-detail-email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        Avaliação:
        <input
          type="radio"
          data-testid="1-rating"
          name="rating"
          value="1"
          onChange={ this.handleChange }
        />
        <input
          type="radio"
          data-testid="2-rating"
          name="rating"
          value="2"
          onChange={ this.handleChange }
        />
        <input
          type="radio"
          data-testid="3-rating"
          name="rating"
          value="3"
          onChange={ this.handleChange }
        />
        <input
          type="radio"
          data-testid="4-rating"
          name="rating"
          value="4"
          onChange={ this.handleChange }
        />
        <input
          type="radio"
          data-testid="5-rating"
          name="rating"
          value="5"
          onChange={ this.handleChange }
        />
        <label>
          Descrição:
          <textarea
            type="text"
            data-testid="product-detail-evaluation"
            name="text"
            value={ text }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.CreateAssessment }
          data-testid="submit-review-btn"
        >
          Enviar

        </button>
        {
          ErrorMessage && (<p data-testid="error-msg">Campos inválidos</p>)
        }
      </form>
    );
  }
}

AssessmentForm.propTypes = {
  idUrl: PropTypes.string,
}.isRequired;
