package com.example.backend.carte;

import java.time.LocalDate;

public class Carte
{
    private long id;
    private String titlu;
    private String isbn_isssn;
    private long autor_id;
    private LocalDate data_publicare;

    //constructor fara parametri
    public Carte()
    {
    }
    //constructor cu parametri
    public Carte(String isbn_isssn, long id, String titlu, long autor_id, LocalDate data_publicare)
    {
        this.isbn_isssn = isbn_isssn;
        this.id = id;
        this.titlu = titlu;
        this.autor_id = autor_id;
        this.data_publicare = data_publicare;
    }
    //constructor cu parametri (fara id)
    public Carte(String titlu, String isbn_isssn, long autor_id, LocalDate data_publicare)
    {
        this.titlu = titlu;
        this.isbn_isssn = isbn_isssn;
        this.autor_id = autor_id;
        this.data_publicare = data_publicare;
    }

    //getters si setters
    public long getId()
    {
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }

    public String getTitlu()
    {
        return titlu;
    }

    public void setTitlu(String titlu)
    {
        this.titlu = titlu;
    }

    public String getIsbn_isssn()
    {
        return isbn_isssn;
    }

    public void setIsbn_isssn(String isbn_isssn)
    {
        this.isbn_isssn = isbn_isssn;
    }

    public long getAutor_id()
    {
        return autor_id;
    }

    public void setAutor_id(long autor_id)
    {
        this.autor_id = autor_id;
    }

    public LocalDate getData_publicare()
    {
        return data_publicare;
    }

    public void setData_publicare(LocalDate data_publicare)
    {
        this.data_publicare = data_publicare;
    }

    //metoda toString

    @Override
    public String toString()
    {
        return "Carte{" +
                "id=" + id +
                ", titlu='" + titlu + '\'' +
                ", isbn_isssn='" + isbn_isssn + '\'' +
                ", autor_id=" + autor_id +
                ", data_publicare=" + data_publicare +
                '}';
    }
}
