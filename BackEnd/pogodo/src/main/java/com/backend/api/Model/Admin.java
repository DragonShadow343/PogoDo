package com.backend.api.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "\"Users\"")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String userName;

    @Column(nullable = false)
    private String passcode;

    @Column(nullable = false)
    private String userRole;  // This is the field for the role

    // Constructors, Getters, and Setters
    public Admin() {}

    public Admin(Integer userId, String firstName, String lastName, String email, String userName, String passcode, String userRole) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userName = userName;
        this.passcode = passcode;
        this.userRole = userRole;
    }

    // Getters and Setters
    public Integer getId() {
        return userId;
    }

    public void setId(Integer id) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return passcode;
    }

    public void setPassword(String password) {
        this.passcode = passcode;
    }

    public String getRole() {
        return userRole;
    }

    public void setRole(String userRole) {
        this.userRole = userRole;
    }
}