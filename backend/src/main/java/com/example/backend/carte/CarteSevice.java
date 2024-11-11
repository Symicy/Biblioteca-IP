package com.example.backend.carte;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CarteSevice
{
    public List<Carte> getCarti() {
        return List.of(
                new Carte("Luceafarul", "1234", 1, LocalDate.of(2021, 1, 1)),
                new Carte("Moara cu noroc", "1235", 2, LocalDate.of(2021, 1, 1))
        );
    }
}
