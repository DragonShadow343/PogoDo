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

        User savedUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
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
            System.out.println("Received User Data: " + user);
            User savedUser = userService.registerUser(user);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
        }
    }
    @RequestMapping(
        value = "/reset-password",
        method = RequestMethod.POST,
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String newPassword = request.get("newPassword");
        
        if (username == null || username.isEmpty() || newPassword == null || newPassword.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "Username and new password are required"));
        }

        Optional<User> userOptional = userService.getUserByUsername(username);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            user.setPasscode(newPassword); //this is where the password is hashed when saved
            userService.registerUser(user);
            return ResponseEntity.ok()
                .body(Map.of("message", "Password updated successfully"));

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "User not found"));
        }
    }


    @GetMapping("/{id}/permissions")
    public ResponseEntity<Map<String, Boolean>> getUserPermissions(@PathVariable Integer id) {
        return userService.getUserById(id)
            .map(user -> {
                Map<String, Boolean> permissions = Map.of(
                    "lockTasks", user.getLockTasks(),
                    "deleteTasks", user.getDeleteTasks(),
                    "assignTasks", user.getAssignTasks()
                );
                return ResponseEntity.ok(permissions);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/{userId}/permissions/{permissionKey}")
    public ResponseEntity<User> updateUserPermission(@PathVariable Integer userId, @PathVariable String permissionKey, @RequestBody Map<String, Boolean> permission) {

        Optional<User> userOptional = userService.getUserById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            boolean value = permission.get(permissionKey); // retrieves value from Map

            switch (permissionKey) {
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

            User updatedUser = userService.updateUser(user); // ✅ Use updateUser here
            return ResponseEntity.ok(updatedUser);

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

        @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
        public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
            String username = loginRequest.getUsername();
            String password = loginRequest.getPasscode();

            Optional<User> userOptional = userService.getUserByUsername(username);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                
                //verify the password matches the hashed version
                if (passwordEncoder.matches(password, user.getPasscode())) { 
                    return ResponseEntity.ok().body(Map.of(
                        "message", "Login successful",
                        "id", user.getUserId(),
                        "username", user.getUsername(),
                        "role", user.getUserRole()
                    ));
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid password"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "User not found"));
            }
        } 
} 

