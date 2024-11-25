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

@Slf4j
@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookResource
{
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book)
    {
        //return ResponseEntity.ok().body(bookService.createBook(book));
        return ResponseEntity.created(URI.create("/books/bookID")).body(bookService.createBook(book));
    }

    @GetMapping
    public ResponseEntity<Page<Book>> getBooks(@RequestParam(value = "page", defaultValue = "0") int page,
                                               @RequestParam(value = "size", defaultValue = "10") int size)
    {
        return ResponseEntity.ok().body(bookService.getAllBooks(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable(value = "id") String id)
    {
        return ResponseEntity.ok().body(bookService.getBookById(id));
    }

    @PutMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("id") String id,
                                              @RequestParam("file") MultipartFile file)
    {
        return ResponseEntity.ok().body(bookService.uploadPhoto(id, file));
    }

//    @GetMapping(path = "/image/{fileName}", produces = {IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE})
//    public byte[] getPhoto(@PathVariable("fileName") String filename) throws Exception
//    {
//        return Files.readAllBytes(Paths.get(PHOTO_DIR+filename));
//    }
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
