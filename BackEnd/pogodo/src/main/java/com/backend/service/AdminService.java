package com.backend.service;

import com.backend.api.Model.Admin;
import com.backend.repo.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Get an admin by ID
    public Optional<Admin> getAdmin(Integer id) {
        return adminRepository.findById(id);
    }

    // Get all admins by role
    public List<Admin> getAdminsByRole(String userRole) {
        return adminRepository.findByRole(userRole);
    }

    // Get an admin by username
    public Optional<Admin> getAdminByUsername(String userName) {
        return adminRepository.findByUserName(userName);
    }

    // Get an admin by email
    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    // Save an admin
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    // Delete an admin by ID
    public void deleteAdmin(Integer id) {
        adminRepository.deleteById(id);
    }
}