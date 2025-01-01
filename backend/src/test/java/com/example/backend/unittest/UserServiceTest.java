package com.example.backend.unittest;

import com.example.backend.domain.User;
import com.example.backend.repo.UserRepo;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserById_returnsUser_whenUserExists() {
        User user = new User();
        user.setId("1");
        when(userRepo.findUserById(anyString())).thenReturn(Optional.of(user));

        User result = userService.getUserById("1");

        assertNotNull(result);
        assertEquals("1", result.getId());
    }

    @Test
    void getUserById_throwsException_whenUserDoesNotExist() {
        when(userRepo.findUserById(anyString())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> userService.getUserById("1"));
    }

    @Test
    void getUserByUsername_returnsUser_whenUserExists() {
        User user = new User();
        user.setUsername("username");
        when(userRepo.findUserByUsername(anyString())).thenReturn(Optional.of(user));

        User result = userService.getUserByUsername("username");

        assertNotNull(result);
        assertEquals("username", result.getUsername());
    }

    @Test
    void getUserByUsername_throwsException_whenUserDoesNotExist() {
        when(userRepo.findUserByUsername(anyString())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> userService.getUserByUsername("username"));
    }

    @Test
    void loginUser_returnsUser_whenCredentialsAreValid() {
        User user = new User();
        user.setEmail("email@example.com");
        user.setPassword("encodedPassword");
        when(userRepo.findUserByEmail(anyString())).thenReturn(Optional.of(user));
        when(bCryptPasswordEncoder.matches(anyString(), anyString())).thenReturn(true);

        User loginUser = new User();
        loginUser.setEmail("email@example.com");
        loginUser.setPassword("password");

        User result = userService.loginUser(loginUser);

        assertNotNull(result);
        assertEquals("email@example.com", result.getEmail());
    }

    @Test
    void loginUser_throwsException_whenEmailIsInvalid() {
        when(userRepo.findUserByEmail(anyString())).thenReturn(Optional.empty());

        User loginUser = new User();
        loginUser.setEmail("email@example.com");
        loginUser.setPassword("password");

        assertThrows(RuntimeException.class, () -> userService.loginUser(loginUser));
    }

    @Test
    void loginUser_throwsException_whenPasswordIsInvalid() {
        User user = new User();
        user.setEmail("email@example.com");
        user.setPassword("encodedPassword");
        when(userRepo.findUserByEmail(anyString())).thenReturn(Optional.of(user));
        when(bCryptPasswordEncoder.matches(anyString(), anyString())).thenReturn(false);

        User loginUser = new User();
        loginUser.setEmail("email@example.com");
        loginUser.setPassword("password");

        assertThrows(RuntimeException.class, () -> userService.loginUser(loginUser));
    }

    @Test
    void createUser_returnsUser_whenEmailDoesNotExist() {
        User user = new User();
        user.setEmail("email@example.com");
        user.setPassword("password");
        when(userRepo.findUserByEmail(anyString())).thenReturn(Optional.empty());
        when(bCryptPasswordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepo.save(any(User.class))).thenReturn(user);

        User result = userService.createUser(user);

        assertNotNull(result);
        assertEquals("email@example.com", result.getEmail());
        assertEquals("encodedPassword", result.getPassword());
    }

    @Test
    void createUser_throwsException_whenEmailAlreadyExists() {
        User user = new User();
        user.setEmail("email@example.com");
        when(userRepo.findUserByEmail(anyString())).thenReturn(Optional.of(user));

        assertThrows(RuntimeException.class, () -> userService.createUser(user));
    }

    @Test
    void updateUser_returnsUpdatedUser() {
        User user = new User();
        user.setId("1");
        when(userRepo.save(any(User.class))).thenReturn(user);

        User result = userService.updateUser(user);

        assertNotNull(result);
        assertEquals("1", result.getId());
    }

    @Test
    void deleteUser_deletesUser() {
        doNothing().when(userRepo).deleteById(anyString());

        userService.deleteUser("1");

        verify(userRepo, times(1)).deleteById("1");
    }
}