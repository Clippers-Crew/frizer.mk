import React, { useEffect, useState } from 'react'
import Search from '../../fragments/Search/Search.component';
import { Link } from 'react-router-dom';
import styles from './LandingSection.module.scss';
import { SalonsPerCity } from '../../../interfaces/SalonsPerCity.interface';
import { SALONS_PER_CITY_MOCK } from '../../../mock/salonsPerCity.mock';

function LandingSection() {
    const [salonsPerCities, setsalonsPerCities] = useState<SalonsPerCity[]>([]);

    useEffect(() => {
        // fetchsalonsPerCities();
        setsalonsPerCities(SALONS_PER_CITY_MOCK);
    }, [])

  return (
    <div className={`${styles.landingPage}`}>
        <img src="./background-image.png" alt="Background" />
        <div className={`${styles.blackOverlay}`}></div>
        <h1 className={`${styles.title}`}>Само еден клик оддалечени од <br/>
        вашиот омилен салон за убавина</h1>
        <h4 className={`${styles.subtitle}`}>Резервирај брзо, лесно и едноставно со Frizer.mk</h4>

        <Search/>

        <div className={`${styles.tags}`}>
        <h4>Фитнес центри по градови</h4>
        {salonsPerCities.map(entry => {
            return (
            <Link to={`/salons/${entry.city}`} className={`${styles.tag}`}>
                <div>
                    <h5>{entry.city}</h5>
                    <p>{entry.count} {entry.count > 0 ? 'салони': 'салон' }</p>
                </div>
            </Link>
            );
        })}
            
        </div>
  </div>  
  )
}

export default LandingSection;