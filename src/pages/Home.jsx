import React from 'react';
import { Link } from 'react-router-dom';
import FilterCategories from '../Components/FilterCategories';
import { getProductByCategory, getProductByQuery } from '../services/api';
import ProductCard from '../Components/ProductCard';
import { GetSavedProduct } from '../helper/SaveCart';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      productsList: [],
      quantityCart: '',
    };
  }

  componentDidMount() {
    const CartLength = GetSavedProduct();
    this.setState({ quantityCart: CartLength });
  }

  handleInputChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  searchProducts = async () => {
    const { search } = this.state;
    const products = await getProductByQuery(search);
    console.log(products);
    this.setState({
      productsList: products,
    });
  };

  getCategory = async (category) => {
    const { id } = category;
    console.log();
    const list = await getProductByCategory(id);
    this.setState({
      productsList: list,
    });
  };

  SaveQuantity = () => {
    const CartLength = GetSavedProduct();
    this.setState({ quantityCart: CartLength });
  };

  render() {
    const { search, productsList, quantityCart } = this.state;
    return (
      <>
        <p data-testid="shopping-cart-size">{ quantityCart.length }</p>
        <aside><FilterCategories getCategory={ this.getCategory } /></aside>
        <label>
          <input
            data-testid="query-input"
            type="text"
            name="search"
            value={ search }
            onChange={ this.handleInputChange }
          />
          <button
            data-testid="query-button"
            onClick={ this.searchProducts }
          >
            Buscar
          </button>
        </label>
        {!search && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        <Link to="/ShoppingCart" data-testid="shopping-cart-button">
          Carrinho de Compras
        </Link>
        {productsList.length > 0
          ? (
            <ProductCard
              productsList={ productsList }
              SaveQuantity={ this.SaveQuantity }
            />)
          : <p>Nenhum produto foi encontrado</p>}
      </>
    );
  }
}
export default Home;
