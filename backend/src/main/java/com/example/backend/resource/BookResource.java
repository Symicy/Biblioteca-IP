package com.example.backend.resource;

import com.example.backend.domain.Book;
import com.example.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.example.backend.constant.Constant.PHOTO_DIR;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

/**
 * REST controller for managing books.
 */
@Slf4j
@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookResource
{
    private final BookService bookService;

    /**
     * Creates a new book.
     *
     * @param book the book to create.
     * @return the ResponseEntity with status 201 (Created) and with body the new book.
     */
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book)
    {
        return ResponseEntity.created(URI.create("/books/bookID")).body(bookService.createBook(book));
    }

    /**
     * Gets all books with pagination.
     *
     * @param page the page number to retrieve.
     * @param size the number of books per page.
     * @return the ResponseEntity with status 200 (OK) and the list of books in body.
     */
    @GetMapping
    public ResponseEntity<Page<Book>> getBooks(@RequestParam(value = "page", defaultValue = "0") int page,
                                               @RequestParam(value = "size", defaultValue = "10") int size)
    {
        return ResponseEntity.ok().body(bookService.getAllBooks(page, size));
    }

    /**
     * Gets a book by its unique identifier.
     *
     * @param id the unique identifier of the book.
     * @return the ResponseEntity with status 200 (OK) and with body the book.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable(value = "id") String id)
    {
        return ResponseEntity.ok().body(bookService.getBookById(id));
    }

    /**
     * Uploads a photo for a book.
     *
     * @param id the unique identifier of the book.
     * @param file the photo file to upload.
     * @return the ResponseEntity with status 200 (OK) and with body a message indicating the photo was uploaded.
     */
    @PutMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("id") String id,
                                              @RequestParam("file") MultipartFile file)
    {
        return ResponseEntity.ok().body(bookService.uploadPhoto(id, file));
    }

    /**
     * Deletes a book by its unique identifier.
     *
     * @param id the unique identifier of the book.
     * @return the ResponseEntity with status 200 (OK) and with body a message indicating the book was deleted.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable(value = "id") String id)
    {
        bookService.deleteBook(id);
        return ResponseEntity.ok().body("Book deleted");
    }

    /**
     * Gets a photo by its file name.
     *
     * @param filename the name of the photo file.
     * @return the byte array of the photo.
     * @throws Exception if the file is not found or cannot be read.
     */
    @GetMapping(path = "/image/{fileName}", produces = {IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE})
    public byte[] getPhoto(@PathVariable("fileName") String filename) throws Exception {
        Path filePath = Paths.get(PHOTO_DIR + filename);
        if (Files.exists(filePath)) {
            return Files.readAllBytes(filePath);
        } else {
            log.error("File not found: {}", filename);
            throw new RuntimeException("File not found");
        }
    }
}