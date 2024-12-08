package com.example.backend.service;

import com.example.backend.domain.User;
import com.example.backend.repo.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public User getUserById(String id) {
        return userRepo.findUserById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByUsername(String username) {
        return userRepo.findUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User loginUser(User user) {
        User foundUser = userRepo.findUserByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));
        if (bCryptPasswordEncoder.matches(user.getPassword(), foundUser.getPassword())) {
            return foundUser;
        } else {
            throw new RuntimeException("Invalid password");
        }

    }

    public User createUser(User user) {
        if(userRepo.findUserByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public User updateUser(User user) {
        return userRepo.save(user);
    }

    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }

}
