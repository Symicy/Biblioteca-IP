package com.example.backend.carte;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/carte")
public class CarteController
{
    private final CarteSevice carteSevice;

    @Autowired
    public CarteController(CarteSevice carteSevice)
    {
        this.carteSevice = carteSevice;
    }

    @GetMapping
    public List<Carte> getCarti()
    {
        return carteSevice.getCarti();
    }
}
