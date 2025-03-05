package com.backend;

import com.backend.api.Model.User;
import com.backend.repo.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringApiApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.findById(1).isEmpty()) { // Prevent duplicate entries
                User user = new User();
                user.setUserId(1);
                user.setFirstName("John");
                user.setLastName("Doe");
                user.setEmail("john@gmail.com");
                user.setUsername("johndoe");
                user.setPassword("password");
                user.setUserRole("user");

                userRepository.save(user);
                System.out.println("Test user added to the database.");
            }
        };
    }
}
