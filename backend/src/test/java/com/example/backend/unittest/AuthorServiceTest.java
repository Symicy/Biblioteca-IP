package com.example.backend.unittest;

import com.example.backend.domain.Author;
import com.example.backend.repo.AuthorRepo;
import com.example.backend.service.AuthorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import java.util.List;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthorServiceTest {

    @Mock
    private AuthorRepo authorRepo;

    @InjectMocks
    private AuthorService authorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAuthorByLastNameReturnsAuthorWhenFound() {
        Author author = new Author();
        author.setLastName("Smith");
        when(authorRepo.findAuthorByLastName("Smith")).thenReturn(Optional.of(author));

        Author result = authorService.getAuthorByLastName("Smith");

        assertNotNull(result);
        assertEquals("Smith", result.getLastName());
    }

    @Test
    void getAuthorByLastNameThrowsExceptionWhenNotFound() {
        when(authorRepo.findAuthorByLastName("Doe")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> authorService.getAuthorByLastName("Doe"));
    }

    @Test
    void getAllAuthorsReturnsListOfAuthors() {
        Author author = new Author();
        when(authorRepo.findAll()).thenReturn(List.of(author));

        List<Author> result = authorService.getAllAuthors();

        assertNotNull(result);
        assertFalse(result.isEmpty());
    }

    @Test
    void getAllAuthorsReturnsEmptyListWhenNoAuthors() {
        when(authorRepo.findAll()).thenReturn(Collections.emptyList());

        List<Author> result = authorService.getAllAuthors();

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void getAuthorByIdReturnsAuthorWhenFound() {
        Author author = new Author();
        author.setId("1");
        when(authorRepo.findAuthorById("1")).thenReturn(Optional.of(author));

        Author result = authorService.getAuthorById("1");

        assertNotNull(result);
        assertEquals("1", result.getId());
    }

    @Test
    void getAuthorByIdThrowsExceptionWhenNotFound() {
        when(authorRepo.findAuthorById("1")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> authorService.getAuthorById("1"));
    }

    @Test
    void createAuthorReturnsCreatedAuthor() {
        Author author = new Author();
        when(authorRepo.save(author)).thenReturn(author);

        Author result = authorService.createAuthor(author);

        assertNotNull(result);
    }

    @Test
    void deleteAuthorDeletesAuthor() {
        doNothing().when(authorRepo).deleteById("1");

        authorService.deleteAuthor("1");

        verify(authorRepo, times(1)).deleteById("1");
    }

    @Test
    void createAuthorThrowsExceptionWhenAuthorIsNull() {
        assertThrows(IllegalArgumentException.class, () -> authorService.createAuthor(null));
    }

    @Test
    void deleteAuthorThrowsExceptionWhenAuthorDoesNotExist() {
        doThrow(new RuntimeException("Author not found")).when(authorRepo).deleteById("1");
        assertThrows(RuntimeException.class, () -> authorService.deleteAuthor("1"));
    }

}