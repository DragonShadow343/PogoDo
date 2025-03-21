package com.backend.TestClasses;

import com.backend.api.Model.Admin;
import com.backend.repo.AdminRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;





// @SpringBootTest
// @TestPropertySource(locations = "classpath:application-test.properties")
@DataJpaTest
@ActiveProfiles("h2") //SWITCH the profile to mysql if want to run on mySQL, use h2 if testing without database manipulation
public class AdminRepositoryTest {

    @Autowired
    private AdminRepository adminRepository;

    private Admin admin1;
    private Admin admin2;

    @BeforeEach
    public void setUp() {
        // Initialize Admin instances
        admin1 = new Admin("Cat", "Robert", "cat@gmail.com", "cat", "1234", "Admin");
        admin2 = new Admin("Branden", "Kennedy", "branden@gmail.com", "branden6", "1234", "Admin");

        // Save the admins to the database
        adminRepository.save(admin1);
        adminRepository.save(admin2);
    }

    @Test
    public void testGetAllAdmins() {
      
        List<Admin> admins = adminRepository.findAll();

     
        assertNotNull(admins);
        assertEquals(2, admins.size());
    }

    @AfterEach
    public void tearDown() {
       
        adminRepository.deleteAll();
    }
}