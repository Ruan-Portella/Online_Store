import React, { Component } from 'react';

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

  FinishShop = () => {
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
      <form>
        <label>
          Nome
          <input
            data-testid="checkout-fullname"
            name="inputName"
            value={ inputName }
            placeholder="Nome Completo"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Email
          <input
            data-testid="checkout-email"
            name="inputEmail"
            value={ inputEmail }
            placeholder="email@email.com"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          CPF
          <input
            data-testid="checkout-cpf"
            name="inputCPF"
            value={ inputCPF }
            placeholder="000.000.000-00"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Telefone
          <input
            data-testid="checkout-phone"
            name="inputTelefone"
            value={ inputTelefone }
            placeholder="(00)00000-0000"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          CEP
          <input
            data-testid="checkout-cep"
            name="inputCEP"
            value={ inputCEP }
            placeholder="00000-000"
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Endereço
          <input
            data-testid="checkout-address"
            name="inputAddress"
            value={ inputAddress }
            placeholder="Endereço Completo"
            onChange={ this.handleChange }
          />
        </label>
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
        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ this.FinishShop }
        >
          Finalizar Compra

        </button>
        {
          ErrorMessage && (<p data-testid="error-msg">Campos inválidos</p>)
        }
      </form>
    );
  }
}
