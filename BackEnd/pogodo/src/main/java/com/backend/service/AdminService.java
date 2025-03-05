package com.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.backend.api.Model.Admin;

@Service
public class AdminService {

    private List<Admin> adminList;

    public AdminService() {
        adminList = new ArrayList<>();

        Admin admin = new Admin(1, "admin", "John", "Doe", "john@gmail.com", "password");
        Admin admin2 = new Admin(2, "admin2", "Jane", "Doe", "jane@gmai.com", "password2");
        
        adminList.add(admin);
        adminList.add(admin2);
    }

    @SuppressWarnings("unchecked")
    public Optional<Admin> getAdmin(Integer id) {
        @SuppressWarnings("rawtypes")
        Optional optional = Optional.empty();
        for (Admin admin : adminList) {
            if (admin.getId() == id) {
                optional = Optional.of(admin);
                return optional; 
            }
        }
        return optional;
    }
    
}
