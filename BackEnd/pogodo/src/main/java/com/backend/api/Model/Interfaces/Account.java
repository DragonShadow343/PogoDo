package com.backend.api.Model.Interfaces;

public interface Account {
    Integer getUserId();
    void setUserId(int userId);

    String getFirstName();
    void setFirstName(String firstName);

    String getLastName();
    void setLastName(String lastName);

    String getEmail();
    void setEmail(String email);

    String getUsername();
    void setUsername(String username);

    String getPasscode();
    void setPasscode(String passcode);

    String getUserRole();
    void setUserRole(String userRole);
}
