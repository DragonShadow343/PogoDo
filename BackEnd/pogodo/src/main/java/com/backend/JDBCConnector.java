package com.backend;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCConnector {
    public static void main(String[] args){
        //Database connection details

        String url = "jdbc:mysql://mysql-ogo-pogo-ogo-pogo.h.aivencloud.com:16239/defaultdb";
        String user = "avnadmin";
        String password = "AVNS_fr4fLxnT_9BoiTMNc-6";

        try{
            //Establish Connection

            Connection con = DriverManager.getConnection(url, user, password);
            System.out.println("Connected to database!");

            //Execute Simple Query
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SHOW TABLES;");

            //Print table names
            System.out.println("Tables in the database: ");
                while(rs.next()){
                    System.out.println(rs.getString(1));
                }

            //Close resources
            rs.close();
            stmt.close();
            con.close();
            System.out.println("Connection closed.");    

        } catch(SQLException e){
            e.printStackTrace();
        }
    }

}
