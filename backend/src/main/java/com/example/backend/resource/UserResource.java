package com.example.backend.resource;

import com.example.backend.domain.User;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

/**
 * REST controller for managing users.
 */
@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserResource {
    private final UserService userService;

    /**
     * Registers a new user.
     *
     * @param user the user to register.
     * @return the ResponseEntity with status 201 (Created) and with body the new user, or status 409 (Conflict) if the user already exists.
     */
    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            return ResponseEntity.created(URI.create("/users/userID")).body(userService.createUser(user));
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(null); // 409 Conflict
        }
    }

    /**
     * Logs in a user.
     *
     * @param user the user to log in.
     * @return the ResponseEntity with status 200 (OK) and with body the logged-in user, or status 401 (Unauthorized) if the login fails.
     */
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        try{
            User foundUser = userService.loginUser(user);
            return ResponseEntity.ok().body(foundUser);
        }
        catch (RuntimeException e){
            return ResponseEntity.status(401).body(null);
        }
    }

}