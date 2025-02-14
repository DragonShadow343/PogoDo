import org.junit.*;

public class AdminTest {

    @Test
    public void test() {
        Admin admin = new Admin(1, "username", "first", "last", "email", "password");

        //tests that should pass
        Assert.assertEquals(1, admin.getId());
        Assert.assertEquals("username", admin.getUserName());
        Assert.assertEquals("first", admin.getFirstName());
        Assert.assertEquals("last", admin.getLastName());
        Assert.assertEquals("email", admin.getEmail());
        Assert.assertEquals("password", admin.getPassword());
    }
}
