package com.example.backend.repo;

import com.example.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, String>
{
    Optional<User> findUserById(String id);
    Optional<User> findUserByEmail(String email);
}
