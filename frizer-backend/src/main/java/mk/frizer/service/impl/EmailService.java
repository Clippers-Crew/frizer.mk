package mk.frizer.service.impl;

import mk.frizer.domain.Appointment;
import mk.frizer.domain.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendAppointmentConfirmation(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }
    public void sendAppointmentCancellation(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);

        mailSender.send(message);
    }
    public String createMessage( Appointment appointment) {
        return "Почитуван/а " + appointment.getCustomer().getFullName() + ",\n\n" +
                "Направивте успешна резервација на третман преку апликацијата frizer.mk.\n" +
                "Детали за резервацијата:\n" +
                "Почеток на третман: " + appointment.getDateFrom()+ "\n" +
                "Крај на третман: " + appointment.getDateTo()+ "\n" +
                "Салон: " + appointment.getSalon().getName() + "\n" +
                "Вработен: " + appointment.getEmployee().getFullName() + "\n" +
                "Третман: " + appointment.getTreatment().getName() + "\n" +
                "Ви благодариме за довербата!" + "\n" +
                "Со почит," + "\n" +
                "Frizer mk";
    }
    public String createCancellationMessage( Appointment appointment) {
        return "Почитуван/а " + appointment.getCustomer().getFullName() + ",\n\n" +
                "Успешно ја откажавте вашата резервација на третман преку апликацијата frizer.mk.\n" +
                "Детали за резервацијата:\n" +
                "Почеток на третман: " + appointment.getDateFrom()+ "\n" +
                "Крај на третман: " + appointment.getDateTo()+ "\n" +
                "Салон: " + appointment.getSalon().getName() + "\n" +
                "Вработен: " + appointment.getEmployee().getFullName() + "\n" +
                "Третман: " + appointment.getTreatment().getName() + "\n" +
                "Со почит," + "\n" +
                "Frizer mk";
    }
}