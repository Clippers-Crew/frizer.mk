import React, { useEffect, useState } from 'react';
import styles from './TreatmentList.module.scss';
import { Salon } from '../../../interfaces/Salon.interface';
import { Treatment } from '../../../interfaces/Treatment.interface';
import TreatmentService from '../../../services/treatment.service';
import TreatmentItem from '../TreatmentItem/TreatmentItem.component';
import TreatmentDetailsItem from '../TreatmentDetailsItem/TreatmentDetailsItem.component';
import ReserveAppointmentForm from '../ReserveAppointmentForm/ReserveAppointmentForm.component';

interface TreatmentListProps {
  salon?: Salon;
}

function TreatmentList({ salon }: TreatmentListProps) {
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    const fetchTreatments = async () => {
      if (salon?.salonTreatmentsIds && salon?.salonTreatmentsIds.length > 0) {
        try {
          const response = await TreatmentService.getTreatmentsByIds(salon?.salonTreatmentsIds);
          setTreatments(response.data);
        } catch (error) {
        }
      }
    };

    fetchTreatments();
  }, [salon?.salonTreatmentsIds]);

  return (
    <div className={styles.services}>
      <h1>Третмани</h1>
      {treatments.length === 0 ? (
        <p>Нема третмани</p>
      ) : (
        <>
       <div className={styles.column} >
       {treatments.map((treatment, index) => (
            <div key={treatment.id} className={styles.column}>
              <TreatmentItem treatment={treatment} />
            </div>
          ))}
       </div>
 
          <div className={styles.column}>
          {treatments.map((treatment, index) => (
           <>
            <div key={index} className={styles.serviceType}>
              <TreatmentDetailsItem treatment={treatment} />
              <ReserveAppointmentForm treatmentId={treatment.id} salonId={salon?.id}/>
            </div>
          <hr/>
           </>
          ))}

        </div>
       </> 
      )
      
      }

    </div>
  );
}

export default TreatmentList;
