package com.example.backend.resource;

import com.example.backend.domain.Author;
import com.example.backend.service.AuthorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/authors")
public class AuthorResource
{
    private final AuthorService authorService;

    @PostMapping
    public ResponseEntity<Author> createAuthor(@RequestBody Author author)
    {
        return ResponseEntity.created(URI.create("/authors/authorID")).body(authorService.createAuthor(author));
    }

    @GetMapping
    public ResponseEntity<List<Author>> getAuthors()
    {
        return ResponseEntity.ok().body(authorService.getAllAuthors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable(value = "id") String id)
    {
        return ResponseEntity.ok().body(authorService.getAuthorById(id));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Author> getAuthorByName(@PathVariable(value = "name") String name)
    {
        return ResponseEntity.ok().body(authorService.getAuthorByName(name));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAuthor(@PathVariable(value = "id") String id)
    {
        authorService.deleteAuthor(id);
        return ResponseEntity.ok().body("Author deleted");
    }
}
