import React from 'react';
import styles from './ReviewItem.module.scss';
import { ReviewDetails } from '../../../interfaces/ReviewDetails.interface';
import { FaStar } from 'react-icons/fa';

interface ReviewItemProps {
  review: ReviewDetails;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const formatDate = (date: string | Date) => {
    const parsedDate = new Date(date); // Convert string or Date object to Date
    return parsedDate.toLocaleDateString(); // Format date as a readable string
  };

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
          {formatDate(review.date)}
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
