package com.backend.repo;

import com.backend.api.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    //if you want to test in postman, try GET and paste this:
    // http://localhost:3500/Users/61
   
    Optional<User> findByUserId(Integer userId); // Find by user id

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email); // Find by email

    boolean existsByEmail(String email); // Check if a user exists by email

    boolean existsByUsername(String username); // Check if a user exists by username

    List<User> findByUserRole(String userRole); // Find users by role
}
