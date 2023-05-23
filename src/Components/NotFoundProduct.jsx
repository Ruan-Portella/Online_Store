import React, { Component } from 'react';
import '../style/NotFoundProduct.css';

export default class NotFoundProduct extends Component {
  render() {
    return (
      <section className="NotFoundMain">
        <p>Nenhum produto foi encontrado</p>
        <span>Digite outro termo de pesquisa ou escolha uma categoria</span>
      </section>
    );
  }
}
