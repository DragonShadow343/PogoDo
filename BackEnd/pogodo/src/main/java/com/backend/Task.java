package com.backend;
public class Task {
    private int id; //primary key
    private int priorityStatus; //1-5 ? (** starring for looking at later)
    private String dueDate;
    private String taskName; //task name
    private String description; //description of task
    private boolean completionStatus; //true or false if task is completed
    private boolean lockStatus;


    //Constructor with no attributes 

    public Task(){};

    //Constructor with all attributes included....
    public Task(int id, int priority, String dueDate, String taskName, String description, boolean completed, boolean lockStatus){ {
        setId(id);
        setPriority(priority);
        setDueDate(dueDate);
        setTaskName(taskName);
        setDescription(description);
        setCompleted(completed);
        setLockStatus(lockStatus);
        }
    }
    //Constructor with only taskName and description included.... will have to have id set itself and increment ?
    public Task(String taskName, String description){
        setTaskName(taskName);
        setDescription(description);
    }

    public void setId(int id){
        if (id < 0){
            throw new IllegalArgumentException("ID cannot be negative");
        }
        this.id = id;
    }
    //setters and getters for all attributes
    public int getId(){
        return id;
    }

    public String getDueDate(){
        return dueDate;
    }

    public void setDueDate(String dueDate){
        if (dueDate == null || dueDate.isEmpty()){
            throw new IllegalArgumentException("Due date cannot be null");
        }
        this.dueDate = dueDate;
    }

    public String getTaskName(){
        return taskName;
    }

    public void setTaskName(String taskName){
        if (taskName == null || taskName.isEmpty()){
            throw new IllegalArgumentException("Task Name cannot be null");
        }
        this.taskName = taskName;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        if (description == null || description.isEmpty()){
            throw new IllegalArgumentException("Description cannot be null");
        }
        this.description = description;
    }

    public int getPriority(){
        return priorityStatus;
    }

    public void setPriority(int priority){
        if (priority < 1 || priority > 3){
            throw new IllegalArgumentException("Priority must be between 1 and 3");
        }
        this.priorityStatus = priority;
    }

    public boolean getCompleted(){
        return completionStatus;
    }

    public void setCompleted(boolean completed){
        if (completed != true && completed != false){
            throw new IllegalArgumentException("Completion status must be true or false");
        }
        this.completionStatus = completed;
    }

    public void setLockStatus(boolean lockStatus){
        if (lockStatus != true && lockStatus != false){
            throw new IllegalArgumentException("Lock status must be true or false");
        }
        this.lockStatus = lockStatus;
    }

    public boolean getLockStatus(){
        return lockStatus;
    }

}
