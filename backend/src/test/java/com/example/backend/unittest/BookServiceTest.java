package com.example.backend.unittest;

import com.example.backend.domain.Book;
import com.example.backend.repo.BookRepo;
import com.example.backend.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookServiceTest {

    @Mock
    private BookRepo bookRepo;

    @Mock
    private MultipartFile file;

    @InjectMocks
    private BookService bookService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllBooksReturnsPaginatedBooks() {
        Book book = new Book();
        Page<Book> page = new PageImpl<>(List.of(book));
        when(bookRepo.findAll(PageRequest.of(0, 10, Sort.by("title")))).thenReturn(page);

        Page<Book> result = bookService.getAllBooks(0, 10);

        assertNotNull(result);
        assertFalse(result.isEmpty());
    }

    @Test
    void getAllBooksReturnsEmptyPageWhenNoBooks() {
        Page<Book> page = new PageImpl<>(Collections.emptyList());
        when(bookRepo.findAll(PageRequest.of(0, 10, Sort.by("title")))).thenReturn(page);

        Page<Book> result = bookService.getAllBooks(0, 10);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void getBookByIdReturnsBookWhenFound() {
        Book book = new Book();
        book.setId("1");
        when(bookRepo.findBookById("1")).thenReturn(Optional.of(book));

        Book result = bookService.getBookById("1");

        assertNotNull(result);
        assertEquals("1", result.getId());
    }

    @Test
    void getBookByIdThrowsExceptionWhenNotFound() {
        when(bookRepo.findBookById("1")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> bookService.getBookById("1"));
    }

    @Test
    void createBookReturnsCreatedBook() {
        Book book = new Book();
        when(bookRepo.save(book)).thenReturn(book);
        Book result = bookService.createBook(book);
        assertNotNull(result);
    }

    @Test
    void deleteBookDeletesBook() {
        doNothing().when(bookRepo).deleteById("1");
        bookService.deleteBook("1");
        verify(bookRepo, times(1)).deleteById("1");
    }

    @Test
    void uploadPhotoThrowsExceptionWhenFileIsInvalid() throws IOException {
        Book book = new Book();
        book.setId("1");
        when(bookRepo.findBookById("1")).thenReturn(Optional.of(book));
        when(file.getOriginalFilename()).thenReturn("photo.png");
        when(file.getInputStream()).thenThrow(new IOException("File error"));

        assertThrows(RuntimeException.class, () -> bookService.uploadPhoto("1", file));
    }

    @Test
    void uploadPhotoThrowsExceptionWhenFileExtensionIsMissing() {
        Book book = new Book();
        book.setId("1");
        when(bookRepo.findBookById("1")).thenReturn(Optional.of(book));
        when(file.getOriginalFilename()).thenReturn("photo");

        assertThrows(RuntimeException.class, () -> bookService.uploadPhoto("1", file));
    }

    @Test
    void uploadPhotoThrowsExceptionWhenBookNotFound() {
        when(bookRepo.findBookById("1")).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> bookService.uploadPhoto("1", file));
    }
}