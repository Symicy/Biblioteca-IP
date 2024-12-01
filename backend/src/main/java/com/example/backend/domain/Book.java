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

import java.time.LocalDate;

/**
 * Entity class representing a Book.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT) // exclude null fields
@Table(name = "book")
public class Book
{
    /**
     * Unique identifier for the book.
     */
    @Id
    @UuidGenerator
    @Column(name = "id", unique = true, updatable = false)
    private String id;

    /**
     * Title of the book.
     */
    private String title;

    /**
     * ISBN or ISSN of the book.
     */
    private String isbnIssn;

    /**
     * Identifier of the author of the book.
     */
    private String authorId;

    /**
     * Year of publication of the book.
     */
    private String yearOfPublication;

    /**
     * Status of the book (e.g., available, checked out).
     */
    private String status;

    /**
     * Language of the book.
     */
    private String language;

    /**
     * Category of the book.
     */
    private String category;

    /**
     * URL of the book's cover image.
     */
    private String photoURL;
}