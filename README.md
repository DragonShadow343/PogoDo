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
* Has password verification to ensure valid 8 character unique password with hashing method
* The following page is an Admin & User Task management page with very basic design implemented to demonstrate functionality
* Tasks contain details about the task, a title, description, deadline, priority, assignee, and current status
* View and update assigned tasks to progress its status further. Eg “In-Progress” -> “Completed”
* Real-time chat feature allowing admins/team members to communicate accross different groups/topics with Send message and Leave chat features
* Daily task page showing task requiring progress

##### Future Implementation:
* Completly redesigned task board with unique and creative design
* Smaller logical implementations such as "Forget Password", Admins controlling permissions, Searching features with filters
* Tasks have tags
* Notifications sent to team members when task completed/assigned

#### Backend:
* Implemented spring boot to handle business logic, processes requests from the frontend and interacts with mysql database
* Exposes RESTful apis that the front end consumes
* Spring Data JPA is used to perform database operations, ensuring data is stored and retrieved efficiently
* Chat feature uses WebSocket, Sockjs, and Stomp to ensure proper routing and bi-directional communication between clients
* Jest & Babel used for the testing of javascript code
* Cors implemented to ensure security of the frontend being connected to the backend and
* Account interface to ensure proper implementations of Admin and User which are standardized
* Express.js for routing and http method handling
* Task controller implemented to recieve all data from the frontend regarding tasks

##### Future Implementation:
* Future mapping & controllers on springboot
* Logic modification and addition

#### DataBase:
* This project utilizes a MySQL database hosted on the Aiven cloud platform.
* The Spring Boot application leverages SpringData JPA to manage connections with the backend services.
* The database tables are designed according to the relational model, allowing for efficient management of entity relationships
