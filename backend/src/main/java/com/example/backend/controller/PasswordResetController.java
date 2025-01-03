package com.example.backend.controller;

import com.example.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PasswordResetController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        // Generate a token (for simplicity, using a static token here)
        String token = "dummy-token";
        emailService.sendPasswordResetEmail(email, token);
        return ResponseEntity.ok("Password reset link sent!");
    }
}