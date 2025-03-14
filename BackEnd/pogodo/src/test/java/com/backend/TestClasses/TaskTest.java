package com.backend.TestClasses;

import com.backend.api.Model.Task;

import java.time.LocalDate;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class TaskTest {

    @Test
    public void testTask() {
        Task task = new Task(1, 1, LocalDate.of(2021,12,31), "taskTitle", "taskDescription", false, false);

        // Tests that should pass
        Assertions.assertEquals(1, task.getId());
        Assertions.assertEquals(1, task.getPriorityStatus());
        Assertions.assertEquals(LocalDate.of(2021,12,31), task.getDueDate());
        Assertions.assertEquals("taskTitle", task.getTaskTitle());
        Assertions.assertEquals("taskDescription", task.getTaskDescription());
        Assertions.assertFalse(task.getCompleted());
        Assertions.assertFalse(task.getLockStatus());
    }
}
