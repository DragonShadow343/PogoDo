package com.backend.api.Model;

import java.util.HashSet;
import java.util.Set;

import com.backend.api.Model.Interfaces.Account;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "\"Users\"") 
public class User implements Account{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "userId", nullable = false)
    private Integer userId;

    @Column(name = "firstName", nullable = false)
    @JsonProperty("firstName")
    private String firstName;

    @JsonProperty("lastName")
    @Column(name = "lastName", nullable = false)
    private String lastName;

    @JsonProperty("email")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @JsonProperty("username")
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @JsonProperty("passcode")
    @Column(name = "passcode", nullable = false)
    private String passcode;

    @JsonProperty("userRole")
    @Column(name = "userRole", nullable = false)
    private String userRole;

    @JsonProperty("lockTasks")
    @Column(name = "lockTasks", nullable = true)
    private boolean lockTasks;

    @JsonProperty
    @Column(name = "deleteTasks", nullable = true)
    private boolean deleteTasks;

    @Column(name = "assignTasks", nullable = true)
    private boolean assignTasks;

    //Join Table for the Many to Many Relationship between Users and Tasks: allows for task assignment
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "\"UserTasks\"",
        joinColumns = @JoinColumn(name = "userId"),
        inverseJoinColumns = @JoinColumn(name = "taskId")
    )
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JsonManagedReference
    private Set<Task> tasks = new HashSet<>();        

    
    public User(String firstName, String lastName, String email, String username, String passcode, String userRole) {
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.passcode = passcode;
        this.userRole = userRole;
    }

    public User() {
    }

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        if (userId < 0) {
            throw new IllegalArgumentException("ID cannot be negative");
        }
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        if (firstName == null || firstName.isEmpty()) {
            throw new IllegalArgumentException("First name cannot be empty");
        }
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        if (lastName == null || lastName.isEmpty()) {
            throw new IllegalArgumentException("Last name cannot be empty");
        }
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        this.username = username;
    }

    public String getPasscode() { 
        return passcode;
    }
    
    public void setPasscode(String passcode) { 
        if (passcode == null || passcode.isEmpty()) {
            throw new IllegalArgumentException("Passcode cannot be empty");
        }
        this.passcode = passcode;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        if (userRole == null || userRole.isEmpty()) {
            throw new IllegalArgumentException("User role cannot be empty");
        }
        this.userRole = userRole;
    }


    public void setLockTasks(boolean lockTasks){
        this.lockTasks = lockTasks;
    }

    public boolean getLockTasks(){
        return lockTasks;
    }

    public void setDeleteTasks(boolean deleteTasks){
        this.deleteTasks = deleteTasks;
    }

    public boolean getDeleteTasks(){
        return deleteTasks;
    }

    public void setAssignTasks(boolean assignTasks){
        this.assignTasks = assignTasks;
    }

    public boolean getAssignTasks(){
        return assignTasks;
    }

    // toString Method

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", passcode='" + passcode + '\'' +
                ", userRole='" + userRole + '\'' +
                '}';
    }


    public Set<Task> getTasks() {
        return tasks;
    }

    public void addTask(Task task){
        this.tasks.add(task);
    }

    public void removeTask(Task task){
        this.tasks.remove(task);
    }

}