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
            <input
              type="radio"
              key={ category.id }
              data-testid="category"
              name="option"
              value={ category.name }
              onChange={ () => getCategory(category) }
            />
          ))}
        </fieldset>
      </div>
    );
  }
}

FilterCategories.propTypes = {
  getCategory: PropTypes.func,
}.isRequired;
