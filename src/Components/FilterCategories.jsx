import React from 'react';
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
    return (
      <div>
        <ul>
          {categories.map((category) => (
            <li key={ category.id } data-testid="category">{category.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
