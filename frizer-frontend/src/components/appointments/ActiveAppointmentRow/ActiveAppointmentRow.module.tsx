import React from "react";
import { AppointmentDetails } from "../../../interfaces/AppointmentDetails.interface";
import { DateUtils } from "../../../utils/dateUtils";
import AppointmentService from "../../../services/appointment.service";

interface ActiveAppointmentRowProps {
  appointment: AppointmentDetails;
  showActions?: boolean;
  isEmployee?: boolean;
  onAppointmentRemove?: (appointment: number) => void;
}

function ActiveAppointmentRow({
  appointment,
  showActions,
  onAppointmentRemove,
  isEmployee,
}: ActiveAppointmentRowProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      window.confirm("Дали сте сигурни дека сакате да го откажете терминот?")
    ) {
      try {
        await AppointmentService.deleteAppointment(appointment.id);
        alert("Терминот е успешно откажан");
        if (onAppointmentRemove) {
          onAppointmentRemove(appointment.id);
        }
      } catch (error) {}
    }
  };

  return (
    <tr key={appointment.id}>
      <td>{DateUtils.formatDate(appointment.dateFrom)}</td>
      <td>{DateUtils.formatDate(appointment.dateTo)}</td>
      <td>{appointment.treatmentName}</td>
      <td>{appointment.salonName}</td>
      {isEmployee && <td>{appointment.employeeName}</td>}
      {isEmployee == false && <td>{appointment.customerName}</td>}

      <td>{appointment.attended ? "Да" : "Не"}</td>
      {showActions && (
        <td>
          {!DateUtils.isDateNDaysFromNow(appointment.dateFrom, 1) && (
            <form
              action={`/appointments/delete/${appointment.id}`}
              method="post"
              onSubmit={handleSubmit}
            >
              <button type="submit" className="secondaryButton">
                Откажи термин
              </button>
            </form>
          )}
        </td>
      )}
    </tr>
  );
}

export default ActiveAppointmentRow;
