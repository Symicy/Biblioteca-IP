package com.example.backend.repo;

import com.example.backend.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for managing Book entities.
 */
@Repository
public interface BookRepo extends JpaRepository<Book, String>
{
    /**
     * Finds a book by its unique identifier.
     *
     * @param id the unique identifier of the book.
     * @return an Optional containing the found book, or empty if no book is found.
     */
    Optional<Book> findBookById(String id);
}