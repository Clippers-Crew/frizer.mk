import React, { useEffect, useState } from "react";
import styles from './FeatureImages.module.scss';
import { Salon } from "../../../interfaces/Salon.interface";
import SalonService from "../../../services/salon.service";
interface FeatureImagesProps {
  salon?: Salon;
}

function FeatureImages({ salon }: FeatureImagesProps) {
  const [image, setImage] = useState<string>('');

  function getSalonImageUrl( imageNumber: number): string {
    if(salon?.images != null && salon?.images.length > 0 && salon?.images[imageNumber-1]!= null) {
      return `http://localhost:8080/api/salons/${salon.id}/image/${imageNumber}`;

    }
    else {
      return `/assets/salons/default_salon_${imageNumber}.jpg`; 

    }
  }

  return (
    <div className={styles.featuredImages}>
      <div className={styles.primaryImage}>
        <img alt="Salon image" src={getSalonImageUrl(1)} />
      </div>
      <div className={styles.secondaryImage}>
      <img alt="Salon image" src={getSalonImageUrl(2)} />
      </div>
      <div className={styles.secondaryImage}>
      <img alt="Salon image" src={getSalonImageUrl(3)} />
      </div>
      <div className={styles.teritaryImage}>
      <img alt="Salon image" src={getSalonImageUrl(4)} />
      </div>
    </div>
  );
}

export default FeatureImages;
