package com.backend.service;

import com.backend.api.Model.Admin;
import com.backend.repo.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Get an admin by ID
    public Optional<Admin> getAdmin(Integer id) {
        return adminRepository.findById(id);
    }

    // Get all admins by role
   // public List<Admin> getAdminsByRole(String userRole) {
    //    return adminRepository.findByRole(userRole);
   // }ok im just testin

    // Get an admin by username
    public Optional<Admin> getAdminByUsername(String userName) {
        return adminRepository.findByUsername(userName);
    }

    // Get an admin by email
    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    // Save an admin
    public Admin saveAdmin(Admin admin) {
        
        String rawPasscode = admin.getPasscode();  
      
        String hashed = passwordEncoder.encode(rawPasscode);
    
       
        admin.setPasscode(hashed);
    
     
        return adminRepository.save(admin);
    }
    

    // Delete an admin by ID
    public void deleteAdmin(Integer id) {
        adminRepository.deleteById(id);
    }
}