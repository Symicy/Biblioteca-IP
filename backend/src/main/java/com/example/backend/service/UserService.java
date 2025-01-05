package com.example.backend.service;

import com.example.backend.domain.User;
import com.example.backend.repo.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Service class for managing users.
 */
@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * Retrieves a user by their unique identifier.
     *
     * @param id the unique identifier of the user.
     * @return the user with the specified id.
     * @throws RuntimeException if the user is not found.
     */
    public User getUserById(String id) {
        return userRepo.findUserById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    /**
     * Retrieves a user by their username.
     *
     * @param username the username of the user.
     * @return the user with the specified username.
     * @throws RuntimeException if the user is not found.
     */
    public User getUserByUsername(String username) {
        return userRepo.findUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    /**
     * Logs in a user by verifying their email and password.
     *
     * @param user the user to log in.
     * @return the logged-in user.
     * @throws RuntimeException if the email or password is invalid.
     */
    public User loginUser(User user) {
        User foundUser = userRepo.findUserByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));
        if (bCryptPasswordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
            return foundUser;
        } else {
            throw new RuntimeException("Invalid password");
        }
    }

    /**
     * Creates a new user.
     *
     * @param user the user to create.
     * @return the created user.
     * @throws RuntimeException if the email already exists.
     */
    public User createUser(User user) {
        if(userRepo.findUserByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    /**
     * Updates an existing user.
     *
     * @param user the user to update.
     * @return the updated user.
     */
    public User updateUser(User user) {
        return userRepo.save(user);
    }

    /**
     * Deletes a user by their unique identifier.
     *
     * @param id the unique identifier of the user.
     */
    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }
}