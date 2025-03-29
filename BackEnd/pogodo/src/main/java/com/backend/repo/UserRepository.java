package com.backend.repo;

import com.backend.api.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    
   
    Optional<User> findByUserId(Integer userId); 

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email); 

    boolean existsByEmail(String email); 

    boolean existsByUsername(String username); 

    List<User> findByUserRole(String userRole); 
}
