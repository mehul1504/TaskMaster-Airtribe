
# TaskMaster-Airtribe: A Collaborative Task Tracking System
TaskMaster is a task tracking and management application backend built with Node.js, Express.js, and MongoDB. It facilitates collaboration and organization within teams or projects, allowing users to create, assign, and track tasks, as well as collaborate with team members through comments and attachments.

## Features

- User Authentication and Management
  - User registration, login, and profile management
- Task Management
  - Create, read, update, and delete tasks
  - Filter, sort, and search tasks
  - Mark tasks as completed
  - Assign tasks to team members
  - Add comments and attachments to tasks
- Team/Project Collaboration
  - Create and join teams/projects
  - Invite team members
  - View team/projects
- Real-time updates and notifications (optional)

## Installation

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/mehul1504/taskmaster.git
    cd taskmaster
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

## API Endpoints

### User Authentication and Management

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Get Profile**: `GET /api/auth/profile`
- **Update Profile**: `PUT /api/auth/profile`
- **Logout**: `POST /api/auth/logout`

### Task Management

- **Create Task**: `POST /api/tasks`
- **Get Tasks**: `GET /api/tasks`
- **Get Task by ID**: `GET /api/tasks/:id`
- **Update Task**: `PUT /api/tasks/:id`
- **Delete Task**: `DELETE /api/tasks/:id`
- **Add Comment to Task**: `POST /api/tasks/:id/comments`
- **Add Attachment to Task**: `POST /api/tasks/:id/attachments`

### Team/Project Collaboration

- **Create Team/Project**: `POST /api/teams`
- **Invite Members to Team/Project**: `PUT /api/teams/invite/:id`
- **Join Team/Project**: `PUT /api/teams/join/:id`
- **Get Teams/Projects**: `GET /api/teams`

## Data Models

### User
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
### Task
```json
{
  {
  "title": "string",
  "description": "string",
  "dueDate": "date",
  "status": "string",
  "assignedTo": "ObjectId",
  "comments": [
    {
      "text": "string",
      "createdBy": "ObjectId",
      "createdAt": "date"
    }
  ],
  "attachments": [
    {
      "filename": "string",
      "data": "string (base64)"
    }
  ]
}

}
```
### Team
```json
{
  "name": "string",
  "members": ["ObjectId"],
  "createdBy": "ObjectId"
}
```
## Middleware
#### Authentication Middleware
authMiddleware.js: Verifies JWT token and attaches the user to the request object.
#### Validation Middleware
validationMiddleware.js: Validates request data using express-validator.
## Error Handling
Errors are handled using Express's built-in error handling middleware. Custom error messages are provided for validation errors and other application-specific errors.
