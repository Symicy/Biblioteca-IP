package com.example.backend.service;

import com.example.backend.domain.Author;
import com.example.backend.repo.AuthorRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing authors.
 */
@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class AuthorService
{
    private final AuthorRepo authorRepo;

    /**
     * Gets an author by their name.
     *
     * @param name the name of the author.
     * @return the found author.
     * @throws RuntimeException if the author is not found.
     */
    public Author getAuthorByLastName(String name)
    {
        return authorRepo.findAuthorByLastName(name).orElseThrow(() -> new RuntimeException("Author not found"));
    }

    /**
     * Gets all authors.
     *
     * @return the list of all authors.
     */
    public List<Author> getAllAuthors()
    {
        return authorRepo.findAll();
    }

    /**
     * Gets an author by their unique identifier.
     *
     * @param id the unique identifier of the author.
     * @return the found author.
     * @throws RuntimeException if the author is not found.
     */
    public Author getAuthorById(String id)
    {
        return authorRepo.findAuthorById(id).orElseThrow(() -> new RuntimeException("Author not found"));
    }

    /**
     * Creates a new author.
     *
     * @param author the author to create.
     * @return the created author.
     */
    public Author createAuthor(Author author)
    {
        return authorRepo.save(author);
    }

    /**
     * Deletes an author by their unique identifier.
     *
     * @param id the unique identifier of the author.
     */
    public void deleteAuthor(String id)
    {
        authorRepo.deleteById(id);
    }
}