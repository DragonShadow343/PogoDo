-- setup.sql

-- Use or create the database
CREATE DATABASE IF NOT EXISTS pogodo;
USE pogodo;

-- ======================
-- Users Table
-- ======================
CREATE TABLE IF NOT EXISTS Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(60),
    username VARCHAR(25) NOT NULL,
    passcode VARCHAR(255) NOT NULL,
    userRole VARCHAR(5) NOT NULL,
    lockTasks BOOLEAN,
    deleteTasks BOOLEAN,
    assignTasks BOOLEAN,
    CHECK (userRole IN ('Admin', 'User')),
    CONSTRAINT uniqueEmail UNIQUE (email),
    CONSTRAINT uniqueUserName UNIQUE (username)
);

-- ======================
-- Tasks Table
-- ======================
CREATE TABLE IF NOT EXISTS Tasks (
    taskId INT AUTO_INCREMENT PRIMARY KEY,
    priorityStatus INT,
    dueDate DATE,
    taskTitle VARCHAR(60),
    taskDescription VARCHAR(200),
    completionStatus BOOLEAN,
    lockStatus BOOLEAN
);

-- ======================
-- UserTasks (Many-to-Many)
-- ======================
CREATE TABLE IF NOT EXISTS UserTasks (
    userId INT,
    taskId INT,
    PRIMARY KEY (userId, taskId),
    FOREIGN KEY (userId) REFERENCES Users(userId)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (taskId) REFERENCES Tasks(taskId)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

-- ======================
-- Tags Table
-- ======================
CREATE TABLE IF NOT EXISTS Tags (
    tagId INT AUTO_INCREMENT PRIMARY KEY,
    tagName VARCHAR(20) NOT NULL
);

-- ======================
-- TaskTags Table (Many-to-Many)
-- ======================
CREATE TABLE IF NOT EXISTS TaskTags (
    taskId INT,
    tagId INT,
    PRIMARY KEY (taskId, tagId),
    FOREIGN KEY (taskId) REFERENCES Tasks(taskId)
        ON UPDATE RESTRICT ON DELETE CASCADE,
    FOREIGN KEY (tagId) REFERENCES Tags(tagId)
        ON UPDATE RESTRICT ON DELETE CASCADE
);

-- ======================
-- Sample Inserts (Feel free to modify or remove)
-- ======================
-- Users (Use fake or hashed passwords for public repos)
INSERT IGNORE INTO Users (firstName, lastName, email, username, passcode, userRole)
VALUES
('Test', 'Admin', 'admin@example.com', 'adminuser', 'hashed_password', 'Admin'),
('Test', 'User', 'user@example.com', 'testuser', 'hashed_password', 'User');

-- Tasks
INSERT IGNORE INTO Tasks (priorityStatus, dueDate, taskTitle, taskDescription, completionStatus, lockStatus)
VALUES
(3, '2025-05-05', 'Conquer the World', 'Become Ruler of the World', FALSE, FALSE),
(2, '2025-06-01', 'Design Landing Page', 'Create UI for MVP', TRUE, FALSE);

-- Tags
INSERT IGNORE INTO Tags (tagName) VALUES ('Ogopogo'), ('Urgent');

-- Sample task-tag relation
INSERT IGNORE INTO TaskTags (taskId, tagId) VALUES (1, 1);
