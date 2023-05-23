import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../style/AssessmentReview.css';

export default class AssessmentReview extends Component {
  render() {
    const { DataReview } = this.props;
    return (
      <section className="ReviewMain">
        {
          DataReview.map((Review) => (
            <section key={ Review.text } className="ReviewContent">
              <section className="Review">
                <h3 data-testid="review-card-email">{Review.email}</h3>
                <span data-testid="review-card-rating">{`Nota: ${Review.rating}`}</span>
              </section>
              <p data-testid="review-card-evaluation">{Review.text}</p>
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
