package com.example.backend.repo;

import com.example.backend.domain.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for managing Author entities.
 */
@Repository
public interface AuthorRepo extends JpaRepository<Author, String>
{
    /**
     * Finds an author by their unique identifier.
     *
     * @param id the unique identifier of the author.
     * @return an Optional containing the found author, or empty if no author is found.
     */
    Optional<Author> findAuthorById(String id);

    /**
     * Finds an author by their last name.
     *
     * @param name the last name of the author.
     * @return an Optional containing the found author, or empty if no author is found.
     */
    Optional<Author> findAuthorByLastName(String name);
}