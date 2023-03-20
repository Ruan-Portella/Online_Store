import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class FilterCategories extends React.Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    const { getCategory } = this.props;
    return (
      <div>
        <fieldset>
          {categories.map((category) => (
            <label
              key={ category.id }
            >
              <input
                type="radio"
                data-testid="category"
                name="option"
                value={ category.name }
                onChange={ () => getCategory(category) }
              />
              { category.name }
            </label>
          ))}
        </fieldset>
      </div>
    );
  }
}

FilterCategories.propTypes = {
  getCategory: PropTypes.func,
}.isRequired;
