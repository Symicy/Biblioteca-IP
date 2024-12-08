package com.example.backend.unittest;

import com.example.backend.domain.Author;
import com.example.backend.resource.AuthorResource;
import com.example.backend.service.AuthorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthorResourceTest {

    @Mock
    private AuthorService authorService;

    @InjectMocks
    private AuthorResource authorResource;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createAuthor_createsAndReturnsAuthor() {
        Author author = new Author();
        when(authorService.createAuthor(any(Author.class))).thenReturn(author);

        ResponseEntity<Author> response = authorResource.createAuthor(author);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals(author, response.getBody());
    }

    @Test
    void getAuthors_returnsListOfAuthors() {
        List<Author> authors = Collections.singletonList(new Author());
        when(authorService.getAllAuthors()).thenReturn(authors);

        ResponseEntity<List<Author>> response = authorResource.getAuthors();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(authors, response.getBody());
    }

    @Test
    void getAuthorById_returnsAuthor() {
        Author author = new Author();
        when(authorService.getAuthorById("1")).thenReturn(author);

        ResponseEntity<Author> response = authorResource.getAuthorById("1");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(author, response.getBody());
    }

    @Test
    void getAuthorByLastName_returnsAuthor() {
        Author author = new Author();
        when(authorService.getAuthorByLastName("Smith")).thenReturn(author);

        ResponseEntity<Author> response = authorResource.getAuthorByLastName("Smith");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(author, response.getBody());
    }

    @Test
    void deleteAuthor_deletesAuthorAndReturnsMessage() {
        doNothing().when(authorService).deleteAuthor("1");

        ResponseEntity<String> response = authorResource.deleteAuthor("1");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Author deleted", response.getBody());
    }
}