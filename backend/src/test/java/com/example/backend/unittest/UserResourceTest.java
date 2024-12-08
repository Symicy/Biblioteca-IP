package com.example.backend.unittest;

import com.example.backend.domain.User;
import com.example.backend.resource.UserResource;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class UserResourceTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserResource userResource;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createUser_createsAndReturnsUser() {
        User user = new User();
        when(userService.createUser(any(User.class))).thenReturn(user);

        ResponseEntity<User> response = userResource.createUser(user);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals(user, response.getBody());
    }

    @Test
    void createUser_returnsConflictWhenUserExists() {
        when(userService.createUser(any(User.class))).thenThrow(new RuntimeException("User already exists"));

        ResponseEntity<User> response = userResource.createUser(new User());

        assertEquals(409, response.getStatusCodeValue());
        assertEquals(null, response.getBody());
    }

    @Test
    void loginUser_returnsUserWhenCredentialsAreCorrect() {
        User user = new User();
        when(userService.loginUser(any(User.class))).thenReturn(user);

        ResponseEntity<User> response = userResource.loginUser(user);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(user, response.getBody());
    }

    @Test
    void loginUser_returnsUnauthorizedWhenCredentialsAreIncorrect() {
        when(userService.loginUser(any(User.class))).thenThrow(new RuntimeException("Invalid credentials"));

        ResponseEntity<User> response = userResource.loginUser(new User());

        assertEquals(401, response.getStatusCodeValue());
        assertEquals(null, response.getBody());
    }
}