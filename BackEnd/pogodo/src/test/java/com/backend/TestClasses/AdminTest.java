package com.backend.TestClasses;

import com.backend.api.Model.Admin;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class AdminTest {

    @Test
    public void testAdmin() {
        // Create an Admin object with specific values
        Admin admin = new Admin(1, "anAdmin", "James", "admin@gmail.com", "LeBron", "password", "Admin");

        // Tests that should pass
        Assertions.assertEquals(1, admin.getId());
        Assertions.assertEquals("anAdmin", admin.getFirstName());
        Assertions.assertEquals("James", admin.getLastName());
        Assertions.assertEquals("admin@gmail.com", admin.getEmail());
        Assertions.assertEquals("LeBron", admin.getUserName());
        Assertions.assertEquals("password", admin.getPassCode());
    }
}