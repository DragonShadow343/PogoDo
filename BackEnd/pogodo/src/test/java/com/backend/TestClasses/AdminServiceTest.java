package com.backend.TestClasses;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import com.backend.api.Model.Admin;
import com.backend.repo.AdminRepository;
import com.backend.service.AdminService;

@SpringBootTest
@ActiveProfiles("h2") // or the profile you use for testing
public class AdminServiceTest {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; 

    @AfterEach
    public void tearDown() {
        adminRepository.deleteAll();
    }

    @Test
    public void testSaveAdmin_withPlainTextPassword_hashesSuccessfully() {
        
        Admin admin = new Admin();
        admin.setFirstName("AdminFirst");
        admin.setLastName("AdminLast");
        admin.setEmail("admin@example.com");
        admin.setUsername("adminUser");
        admin.setPasscode("plainText123"); 
        admin.setUserRole("ADMIN");
    
      
        Admin savedAdmin = adminService.saveAdmin(admin);
    
        
        assertNotNull(savedAdmin.getUserId(), "Admin should have been assigned an ID");
    
        
        assertNotEquals("plainText123", savedAdmin.getPasscode(),
            "Expected the password to be hashed, not stored as plain text!");
    
        
        assertTrue(
            passwordEncoder.matches("plainText123", savedAdmin.getPasscode()),
            "Stored hash should match the original password when checked with PasswordEncoder.matches()"
        );
    }
}    