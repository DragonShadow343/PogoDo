package com.backend.service;

import com.backend.api.Model.Admin;
import com.backend.repo.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    public Optional<Admin> getAdmin(Integer id) {
        return adminRepository.findById(id);
    }

    

    
    public Optional<Admin> getAdminByUsername(String userName) {
        return adminRepository.findByUsername(userName);
    }

    
    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    
    public Admin saveAdmin(Admin admin) {
        
        String rawPasscode = admin.getPasscode();  
      
        String hashed = passwordEncoder.encode(rawPasscode);
    
       
        admin.setPasscode(hashed);
    
     
        return adminRepository.save(admin);
    }
    

    
    public void deleteAdmin(Integer id) {
        adminRepository.deleteById(id);
    }
}