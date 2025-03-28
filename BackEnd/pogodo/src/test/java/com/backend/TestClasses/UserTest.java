package com.backend.TestClasses;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.backend.api.Model.Task;
import com.backend.api.Model.User;

public class UserTest {
    
    private User user;
    private Task task;


    @BeforeEach
    public void setUp(){
        user = new User();
        task = new Task();
        task.setTaskTitle("Sample Task");
    }

    @Test

    public void testAddTask(){
        user.getTasks().add(task);
        assertEquals(1, user.getTasks().size()); 
        assertTrue(user.getTasks().contains(task));
    }

    @Test
    public void testRemoveTask(){
        user.getTasks().add(task);
        user.getTasks().remove(task);
        assertEquals(0, user.getTasks().size()); 
    }
}
