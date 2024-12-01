package com.example.backend.repo;

import com.example.backend.domain.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepo extends JpaRepository<Author, String>
{
    Optional<Author> findAuthorById(String id);
    Optional<Author> findAuthorByNume(String name);
}
