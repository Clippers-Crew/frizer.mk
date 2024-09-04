import React, { useEffect, useState } from "react";
import styles from "./ReviewList.module.scss";
import ReviewService from "../../../services/review.service";
import { ReviewDetails } from "../../../interfaces/ReviewDetails.interface";
import ReviewItem from "../ReviewItem/ReviewItem.component";
import { Salon } from "../../../interfaces/Salon.interface";
import { Review } from "../../../interfaces/Review.interface";

interface ReviewListProps {
  salon?: Salon;
}

const ReviewList: React.FC<ReviewListProps> = ({ salon }: ReviewListProps) => {
  const [reviews, setReviews] = useState<ReviewDetails[]>([]);
  const [reviewIds, setReviewIds] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!salon?.id) {
        return;
      }

      try {
        const response = await ReviewService.getReviewBySalon(salon?.id);
        setReviewIds(response.data);
      } catch (err) {
        console.error("Failed to fetch reviews by salon");
      } 
    };

    fetchReviews();
  }, [salon]);
  useEffect(() => {
 if(reviewIds.length > 0) {
  const fetchReviews = async () => {
    try {
      
      const response = await ReviewService.getReviewsByIds(
        reviewIds.map((r) => r.id)
      );
      setReviews(response.data);
    } catch (err) {
    } 
  };

    fetchReviews();
 }
  }, [reviewIds]);

  return (
    <div className={styles.reviews}>
      <h1>Резиме на рецензии</h1>
      {reviews.length === 0 ? (
        <p>Нема рецензии</p>
      ) : (
        reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))
      )}
    </div>
  );
};

export default ReviewList;
