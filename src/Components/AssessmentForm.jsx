import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SaveAssessment } from '../helper/SaveCart';
import '../style/AssessmentForm.css';

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
      const { idUrl, DidMount } = this.props;
      const { text, email, rating } = this.state;
      const Assessment = { text, email, rating };
      SaveAssessment(Assessment, idUrl);
      DidMount();
    }
  };

  render() {
    const { email, text, ErrorMessage } = this.state;
    return (
      <section className="FormMain">
        <h2>Avaliações</h2>
        <section className="FormContent">
          <section className="InputEmailAssessment">
            <label className="InputEmail">
              <input
                type="email"
                data-testid="product-detail-email"
                name="email"
                value={ email }
                placeholder="Email"
                onChange={ this.handleChange }
              />
            </label>
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
          </section>
          <label className="TextAreaInput">
            <textarea
              type="text"
              data-testid="product-detail-evaluation"
              name="text"
              value={ text }
              onChange={ this.handleChange }
              placeholder="Mensagem (opcional)"
            />
          </label>
          <button
            type="button"
            className="ButtonForm"
            onClick={ this.CreateAssessment }
            data-testid="submit-review-btn"
          >
            Avaliar
          </button>
          {
            ErrorMessage && (<p data-testid="error-msg">Campos inválidos</p>)
          }
        </section>
      </section>
    );
  }
}

AssessmentForm.propTypes = {
  idUrl: PropTypes.string,
}.isRequired;
