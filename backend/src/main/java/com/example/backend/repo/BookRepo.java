package com.example.backend.repo;

import com.example.backend.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepo extends JpaRepository<Book, String>
{
    Optional<Book> findBookById(String id);
}
