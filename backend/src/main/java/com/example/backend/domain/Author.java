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
 * Entity class representing an Author.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT) // exclude null fields
@Table(name = "author")
public class Author
{
    /**
     * Unique identifier for the author.
     */
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;

    /**
     * Last name of the author.
     */
    private String lastName;

    /**
     * First name of the author.
     */
    private String firstName;

    /**
     * Birth date of the author.
     */
    private String dateOfBirth;

    /**
     * Death date of the author.
     */
    private String dateOfDeath;

    /**
     * Country of the author.
     */
    private String country;
}