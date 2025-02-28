package com.backend;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCConnector {
   
    private static final String URL = "jdbc:mysql://mysql-ogo-pogo-ogo-pogo.h.aivencloud.com:16239/defaultdb";
    private static final String user = "avnadmin";
    private static final String password = "AVNS_fr4fLxnT_9BoiTMNc-6";

    public static Connection getConnection(){
        Connection connection = null;

      try{
        connection = DriverManager.getConnection(URL,user, password);  
      }  
         catch (SQLException e){
        System.out.println("Connection to database failed.");
        e.printStackTrace();
      }      
          return connection;    
    
    }

   
    public static void main(String[] args){
        
        try{
            //Establish Connection

            Connection connection = getConnection();


            //Test Connection by executing simple query
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SHOW TABLES;");

            //Print out tables from query
            System.out.println("Tables in the database: ");
                while(rs.next()){
                    System.out.println(rs.getString(1));
                }

            //Close resources
            rs.close();
            stmt.close();
            connection.close();
                System.out.println("Connection Closed.");


        } catch(SQLException e){
            e.printStackTrace();
        }
    }

}
