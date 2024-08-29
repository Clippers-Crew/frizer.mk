import React from "react";
import styles from './SalonBaseInfo.module.scss';
import { Salon } from "../../../interfaces/Salon.interface";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface SalonBaseInfoProps {
  salon?: Salon;
}

function SalonBaseInfo({ salon }: SalonBaseInfoProps) {
  return (
    <div className={styles.salonProfile}>
      <div className={styles.row}>
        <div className={styles.salonImage}>
          <img src='/assets/salons/salon_image.png' alt="Salon image" />
        </div>
        <div className={styles.salonName}>
          <h1>{salon?.name}</h1>
          <FaRegHeart />
        </div>
      </div>

      <div className={styles.salonInfoRow}>
        <FaLocationDot />
        <span>{salon?.location}</span>
        <FaStar />
        <span>{salon?.rating.toPrecision(2)}
          {salon && salon.numberOfReviews > 1 ? `(${salon?.numberOfReviews} рецензии)` : `(${salon?.numberOfReviews} рецензија)`}</span>
      </div>
    </div>
  );
}

export default SalonBaseInfo;
