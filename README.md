Role-Based Task Management Backend
This is the backend implementation for a Role-Based Task Management Web Application built using the MERN Stack (MongoDB, Express, React, Node.js).
The system facilitates hierarchical task assignment within teams, supporting host-member relationships, weekly task assignments, and secure user authentication & authorization.

Features
✅ Authentication & Authorization

Secure JWT-based authentication system
Role-based access control supporting two user roles:
Host (Admin): Full privileges
Team Member: Restricted, view-only privileges
Passwords securely hashed using bcryptjs
✅ User Management (Host Privileges)

Host can create, view, and delete team member accounts
Host dashboard to manage all users and their tasks
✅ Task Management System

Hosts can:
Create, assign, edit, delete tasks
Assign tasks to specific team members
Set attributes: description, deadline, status
Team Members:
View only their own assigned tasks for the current week
✅ Weekly Task Organization & Tracking

Tasks organized on a weekly basis
Clear visibility of current week's assignments
Track task completion & status updates by Host
Tech Stack
Technology	Description
Node.js	Runtime environment
Express.js	Backend framework
MongoDB	NoSQL database
Mongoose	MongoDB ODM for schema & query management
JSON Web Tokens	Secure authentication
bcryptjs	Password hashing
dotenv	Environment variable management
CORS	Cross-Origin Resource Sharing configuration
API Endpoints Overview
Authentication Routes
Method	Endpoint	Description	Access
POST	/api/auth/signup	Register new Host or Member account	Public
POST	/api/auth/login	Authenticate user & return token	Public
User Management Routes (Host Only)
Method	Endpoint	Description
POST	/api/admin/create-user	Create a new team member
GET	/api/admin/get-members	Fetch list of all members
DELETE	/api/admin/delete-member/:id	Delete member by ID
Task Management Routes
Method	Endpoint	Description	Access
POST	/api/tasks/create	Create & assign task to team member	Host
PUT	/api/tasks/edit/:id	Edit existing task	Host
DELETE	/api/tasks/delete/:id	Delete task by ID	Host
GET	/api/tasks/member	Fetch current week's tasks (Self only)	Member
GET	/api/tasks/host	Fetch all tasks	Host
Database Models
User Schema
name: String
email: String (unique)
password: String (hashed)
role: Enum (host / member)
Task Schema
description: String
deadline: Date
status: Enum (Pending / Completed)
assignedTo: User Reference (team member)
createdBy: User Reference (host)
week: Number (current week)
Getting Started 🚀
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/task-management-backend.git
cd task-management-backend
2. Install Dependencies
bash
Copy
Edit
npm install
3. Environment Variables
Create a .env file in the root directory:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key
4. Run the Server
bash
Copy
Edit
npm start
Server will be running on:
http://localhost:5000

Security Measures
JWT Authentication for secure sessions
Password Hashing with bcryptjs
Role-based Middleware for strict access control
Input Validation & Sanitization
Scalability Considerations
Modular MVC structure for ease of maintenance
Scalable MongoDB database schema
Middleware-based role verification for future role expansion
API routes easily extendable for new features (e.g., notifications, reporting)
Folder Structure
pgsql
Copy
Edit
📦 backend/
 ┣ 📂 controllers/
 ┣ 📂 models/
 ┣ 📂 middleware/
 ┣ 📂 routes/
 ┣ 📄 .env
 ┣ 📄 server.js
 ┣ 📄 package.json
Future Enhancements
Email notifications for task deadlines
Task priority levels
Activity logs for team management
Pagination & Search for tasks and users
