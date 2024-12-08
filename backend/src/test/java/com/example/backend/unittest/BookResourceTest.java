package com.example.backend.unittest;

import com.example.backend.domain.Book;
import com.example.backend.resource.BookResource;
import com.example.backend.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class BookResourceTest {

    @Mock
    private BookService bookService;

    @InjectMocks
    private BookResource bookResource;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createBook_createsAndReturnsBook() {
        Book book = new Book();
        when(bookService.createBook(any(Book.class))).thenReturn(book);

        ResponseEntity<Book> response = bookResource.createBook(book);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals(book, response.getBody());
    }

    @Test
    void getBooks_returnsListOfBooks() {
        Page<Book> books = mock(Page.class);
        when(bookService.getAllBooks(0, 10)).thenReturn(books);

        ResponseEntity<Page<Book>> response = bookResource.getBooks(0, 10);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(books, response.getBody());
    }

    @Test
    void getBookById_returnsBook() {
        Book book = new Book();
        when(bookService.getBookById("1")).thenReturn(book);

        ResponseEntity<Book> response = bookResource.getBookById("1");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(book, response.getBody());
    }

    @Test
    void uploadPhoto_uploadsPhotoAndReturnsMessage() {
        MultipartFile file = mock(MultipartFile.class);
        when(bookService.uploadPhoto("1", file)).thenReturn("Photo uploaded");

        ResponseEntity<String> response = bookResource.uploadPhoto("1", file);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Photo uploaded", response.getBody());
    }

    @Test
    void deleteBook_deletesBookAndReturnsMessage() {
        doNothing().when(bookService).deleteBook("1");

        ResponseEntity<String> response = bookResource.deleteBook("1");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Book deleted", response.getBody());
    }
}