package com.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.UserRepository;
import com.backend.api.Model.User;

@Service
public class UserService {
    private List<User> userList;

    public UserService() {
        userList = new ArrayList<>();
        User user = new User(1, "John", "Doe", "john@gmail.com", "johndoe", "password", "user");
        User user2 = new User(2, "Jane", "Doe", "jane@gmail.com", "janedoe", "password2", "user");
        userList.add(user);
        userList.add(user2);
    }

    @Autowired
    private UserRepository userRepository;  // Using JPA repository

    public Optional<User> getUser(Integer id) {
        Optional optional = Optional.empty();
        for (User user: userList){
            if (user.getUserId() == id){
                optional = Optional.of(user);
                return optional;
            }
            
        }
        return optional;
    }
}
