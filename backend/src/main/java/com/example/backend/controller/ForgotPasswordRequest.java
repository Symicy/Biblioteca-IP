package com.example.backend.controller;

import lombok.Getter;

@Getter
public class ForgotPasswordRequest {
    // Getters and setters
    private String email;

    public void setEmail(String email) {
        this.email = email;
    }
}