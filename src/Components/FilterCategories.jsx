import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import '../style/FilterCategories.css';

export default class FilterCategories extends React.Component {
  state = {
    categories: [],
    categoryId: '',
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  ColorChange = (category) => {
    const { getCategory } = this.props;
    getCategory(category);
    this.setState({
      categoryId: category.id,
    });
  };

  render() {
    const { categories, categoryId } = this.state;
    return (
      <section className="CategoriesMain">
        <section className="CategoriesContent">
          <h3>Categorias</h3>
          <ul className="UlContent">
            {categories.map((category) => (
              <li
                key={ category.id }
              >
                <label
                  htmlFor={ category.id }
                  className={
                    category.id === categoryId ? 'CategoriesList-selected' : null
                  }
                >
                  <input
                    id={ category.id }
                    type="radio"
                    data-testid="category"
                    name="option"
                    value={ category.id }
                    onChange={ () => this.ColorChange(category) }
                  />
                  { category.name }
                </label>
              </li>
            ))}
          </ul>
        </section>
      </section>
    );
  }
}

FilterCategories.propTypes = {
  getCategory: PropTypes.func,
}.isRequired;
