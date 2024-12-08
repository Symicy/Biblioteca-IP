package com.example.backend.resource;

import com.example.backend.domain.User;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserResource {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            return ResponseEntity.created(URI.create("/users/userID")).body(userService.createUser(user));
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(null); // 409 Conflict
        }
    }

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
