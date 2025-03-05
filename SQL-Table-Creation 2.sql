USE defaultdb;

CREATE TABLE Users (
userId int AUTO_INCREMENT,
firstName varchar(50),
lastName varchar(50),
email varchar(60),
username varchar(25) NOT NULL,
passcode varchar(25) NOT NULL,
userRole varchar(5) NOT NULL,
CHECK(userRole = 'Admin' OR userRole = 'User'),
PRIMARY KEY (userId)
); 

INSERT INTO Users(firstName,lastName, email, username, passcode, userRole)
 VALUES ('Cat', 'Robert', 'cat@gmail.com', 'cat', '1234', 'Admin'); 

 INSERT INTO Users(firstName,lastName, email, username, passcode, userRole)
  VALUES ('Branden', 'Kennedy', "branden@gmail.com", 'branden6', '1234', 'Admin');
 

INSERT INTO Users(firstName,lastName, email, username, passcode, userRole)
 VALUES ('Cat', 'Robert', 'cat@gmail.com', 'cat', '1234', 'User'); 



CREATE TABLE TestUsers (
userId int AUTO_INCREMENT,
firstName varchar(50),
lastName varchar(50),
email varchar(60),
username varchar(25) NOT NULL,
passcode varchar(25) NOT NULL,
userRole varchar(5) NOT NULL,
CHECK(userRole = 'Admin' OR userRole = 'User'),
PRIMARY KEY (userId)
); 

ALTER TABLE TestUsers
ADD CONSTRAINT uniqueEmail UNIQUE (email),
ADD CONSTRAINT uniqueUserName UNIQUE (username);

INSERT INTO TestUsers(firstName,lastName, email, username, passcode, userRole)
 VALUES ('Cat', 'Robert', 'cat@gmail.com', 'cat', '1234', 'Admin'); 

 INSERT INTO TestUsers(firstName,lastName, email, username, passcode, userRole)
  VALUES ('Branden', 'Kennedy', 'branden@gmail.com', 'branden6', '1234', 'Admin');
 

INSERT INTO TestUsers(firstName,lastName, email, username, passcode, userRole)
 VALUES ('Cat', 'Robert', 'catUser@gmail.com', 'catUser', '1234', 'User');

 
 CREATE TABLE Tasks(
 taskId int AUTO_INCREMENT,
 priorityStatus int,
 dueDate Date,
 taskTitle varchar(60),
 taskDescription varchar(200),
 completionStatus boolean,
 lockStatus boolean,
 PRIMARY KEY (taskId)
 );
 
 INSERT INTO Tasks(priorityStatus,dueDate,taskTitle,taskDescription,completionStatus,lockStatus)
  VALUES (3, '2025-05-05', 'Conquer the World', 'become Queen of the World', FALSE, FALSE);
  
  
  INSERT INTO Tasks(priorityStatus,dueDate,taskTitle,taskDescription,completionStatus,lockStatus)
  VALUES (3, '2025-05-05', 'Conquer the World', 'become Queen of the World', TRUE, FALSE);
 
   
   CREATE TABLE UserTasks (
   userId int PRIMARY KEY,
   taskId int,
   FOREIGN KEY (userId) REFERENCES Users(userId)
	ON UPDATE RESTRICT ON DELETE CASCADE,
   FOREIGN KEY(taskId) REFERENCES Tasks(taskId)
	ON UPDATE RESTRICT ON DELETE CASCADE);

    
    CREATE TABLE Tags (
    tagId int AUTO_INCREMENT,
    tagName varchar(20) NOT NULL,
    PRIMARY KEY (tagID));
    
    INSERT INTO Tags(tagName) VALUES ('Ogopogo');
    SELECT * FROM Tags;
    
    CREATE TABLE TaskTags(
    taskId int PRIMARY KEY,
    tagId int,
    FOREIGN KEY(taskId) REFERENCES Tasks(taskId)
		ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (tagId) REFERENCES Tags(tagId)
		ON UPDATE RESTRICT ON DELETE CASCADE );
    
   
ALTER TABLE Users
ADD CONSTRAINT uniqueEmail UNIQUE (email),
ADD CONSTRAINT uniqueUserName UNIQUE (username);


   
 

