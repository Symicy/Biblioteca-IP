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

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT) // exclude null fields
@Table(name = "book")

public class Book
{
    @Id
    @UuidGenerator
    @Column(name = "id",unique = true, updatable = false)
    private String id;
    private String titlu;
    private String isbn_issn;
    private String autor_id;
    private String an_publicare;
    private String status;
    private String limba;
    private String categorie;
    private String pozaURL;
}
