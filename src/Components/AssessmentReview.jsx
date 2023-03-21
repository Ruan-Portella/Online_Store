import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class AssessmentReview extends Component {
  render() {
    const { DataReview } = this.props;
    return (
      <section>
        {
          DataReview.map((Review) => (
            <section key={ Review.text }>
              <p data-testid="review-card-email">{Review.email}</p>
              <p data-testid="review-card-evaluation">{Review.text}</p>
              <p data-testid="review-card-rating">{Review.rating}</p>
            </section>
          ))
        }
      </section>
    );
  }
}

AssessmentReview.propTypes = {
  DataReview: PropTypes.string,
}.isRequired;
