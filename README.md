# COSC310-Team-2 Project

## Project Overview
This project is a full-stack application that combines a **React frontend**, a **Spring Boot backend**, and a **MySQL database**. The application is designed to demonstrate a modern web development stack, with a focus on scalability, maintainability, and ease of deployment.

### Key Features
- **React Frontend**: A dynamic and responsive user interface built with React, leveraging modern web development practices such as component-based architecture and state management.
- **Spring Boot Backend**: A robust and scalable backend powered by Spring Boot, providing RESTful APIs for the frontend to interact with.
- **MySQL Database**: A relational database used to store and manage application data, integrated with the backend using Spring Data JPA.

### Current Progress
#### FrontEnd:
Currently, in the frontend (React), we have a functional prototype with the following implemented features using React+Vite+Tailwind CSS:
* Fully functioning login home page with "Sign up" and "Log In" features 
* Has password verification to ensure a valid 8 character, unique password with a hashing method
* The following page is an Admin & User Task management page with very basic design implemented to demonstrate functionality
* Tasks contain details about the task, a title, description, deadline, priority, assignee, and current status
* View and update assigned tasks to progress their status further. Eg “In-Progress” -> “Completed”
* Real-time chat feature allowing admins/team members to communicate across different groups/topics with Send message and Leave chat features
* Daily task page showing tasks requiring progress
* Notifications sent to team members when a task is completed/assigned
* Completly redesigned task board with unique and creative design
* Forget password feature
* Admins control the permissions of users and what they can do with task management
* Search bar with filters for date, assigned users, priority, and status

#### Backend:
* Implemented spring boot to handle business logic, process requests from the frontend and interact with MySQL database
* Exposes RESTful APIs that the front end consumes
* Spring Data JPA is used to perform database operations, ensuring data is stored and retrieved efficiently
* Chat feature uses WebSocket, Sockjs, and Stomp to ensure proper routing and bi-directional communication between clients
* Jest & Babel used for the testing of javascript code
* Cors implemented to ensure the security of the frontend being connected to the backend and
* Account interface to ensure proper implementations of Admin and User which are standardized
* Express.js for routing and HTTP method handling
* Task controller implemented to receive all data from the frontend regarding tasks
* mapping & controllers on Springboot

#### DataBase:
* This project utilizes a MySQL database hosted on the Aiven cloud platform.
* The Spring Boot application leverages SpringData JPA to manage connections with the backend services.
* The database tables are designed according to the relational model, allowing for efficient management of entity relationships

##### Future Implementation:
* Logic modification and addition
* Advanced Task Features: Tagging, multi-assignee support.
* Team Linking: Admins linking team members under projects.
* Tasks can be "tagged"
* Team members can comment on tasks

##### Known bugs and plans to address them:
Notifications:
* Notifications are sent to the whole array, even if they have already received one.
* Description: when a user is assigned a task, the notification is sent to the array of assigned users. It can be fixed with a set or checking if users have already been sent a notification.
* Steps to reproduce: assign a user to a task and the notification will be sent to that user and the other users in the array.
* Affected components: The user’s notification tab can get unnecessary notifications
* Severity level: low
* How we will address it: Use a set instead of an array for the assigned users. The set can check whether the new value is already in the set, if it's not, then it will send a notification. If it is already apart of the set, it will not send a notification.

Search Bar:
* “No results found” feedback for the search bar 
* Description: When no tasks match the search or filter, the UI is empty without any message.
* Steps to Reproduce: Type an invalid search term(e.g., omg), All task sections appear empty without any context
* Affected Component: TaskUI, TaskRightBar
* Severity: UX bug - low
* How we will address it: Add error handling to give the text “no matching tasks found” when no matching results are found.

