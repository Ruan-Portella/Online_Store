import React, { Component } from 'react';
import '../style/NotSearchProduct.css';

export default class NotSearchProduct extends Component {
  render() {
    return (
      <section className="NotSearchMain">
        <p>Você ainda não realizou uma Busca</p>
        <span>Digite algum termo de pesquisa ou escolha uma categoria</span>
      </section>
    );
  }
}
