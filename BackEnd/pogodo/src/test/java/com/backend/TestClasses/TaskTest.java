package com.backend.TestClasses;

import com.backend.api.Model.Task;
import com.backend.api.Model.User;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class TaskTest {

   Task task; 
   User user; 

   @BeforeEach
   public void setUp(){
    user = new User();
    task = new Task(1, 1, LocalDate.of(2021,12,31), "taskTitle", "taskDescription", false, false);
    user.setUsername("testUser");
   }
   
    @Test
    public void testTask() {

        
        Assertions.assertEquals(1, task.getId());
        Assertions.assertEquals(1, task.getPriorityStatus());
        Assertions.assertEquals(LocalDate.of(2021,12,31), task.getDueDate());
        Assertions.assertEquals("taskTitle", task.getTaskTitle());
        Assertions.assertEquals("taskDescription", task.getTaskDescription());
        Assertions.assertFalse(task.getCompleted());
        Assertions.assertFalse(task.getLockStatus());
    }

    @Test
    public void testAddUser(){
        task.getUsers().add(user);
        assertEquals(1, task.getUsers().size());
        assertTrue(task.getUsers().contains(user));
    }

    @Test
    public void testRemoveUser(){
        task.getUsers().add(user);
        assertEquals(1, task.getUsers().size()); 
        task.getUsers().remove(user);
        assertEquals(0, task.getUsers().size());
    }


}
