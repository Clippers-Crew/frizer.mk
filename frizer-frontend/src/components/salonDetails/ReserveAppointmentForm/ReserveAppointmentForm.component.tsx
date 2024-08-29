import React from 'react';
import styles from './ReserveAppointmentForm.module.scss'
interface ReserveAppointmentFormProps {
  salonId?: number;
  treatmentId?: number;
}

function ReserveAppointmentForm({ salonId, treatmentId }: ReserveAppointmentFormProps) {
  return (
    <form action="/salons/appointment" method="get" className={styles.reserveAppointmentForm}>
      <input type="hidden" name="salon" value={salonId} />
      <input type="hidden" name="treatment" value={treatmentId} />
      <button type="submit" className={`primaryButton`}>
        Резервирај
      </button>
    </form>
  );
}

export default ReserveAppointmentForm;
