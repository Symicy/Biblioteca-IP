package com.example.backend.service;

import com.example.backend.domain.Author;
import com.example.backend.repo.AuthorRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class AuthorService
{
    private final AuthorRepo authorRepo;

    public Author getAuthorByName(String name)
    {
        return authorRepo.findAuthorByNume(name).orElseThrow(() -> new RuntimeException("Author not found"));
    }

    public List<Author> getAllAuthors()
    {
        return authorRepo.findAll();
    }

    public Author getAuthorById(String id)
    {
        return authorRepo.findAuthorById(id).orElseThrow(() -> new RuntimeException("Author not found"));
    }

    public Author createAuthor(Author author)
    {
        return authorRepo.save(author);
    }

    public void deleteAuthor(String id)
    {
        authorRepo.deleteById(id);
    }
}
