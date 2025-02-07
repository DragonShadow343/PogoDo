package src;

public class Task {
    public int Id;
    public int priority;
    public String taskName;
    public String description;
    public boolean completed;

    public Task(int id, int priority, String taskName, String description, boolean completed) {
        this.Id = id;
        this.priority = priority;
        this.taskName = taskName;
        this.description = description;
        this.completed = completed;
    }
    public int getId(){
        return Id;
    }
    public void setId(int id){
        this.Id = id;
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
