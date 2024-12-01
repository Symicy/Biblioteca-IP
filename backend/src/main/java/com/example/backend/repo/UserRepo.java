package com.example.backend.repo;

import com.example.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for managing User entities.
 */
@Repository
public interface UserRepo extends JpaRepository<User, String>
{
    /**
     * Finds a user by their unique identifier.
     *
     * @param id the unique identifier of the user.
     * @return an Optional containing the found user, or empty if no user is found.
     */
    Optional<User> findUserById(String id);

    /**
     * Finds a user by their email.
     *
     * @param email the email of the user.
     * @return an Optional containing the found user, or empty if no user is found.
     */
    Optional<User> findUserByEmail(String email);
}