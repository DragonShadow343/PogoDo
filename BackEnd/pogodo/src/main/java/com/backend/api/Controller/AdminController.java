package com.backend.api.Controller;

import java.util.Optional;
import java.util.Map;
import com.backend.api.Model.Admin;
import com.backend.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/Admins")
public class AdminController {

    private final AdminService adminService;
    private final PasswordEncoder passwordEncoder;


    public AdminController(AdminService adminService, PasswordEncoder passwordEncoder) {
        this.adminService = adminService;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdmin(@PathVariable Integer id) {
        return adminService.getAdmin(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = adminService.saveAdmin(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Integer id) {
        if (adminService.getAdmin(id).isPresent()) {
            adminService.deleteAdmin(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPasscode();

        Optional<Admin> adminOptional = adminService.getAdminByUsername(username);

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();

            if (passwordEncoder.matches(password, admin.getPasscode())) { 
                return ResponseEntity.ok().body(Map.of(
                    "message", "Login successful",
                    "username", admin.getUsername(),
                    "role", admin.getUserRole()
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid password"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Admin not found"));
        }
    }
}