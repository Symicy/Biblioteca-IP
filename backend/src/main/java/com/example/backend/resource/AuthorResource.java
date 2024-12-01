package com.example.backend.resource;

import com.example.backend.domain.Author;
import com.example.backend.service.AuthorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * REST controller for managing authors.
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/authors")
public class AuthorResource
{
    private final AuthorService authorService;

    /**
     * Creates a new author.
     *
     * @param author the author to create.
     * @return the ResponseEntity with status 201 (Created) and with body the new author.
     */
    @PostMapping
    public ResponseEntity<Author> createAuthor(@RequestBody Author author)
    {
        return ResponseEntity.created(URI.create("/authors/authorID")).body(authorService.createAuthor(author));
    }

    /**
     * Gets all authors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of authors in body.
     */
    @GetMapping
    public ResponseEntity<List<Author>> getAuthors()
    {
        return ResponseEntity.ok().body(authorService.getAllAuthors());
    }

    /**
     * Gets an author by their unique identifier.
     *
     * @param id the unique identifier of the author.
     * @return the ResponseEntity with status 200 (OK) and with body the author.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable(value = "id") String id)
    {
        return ResponseEntity.ok().body(authorService.getAuthorById(id));
    }

    /**
     * Gets an author by their name.
     *
     * @param name the name of the author.
     * @return the ResponseEntity with status 200 (OK) and with body the author.
     */
    @GetMapping("/lastName/{lastName}")
    public ResponseEntity<Author> getAuthorByLastName(@PathVariable(value = "lastName") String name)
    {
        return ResponseEntity.ok().body(authorService.getAuthorByLastName(name));
    }

    /**
     * Deletes an author by their unique identifier.
     *
     * @param id the unique identifier of the author.
     * @return the ResponseEntity with status 200 (OK) and with body a message indicating the author was deleted.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAuthor(@PathVariable(value = "id") String id)
    {
        authorService.deleteAuthor(id);
        return ResponseEntity.ok().body("Author deleted");
    }
}