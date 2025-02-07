import JUnit;
import org.junit.Test.*;

public class Test {
    @Test
    public void test() {
        Task task = new Task(1, 1, "Task 1", "Description 1", false);
        assertEquals(1, task.getId());
        assertEquals(1, task.getPriority());
        assertEquals("Task 1", task.getTaskName());
        assertEquals("Description 1", task.getDescription());
        assertEquals(false, task.getCompleted());
        
    }
}
