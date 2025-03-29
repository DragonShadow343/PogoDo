package com.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.backend.api.Model.User;
import com.backend.repo.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // For registration - includes hashing
    public User registerUser(User user) {
        String hashed = passwordEncoder.encode(user.getPasscode());
        user.setPasscode(hashed);

        // Default admin permissions
        if ("admin".equals(user.getUserRole())) {
            if (!user.getLockTasks()) user.setLockTasks(true);
            if (!user.getAssignTasks()) user.setAssignTasks(true);
            if (!user.getDeleteTasks()) user.setDeleteTasks(true);
        }

        return userRepository.save(user);
    }

    // For general updates (permissions, task assignment, etc.)
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}
