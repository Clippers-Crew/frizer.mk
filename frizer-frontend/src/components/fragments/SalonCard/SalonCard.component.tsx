import React from 'react'
import styles from './SalonCard.module.scss';
import { Salon } from "../../../interfaces/Salon.interface";

interface SalonCardProps{
  salon: Salon;
}

function SalonCard({salon}: SalonCardProps) {
  return (
    <button className={`${styles.primaryButton}`}>
        <b>
          {salon.name}
        </b>
    </button>  
    )
}

export default SalonCard;