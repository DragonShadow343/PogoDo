package com.backend.TestClasses;

import com.backend.api.Model.Admin;
import com.backend.repo.AdminRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
public class AdminRepositoryTest {

    @Autowired
    private AdminRepository adminRepository;

    private Admin admin1;
    private Admin admin2;

    @BeforeEach
    public void setUp() {
        // Initialize Admin instances
        admin1 = new Admin(null, "Robert", "Cat", "cat@gmail.com", "cat", "1234", "Admin");
        admin2 = new Admin(null, "Kennedy", "Branden", "branden@gmail.com", "branden6", "1234", "Admin");

        // Save the admins to the database
        adminRepository.save(admin1);
        adminRepository.save(admin2);
    }

    @Test
    public void testGetAllAdmins() {
        // Call the method to test
        List<Admin> admins = adminRepository.findAll();

        // Verify the results
        assertNotNull(admins);
        assertEquals(2, admins.size());
    }

    @AfterEach
    public void tearDown() {
        // Clear the table after each test
        adminRepository.deleteAll();
    }
}