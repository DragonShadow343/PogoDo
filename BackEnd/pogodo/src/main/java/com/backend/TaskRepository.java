package com.backend;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TaskRepository {
   
   
    public static List<Task> getAllTasks() throws SQLException {
        List<Task> tasks = new ArrayList<>();
        String sql = "SELECT * FROM Tasks";

        try(
            Connection connection = JDBCConnector.getConnection();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Task task = new Task();
                task.setId(rs.getInt("taskId"));
                task.setPriority(rs.getInt("priorityStatus"));
                task.setDueDate(rs.getString("dueDate"));
                task.setTaskName(rs.getString("taskTitle"));   
                task.setDescription(rs.getString("taskDescription"));
                task.setCompleted(rs.getBoolean("completionStatus"));
                task.setLockStatus(rs.getBoolean("lockStatus"));
                tasks.add(task);
                }    

            }
        return tasks;
    } 

    public static void main(String[]args) {
       
        try { 
            //Get all Task
            List<Task> tasks = getAllTasks();

            //Print out tasks
            int i;

            for(i =0; i < tasks.size(); i++){
                Task task = new Task();
                task = tasks.get(i);
                System.out.print("Task #"+i+"\n"+ "Task Id: "+ task.getId() + "\n"+"Priority Status: "+ task.getPriority()+"\n"+"Due Date: "+task.getDueDate()+"\n"+"Task Name: "+task.getTaskName()+"\n"+"Task Description: "+task.getDescription()+"\n"+"Completed: "+task.getCompleted()+"\n");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
