// Source code is decompiled from a .class file using FernFlower decompiler.
package com.backend.api.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Admin {
    @Id
   private int id;
   private String userName;
   private String firstName;
   private String lastName;
   private String email;
   private String password;

   public Admin(int var1, String var2, String var3, String var4, String var5, String var6) {
      this.setId(var1);
      this.setUserName(var2);
      this.setFirstName(var3);
      this.setLastName(var4);
      this.setEmail(var5);
      this.setPassword(var6);
   }
   public Admin() {
   }

   public void setId(int var1) {
      if (var1 < 0) {
         throw new IllegalArgumentException("ID cannot be negative");
      } else {
         this.id = var1;
      }
   }

   public int getId() {
      return this.id;
   }

   public void setUserName(String var1) {
      if (var1 != null && !var1.isEmpty()) {
         this.userName = var1;
      } else {
         throw new IllegalArgumentException("Username cannot be empty");
      }
   }

   public String getUserName() {
      return this.userName;
   }

   public void setFirstName(String var1) {
      if (var1 != null && !var1.isEmpty()) {
         this.firstName = var1;
      } else {
         throw new IllegalArgumentException("First name cannot be empty");
      }
   }

   public String getFirstName() {
      return this.firstName;
   }

   public void setLastName(String var1) {
      if (var1 != null && !var1.isEmpty()) {
         this.lastName = var1;
      } else {
         throw new IllegalArgumentException("Last name cannot be empty");
      }
   }

   public String getLastName() {
      return this.lastName;
   }

   public void setEmail(String var1) {
      if (var1 != null && !var1.isEmpty()) {
         this.email = var1;
      } else {
         throw new IllegalArgumentException("Email cannot be empty");
      }
   }

   public String getEmail() {
      return this.email;
   }

   public void setPassword(String var1) {
      if (var1 != null && !var1.isEmpty()) {
         this.password = var1;
      } else {
         throw new IllegalArgumentException("Password cannot be empty");
      }
   }

   public String getPassword() {
      return this.password;
   }
}
