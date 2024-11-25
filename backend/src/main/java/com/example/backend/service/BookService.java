package com.example.backend.service;

import com.example.backend.domain.Book;
import com.example.backend.repo.BookRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.example.backend.constant.Constant.PHOTO_DIR;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class BookService
{
    private final BookRepo bookRepo;

    public Page<Book> getAllBooks(int page, int size)
    {
        return bookRepo.findAll(PageRequest.of(page, size, Sort.by("titlu")));
    }

    public Book getBookById(String id)
    {
        return bookRepo.findBookById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public Book createBook(Book book)
    {
        return bookRepo.save(book);
    }

    public void deleteBook(String id)
    {
        bookRepo.deleteById(id);
    }

    public String uploadPhoto(String id, MultipartFile file)
    {
        log.info("Uploading photo for book with id: {}", id);
        Book book = getBookById(id);
        String photoURL=photoFunction.apply(id, file);
        book.setPozaURL(photoURL);
        bookRepo.save(book);
        return photoURL;
    }

    private final Function<String,String> fileExtension=fileName-> Optional.of(fileName).filter(name->name.contains("."))
            .map(name-> "." + name.substring(fileName.lastIndexOf(".")+1)).orElse(".png");


    private final BiFunction<String, MultipartFile, String> photoFunction=(id, image)->
    {
        String filename=id+fileExtension.apply(image.getOriginalFilename());
        try
        {
            Path fileStorageLocation = Paths.get(PHOTO_DIR).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation))
            {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename),REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/books/image/"+filename).toUriString();
        }
        catch (Exception e)
        {
            log.error("Error uploading photo", e);
            throw new RuntimeException("Error uploading photo");
        }
    };
}
