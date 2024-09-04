import React from 'react';
import styles from './ReviewItem.module.scss';
import { ReviewDetails } from '../../../interfaces/ReviewDetails.interface';
import { FaStar } from 'react-icons/fa';
import { DateUtils } from '../../../utils/dateUtils';

interface ReviewItemProps {
  review: ReviewDetails;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
    return (
    <div className={styles.review}>
      <div className={styles.row}>
        <div className={styles.reviewName}>
          <h2>
            {review.authorFirstName} {review.authorLastName}
          </h2>
        </div>
        <div className={styles.reviewEmployeeName}>
          {review.employeeFullName}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.reviewStars}>
          <span>{review.rating}</span>
          <FaStar />
        </div>
      </div>
        <div className={styles.reviewDate}>
          {DateUtils.formatDate(review.date)}
        </div>
    
      <div className={styles.row}>
        <div className={styles.reviewText}>
          {review.comment}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
