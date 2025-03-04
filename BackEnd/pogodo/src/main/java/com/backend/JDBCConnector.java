package com.backend;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCConnector {

    private static Connection connection;
   

    public static Connection getConnection() throws SQLException{
        if (connection == null || connection.isClosed()){
            String url, user, password;

            if ("true".equals(System.getProperty("test.mode"))) {
                System.out.println("Running in test mode on H2 database.");
                url = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;MODE=MySQL";
                user = "SA";
                password = "";
            } else {
                System.out.println("Running in production mode on MySQL database.");
                url = "jdbc:mysql://mysql-ogo-pogo-ogo-pogo.h.aivencloud.com:16239/defaultdb";
                user = "avnadmin";
                password = "AVNS_fr4fLxnT_9BoiTMNc-6";
            }
            connection = DriverManager.getConnection(url, user, password);
        } 
        return connection;   
    }

    public static void closeConnection() throws SQLException{
        if (connection != null && !connection.isClosed()){
            connection.close();
        }
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
