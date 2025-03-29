package com.backend.TestClasses;

import com.backend.api.Model.Admin;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class AdminTest {

    @Test
    public void testAdmin() {
        
        Admin admin = new Admin("anAdmin", "James", "admin@gmail.com", "LeBron", "password", "Admin");

        
        Assertions.assertEquals("anAdmin", admin.getFirstName());
        Assertions.assertEquals("James", admin.getLastName());
        Assertions.assertEquals("admin@gmail.com", admin.getEmail());

        Assertions.assertEquals("LeBron", admin.getUsername());
        Assertions.assertEquals("password", admin.getPasscode());

    }
}