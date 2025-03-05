package com.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.backend.api.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // You can define custom queries if needed
}
