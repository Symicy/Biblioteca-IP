package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ForgotPasswordService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetLink(String email) {
        try {
            // Generate a unique token
            String token = UUID.randomUUID().toString();

            // Create a simple mail message
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Password Reset Request");
            message.setText("Click the link to reset your password: https://www.example.com/reset-password?token=" + token);

            // Send the email
            mailSender.send(message);

            // Save the token and email in the database (not shown here)
        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error sending password reset link: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error sending password reset link. Please try again.");
        }
    }
}