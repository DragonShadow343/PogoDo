import org.junit.*;

public class TestTask {
    @Test
    public void test() {
        Task task = new Task(1, 1, "2021-12-31", "taskName", "description", false);

        //tests that should pass
        Assert.assertEquals(1, task.getId());
        Assert.assertEquals(1, task.getPriority());
        Assert.assertEquals("2021-12-31", task.getDueDate());
        Assert.assertEquals("taskName", task.getTaskName());
        Assert.assertEquals("description", task.getDescription());
        Assert.assertEquals(false, task.getCompleted());

    }
}
