package com.backend.repo;

import com.backend.api.Model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    // Custom query to find admins by role (if needed)
    List<Admin> findByRole(String userRole);

    // Custom query to find an admin by username
    Optional<Admin> findByUserName(String userName);

    // Custom query to find an admin by email
    Optional<Admin> findByEmail(String email);

    // Built-in methods like save(), findById(), findAll(), deleteById() are already provided by JpaRepository
}