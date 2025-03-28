package com.backend.api.Controller;

import java.util.Optional;
import java.util.Map;
import com.backend.api.Model.User;
import com.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Users") 
public class UserController {

    private final UserService userService;
 private final PasswordEncoder passwordEncoder;
    
 public UserController(UserService userService, PasswordEncoder passwordEncoder) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
}

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
    User savedUser = userService.saveUser(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser); // Return 201 Created
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        if (userService.getUserById(id).isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            System.out.println("Received User Data: " + user); // ✅ Debug received data
            User savedUser = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPasscode();

        Optional<User> userOptional = userService.getUserByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (passwordEncoder.matches(password, user.getPasscode())) { 
                return ResponseEntity.ok().body(Map.of(
                    "message", "Login successful",
                    "id", user.getUserId(),
                    "username", user.getUsername(),
                    "role", user.getUserRole()
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid password"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not found"));
        }
    }

    @PutMapping("/{userId}/permissions/{permissionKey}")
    public ResponseEntity<User> updateUserPermission(@PathVariable Integer userId, @PathVariable String permissionKey, @RequestBody Map<String, Boolean> permission){
        
        Optional<User> userOptional = userService.getUserById(userId);
        
        if (userOptional.isPresent()){
            User user = userOptional.get();
            boolean value = permission.get(permissionKey); //retrieves value from Map

            //based on the permission key, update the corresponding attribute
            switch(permissionKey){
                case "lockTasks":
                    user.setLockTasks(value);
                    break;
                case "deleteTasks":
                    user.setDeleteTasks(value);
                    break;
                case "assignTasks":
                    user.setAssignTasks(value);
                    break;
                default:
                    return ResponseEntity.badRequest().build();
            }

            userService.saveUser(user); //update user permissions in database

            return ResponseEntity.ok(user);

        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        
    }

    
}