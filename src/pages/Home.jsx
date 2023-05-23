import React from 'react';
import FilterCategories from '../Components/FilterCategories';
import { getProductByCategory, getProductByQuery } from '../services/api';
import ProductCard from '../Components/ProductCard';
import { GetSavedProduct, GetSavedSearch, SaveSearch } from '../helper/SaveCart';
import Header from '../Components/Header';
import NotSearchProduct from '../Components/NotSearchProduct';
import NotFoundProduct from '../Components/NotFoundProduct';
import '../style/Home.css';
import Loading from '../Components/Loading';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      productsList: [],
      quantityCart: '',
      SearchedItem: false,
      searchCategory: false,
      isLoading: false,
      FristPage: false,

    };
  }

  componentDidMount() {
    const SearchedInput = GetSavedSearch();
    const CartLength = GetSavedProduct();
    this.setState({ quantityCart: CartLength, FristPage: SearchedInput[1] });
    this.searchProducts();
  }

  handleInputChange = ({ target }) => {
    this.setState({
      search: target.value,
    });
  };

  searchProducts = async () => {
    const { search, FristPage } = this.state;
    const SearchedInput = GetSavedSearch();
    if (SearchedInput[0].length > 0) {
      this.setState({ isLoading: true });
      const products = await getProductByQuery(SearchedInput[0]);
      this.setState({
        productsList: products,
        isLoading: false,
        SearchedItem: true,
        FristPage: true,
      });
      console.log('primeiro');
    }
    if (search.length > 0) {
      this.setState({ isLoading: true });
      const products = await getProductByQuery(search);
      this.setState({
        productsList: products,
        SearchedItem: true,
        search: '',
        isLoading: false,
        FristPage: true,
      });
      console.log('segundo');
    }
    if (!search.length && FristPage && SearchedInput[0] === '') {
      this.setState({
        SearchedItem: true,
        productsList: [],
        FristPage: true,
      });
      console.log('terceiro');
    }
    if (!search.length && !FristPage && !SearchedInput[0]) {
      this.setState({
        SearchedItem: false,
        productsList: [],
        FristPage: true,
      });
      console.log('quarto');
    }
    SaveSearch('');
  };

  getCategory = async (category) => {
    const { id } = category;
    this.setState({ isLoading: true });
    const list = await getProductByCategory(id);
    this.setState({
      productsList: list,
      searchCategory: true,
      isLoading: false,
    });
  };

  SaveQuantity = () => {
    const CartLength = GetSavedProduct();
    this.setState({ quantityCart: CartLength });
  };

  render() {
    const { search, productsList, quantityCart,
      SearchedItem, searchCategory, isLoading } = this.state;
    return (
      <section>
        <Header
          search={ search }
          handleInputChange={ () => this.handleInputChange }
          searchProducts={ () => this.searchProducts }
          quantityCart={ quantityCart }
        />
        <section className="HomeMain">
          <FilterCategories getCategory={ this.getCategory } />
          {
            isLoading ? <Loading /> : (
              <section className="HomeMainContent">
                {!SearchedItem && !searchCategory && <NotSearchProduct />}
                {productsList.length === 0 && SearchedItem && <NotFoundProduct />}
                {productsList.length > 0 && <ProductCard
                  productsList={ productsList }
                  SaveQuantity={ this.SaveQuantity }
                />}
              </section>
            )
          }
        </section>
      </section>
    );
  }
}
export default Home;
