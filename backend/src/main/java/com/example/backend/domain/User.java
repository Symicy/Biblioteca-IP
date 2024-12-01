package com.example.backend.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

/**
 * Entity class representing a User.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT) // exclude null fields
@Table(name = "user")
public class User
{
    /**
     * Unique identifier for the user.
     */
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;

    /**
     * Name of the user.
     */
    private String username;

    /**
     * Email of the user.
     */
    private String email;

    /**
     * Password of the user.
     */
    private String password;

    /**
     * Type of the user (e.g., librarian, regular user).
     */
    private String type;
}