# University-Time-Table-Management-System
This project develops a RESTful API for managing a university's timetable system using Node JS & Mongo DB, allowing the creation, modification, and querying of class schedules for students, faculty, and staff. It emphasizes secure access, data integrity, and simulating real-world software development challenges within an educational context.

Main Functionalities of the System
-----------------------------
1. User Roles and Authentication - Defined multiple user roles with different access levels & Implemented secure login functionality and session management using JWT.
2. Course Management - Allowed CRUD operations on courses & Enable Admins to assign Faculty to courses.
3. Timetable Management - Facilitated the creation and modification of weekly timetables for different courses & Allowed CRUD operations on on sessions.
4. Room & Resource Booking - Managed classrooms and resources availability & Allowed booking of rooms and resources for classes or events, ensuring no overlaps.
5. Student Enrollment - Enable students to enroll in courses and view their timetables & Allows Faculty and Admins to view and manage student enrollments in courses.
6. Notifications & Alerts - Implemented a system to notify users of timetable changes, room changes, or important announcements.

Non-Functional Requirements that have been implemented
------------------------------------------------------------
1. Security - Secured API endpoints based on user roles & Protected sensitive data through encryption and security practices.
2. Database Design - Ensured data integrity and consistency across the application.
3. Error Handling and Logging - Implemented robust error handling for a smooth user experience and debugging & Log critical information for audit and diagnostic purposes.

Functional & Non-Functional Testing Performed
---------------------------------------------------
1. Unit Testing using Jest
2. Performance Testing using artillery.io
