import React, { useEffect, useState } from "react";
import styles from "./SalonCard.module.scss";
import { Salon } from "../../../interfaces/Salon.interface";
import { SALON_MOCK } from "../../../mock/salon.mock";
import { Link } from "react-router-dom";
import { FaStar, FaLocationDot } from "react-icons/fa6";

interface SalonCardProps {
  salon?: Salon;
}

function SalonCard({ salon }: SalonCardProps) {
  return (
    <div className={`${styles.card}`}>
      <div>
          {/* [src]="getLogoImage()" */}
        <img className={`${styles.image}`} src="./raspored.jpg" alt="Fitness center" />
        <h3 className={`${styles.title}`}>{salon?.name}</h3>
        <p className={`${styles.rating}`}>
          <FaStar />
        {salon?.rating} ({salon?.numberOfReviews} рецензии)
        </p>
        <p className={`${styles.location}`}>
          <FaLocationDot />
          {salon?.location}
        </p>
        {/* @if (distance != null && distance != 0) {
      <p>
        { distance } km
      </p>
      } */}
      </div>
      <div>
        <Link to={"/salons/" + salon?.id}>
          <button className={`primaryButton ${styles.primaryButton}`}>Прегледај</button>
        </Link>
      </div>
    </div>
  );
}

export default SalonCard;
