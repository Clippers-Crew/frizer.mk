import React from 'react';
import styles from './SalonResultsMap.module.scss';
import { Salon } from '../../../interfaces/Salon.interface';

interface SalonResultsMapProps{
    salons: Salon[];
};

function SalonResultsMap({ salons }: SalonResultsMapProps) {
  return (
    <div>SalonResultsMap</div>
  )
}

export default SalonResultsMap;