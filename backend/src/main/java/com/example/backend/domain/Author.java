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

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT) // exclude null fields
@Table(name = "author")
public class Author
{
    @Id
    @UuidGenerator
    @Column(name = "id",unique = true, updatable = false)
    private String id;
    private String nume;
    private String prenume;
    private String data_nasterii;
    private String data_decesului;
    private String tara;
}
