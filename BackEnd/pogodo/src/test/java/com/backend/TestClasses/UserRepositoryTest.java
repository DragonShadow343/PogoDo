package com.backend.TestClasses;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import com.backend.api.Model.User;
import com.backend.repo.UserRepository;



@DataJpaTest
@ActiveProfiles("h2") 
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveAndFindUser() {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("testuser@example.com");
        user.setUsername("testuser");
        user.setPasscode("password123"); 
        user.setUserRole("USER"); 

        userRepository.save(user);

        User foundUser = userRepository.findById(user.getUserId()).orElse(null);

        assertNotNull(foundUser);
        assertEquals("testuser", foundUser.getUsername());
        assertEquals("testuser@example.com", foundUser.getEmail());
    }

    @Test
    public void testUpdateUser() {
        User user = new User();
        user.setFirstName("Jane");
        user.setLastName("Smith");
        user.setEmail("olduser@example.com");
        user.setUsername("olduser");
        user.setPasscode("password123");
        user.setUserRole("USER");
        userRepository.save(user);

        user.setEmail("newuser@example.com");
        userRepository.save(user);

        User updatedUser = userRepository.findById(user.getUserId()).orElse(null);

        assertNotNull(updatedUser);
        assertEquals("newuser@example.com", updatedUser.getEmail());
    }

    @Test
    public void testDeleteUser() {
        User user = new User();
        user.setFirstName("Alice");
        user.setLastName("Johnson");
        user.setEmail("deleteuser@example.com");
        user.setUsername("deleteuser");
        user.setPasscode("password123");
        user.setUserRole("USER");
        userRepository.save(user);

       
        userRepository.deleteById(user.getUserId());

    }

}
       