/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import '../style/CheckoutForm.css';

export default class CheckoutForm extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    inputCPF: '',
    inputTelefone: '',
    inputCEP: '',
    inputAddress: '',
    ErrorMessage: false,
    Notvalidate: false,
    payment: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.ValidateForm);
  };

  ValidateForm = () => {
    const {
      inputName,
      inputEmail,
      inputCPF,
      inputTelefone,
      inputCEP,
      inputAddress,
      payment,
    } = this.state;
    const validation = inputName.length > 0
      && inputEmail.length > 0
      && inputCPF.length > 0
      && inputTelefone.length > 0
      && inputCEP.length > 0
      && inputAddress.length > 0
      && payment.length > 0;
    console.log(validation);
    if (!validation) {
      this.setState({ Notvalidate: true });
    } else {
      this.setState({ Notvalidate: false });
    }
    return validation;
  };

  FinishShop = async () => {
    const { searchProducts } = this.props;
    const { Notvalidate } = this.state;
    if (Notvalidate) {
      this.setState({
        ErrorMessage: true,
      });
    } else {
      this.setState({
        ErrorMessage: false,
      });
      localStorage.setItem('CartsProduct', []);
      localStorage.setItem('ProductQuantity', []);
      searchProducts();
    }
  };

  render() {
    const {
      inputName,
      inputEmail,
      inputCPF,
      inputTelefone,
      inputCEP,
      inputAddress,
      ErrorMessage,
    } = this.state;
    return (
      <section className="FormContentMain">
        <h3>Informações do Comprador</h3>
        <section className="NameAndCpf">
          <input
            data-testid="checkout-fullname"
            name="inputName"
            value={ inputName }
            placeholder="Nome Completo"
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-cpf"
            name="inputCPF"
            value={ inputCPF }
            placeholder="CPF"
            onChange={ this.handleChange }
          />
        </section>
        <section className="EmailAndTelefone">
          <input
            data-testid="checkout-email"
            name="inputEmail"
            value={ inputEmail }
            placeholder="email@email.com"
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-phone"
            name="inputTelefone"
            value={ inputTelefone }
            placeholder="(00)00000-0000"
            onChange={ this.handleChange }
          />
        </section>
        <section className="CepAndEnd">
          <input
            data-testid="checkout-cep"
            name="inputCEP"
            value={ inputCEP }
            placeholder="00000-000"
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-address"
            name="inputAddress"
            value={ inputAddress }
            placeholder="Endereço Completo"
            onChange={ this.handleChange }
          />
        </section>
        <section className="Payment">
          <label>
            Pix
            <input
              type="radio"
              data-testid="ticket-payment"
              name="payment"
              value="1"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Visa
            <input
              type="radio"
              data-testid="visa-payment"
              name="payment"
              value="2"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Mastercard
            <input
              type="radio"
              data-testid="master-payment"
              name="payment"
              value="3"
              onChange={ this.handleChange }
            />
          </label>
          <label>
            Elo
            <input
              type="radio"
              data-testid="elo-payment"
              name="payment"
              value="4"
              onChange={ this.handleChange }
            />
          </label>
        </section>
        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ () => this.FinishShop() }
        >
          Comprar

        </button>
        {
          ErrorMessage && (<p data-testid="error-msg">Campos inválidos</p>)
        }
      </section>
    );
  }
}
