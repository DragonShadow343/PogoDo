# Backend Instructions

## Encountering issues with java code
Chance are that you might not have a java build tool installed in your computer

You can check if you have one by typing `mvn -v` into the terminal. If you get an error where mvn is not found, then it is not installed. 

You can install maven by opening terminal (on Mac) and typing `brew install maven` if you have homebrew installed on your computer.

<br>

--- 
<br>

## Testing connection to Databse
Ensure you are in the Backend Folder for all of these unless specified


### Nodemon
- Ensure that you have permission to access n
    - Check by typing `npm run dev` in the terminal
    - If you don't have access, quick fix is to reinstall nodemon:\
    Type in terminal: <br> 
    `npm uninstall nodemon` <br> 
    `npm install --save-dev nodemon` <br>
    `npm run dev`
- If you have permission, running `npm run dev` in the terminal should suffice
<br><Br>
---

### Port number
There are two places in the backend folder where the port number can be changed:
1. index.js
2. package.json

For the moment, the ports have been set to 3500.

If you decide to change the port number in these two files, remember to change the port number in the frontend as well. The files are:
1. App.jsx
2. axios.jsx
<br><br>
---

### Testing out the connection
Open a new terminal and copy this into the terminal:

`java -cp "lib/mysql-connector-j-9.2.0.jar:pogodo/target/classes" com.backend.JDBCConnector`

This should list all the tables in database