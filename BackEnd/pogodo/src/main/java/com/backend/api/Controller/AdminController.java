package com.backend.api.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.api.Model.Admin;
import com.backend.service.AdminService;

@RestController
public class AdminController {

    // private field declaration or remove if not needed
    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/admin")
    public Admin getAdmin(@RequestParam Integer id){
        Optional admin = adminService.getAdmin(id);
        if(admin.isPresent()){
            return (Admin) admin.get();
        }
        return null;
    }
    
}
