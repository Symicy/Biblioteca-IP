package com.example.backend.controller;

import com.example.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * REST controller for handling password reset requests.
 */
@RestController
@RequestMapping("/api")
public class PasswordResetController {

    @Autowired
    private EmailService emailService;

    /**
     * Endpoint for handling forgot password requests.
     *
     * @param request a map containing the email address of the user who forgot their password.
     * @return a ResponseEntity with a message indicating that the password reset link has been sent.
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        // Generate a token (for simplicity, using a static token here)
        String token = "dummy-token";
        emailService.sendPasswordResetEmail(email, token);
        return ResponseEntity.ok("Password reset link sent!");
    }
}