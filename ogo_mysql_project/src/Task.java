package src;

public class Task {
    public int id; //primary key
    public int priority; //1-5 ? (** starring for looking at later)
    public String taskName; //name of task
    public String description; //description of task
    public boolean completed; //true or false if task is completed

    //Constructor with all attributes included....
    public Task(int id, int priority, String taskName, String description, boolean completed) {
        this.id = id; 
        this.priority = priority;
        this.taskName = taskName;
        this.description = description;
        this.completed = completed; 
    }
    //Constructor with only taskName and description included.... will have to have id set itself and increment ?
    public Task(String taskName, String description){
        this.taskName = taskName;
        this.description = description;
    }

    //setters and getters for all attributes
    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    public String getTaskName(){
        return taskName;
    }
    public void setTaskName(String taskName){
        this.taskName = taskName;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public int getPriority(){
        return priority;
    }
    public void setPriority(int priority){
        this.priority = priority;
    }
    public boolean getCompleted(){
        return completed;
    }
    public void setCompleted(boolean completed){
        this.completed = completed;
    }

}
