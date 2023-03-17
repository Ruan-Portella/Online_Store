import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterCategories from '../Components/FilterCategories';

function Home() {
  const [search, setSearch] = useState('');
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <aside><FilterCategories /></aside>
      <label>
        <input
          type="text"
          name="search"
          value={ search }
          onChange={ handleInputChange }
        />
      </label>
      {!search && (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      )}
      <Link to="/ShoppingCart" data-testid="shopping-cart-button" />
    </>
  );
}
export default Home;
