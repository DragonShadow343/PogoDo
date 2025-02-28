package com.backend;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AdminRepository {
    
    public static List<Admin> getAllAdmins() throws SQLException{
        List<Admin> admins= new ArrayList<>();
        String sql = "SELECT * from Users WHERE userRole = 'Admin'"; //selecting all admins from Admins table

        try(
            Connection con = JDBCConnector.getConnection(); //Create JDBC connection
            Statement stmnt = con.createStatement(); //create statement, possibly change with prepared statement later ?
            ResultSet rs = stmnt.executeQuery(sql)) {

                while (rs.next()){
                    Admin admin = new Admin();
                    admin.setId(rs.getInt("userId"));
                    admin.setUserName(rs.getString("userName"));
                    admin.setFirstName(rs.getString("firstName"));
                    admin.setLastName(rs.getString("lastName"));
                    admin.setEmail(rs.getString("email"));
                    admin.setPassword(rs.getString("passcode"));
                    admins.add(admin);
                }
    }
    return admins; //returning the list of admins
}
    public static void main(String[] args) {
        try{
            List<Admin> admins = getAllAdmins();

            for(int i = 0; i < admins.size(); i++){
                Admin admin = admins.get(i);
                System.out.print("Admin #"+i+"\n"+"Admin Id: "+admin.getId()+"\n"+"Username: "+admin.getUserName()+"\n"+"First Name: "+admin.getFirstName()+"\n"+"Last Name: "+admin.getLastName()+"\n"+"Email: "+admin.getEmail()+"\n"+"Password: "+admin.getPassword()+"\n");
            }
        } catch (SQLException e){
            e.printStackTrace();
        }
    }
}
