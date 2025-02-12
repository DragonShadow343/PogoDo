

public class Admin {

    private int id;
    private String userName, firstName, lastName, email, password;


    public Admin(int id, String userName, String firstName, String lastName, String email, String password) {
        //one constructor to set all the fields, admins should have all required fields created
        setId(id);
        setUserName(userName);
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setPassword(password);
    }

    //setters and getters, with validation for all setters, can (and should) be further modified later with other validation rules
    //such as id being unique, password being in correct format, etc.
    public void setId(int id){
        if (id < 0){
            throw new IllegalArgumentException("ID cannot be negative");
        }
        this.id = id;
    }
    public int getId(){
        return id;
    }
    public void setUserName(String userName){
        if (userName == null || userName.isEmpty()){
            throw new IllegalArgumentException("Username cannot be empty");
        }
        this.userName = userName;
    }
    public String getUserName(){
        return userName;
    }
    public void setFirstName(String firstName){
        if (firstName == null || firstName.isEmpty()){
            throw new IllegalArgumentException("First name cannot be empty");
        }
        this.firstName = firstName;
    }
    public String getFirstName(){
        return firstName;
    }
    public void setLastName(String lastName){
        if (lastName == null || lastName.isEmpty()){
            throw new IllegalArgumentException("Last name cannot be empty");
        }
        this.lastName = lastName;
    }
    public String getLastName(){
        return lastName;
    }
    public void setEmail(String email){
        if (email == null || email.isEmpty()){
            throw new IllegalArgumentException("Email cannot be empty");
        }
        this.email = email;
    }
    public String getEmail(){
        return email;
    }
    public void setPassword(String password){
        if (password == null || password.isEmpty()){
            throw new IllegalArgumentException("Password cannot be empty");
        }
        this.password = password;
    }
    public String getPassword(){
        return password;
    }
    
}
