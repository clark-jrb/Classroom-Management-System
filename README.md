# Classroom Management System (School Project)

The Classroom Management System is a web application that consists of two main features that can also be accessed by two distinct end-users: students and the teachers. This web application is primarily designed to lessen the difficulties of teachers by simplifying the process of computing student grades in an automated manner.

Other functions include teachers managing their tasks given to students, users manipulating their personal information, grading system and viewing the history of student grades in a quarter.

**Project duration:** 23 Weeks

>This is one of our school projects in software engineering subject and I re-created it using the `MERN (MongoDB, Express.js, React, Node.js)` stack but with `TypeScript`. The project is orginally made using `PHP` but I want to practice my `React` skills so I re-created it. This is also to demonstrate `REST API` and `JSON Web Token` based authentication.

You can check the application on live: 
[Link here](https://classroom-management-system.vercel.app/)

>This application is deployed using Vercel.

<hr>

If you are going to try the system you should follow this:
* Register an account (student or teacher)

>🗒️Note: If you're going to create a record (ex. Recitation) for grade X section X, you should create the students first based on what `grade level` and `section` the teacher is.

If you are going to use the admin this is the only account: 

| Email | Password |
| ------------- |:-------------:|
| admin@example.com | 12341234 |

<hr>

## List of the tools I used:
* Client
    * Axios `v1.7.7`
    * React `v18.3.1`
    * React-router-dom `v6.27.0`
    * React-hook-form `v7.53.0`
    * Shadcn UI
    * TailwindCSS
    * TanStack Query `v5.59.13`
    * TypeScript
    * Vite `v6.2.0`
    * Zod `v3.23.8`
    * Zustand `v5.0.0-rc.2`
* Server
    * CORS `v2.8.5`
    * Express.js `v4.21.0`
    * JSON Web Token `v9.0.2`
    * Mongoose `v8.7.0`
    * TypeScript
* Vercel

## System Features✨
The users are:
* Students
* Teachers (Homeroom & Subject)
* Admin

### Login & Register page
* The register page consists of two roles: `Student` and `Teacher`
    * Users may register according to their roles and should input information needed.
* The login page consists of three role: `Student`, `Teacher` and `Admin`
    * Users should log in based on their respective roles.

> I used `JWT` and `cookies` to *authenticate* and *authorize*. `Protected routes` for authenticated users have been implemented, so attempts by non-authenticated users to access the dashboard will fail.  It is also protected by roles, so if a student attempts to access the teacher routes, it won't be successful.

### Dashboard
* Dashboard for `students` and `teachers` are the same, they can only see what is the current quarter of the school year.
* Dashboard of `Admin` consists of editing what quarter should be used (*it should be changing based on the said date but this is for demo*).

### Profile
* Both `students` and `teachers` can be able to `UPDATE` their personal information.

### Grades
* Student
    * `Students` can see their grades in a table-like UI. (`subject grades` per quarter, `remarks` and `general average`).
* Teacher
    * `Teachers` can see the subject grades of his/her students as well its remarks if it is *passed* or *failed*.
    * Theres a `Submit to evaluation` button to submit and evaluate the grades if the teacher is `homeroom`. If the teacher is a `subject` teacher, the button is labeled `Submit to homeroom` to be evaluated by the homeroom.

### Classes
* This is only for `teachers` that they can be able to see their students according by class and grade level.

### Records
* Teachers can `CREATE`, `READ`, `UPDATE` and `DELETE` tasks (*ex. teacher will create a quiz*)
* Teachers can also `UPDATE` student scores for each tasks created for them.

### Computations
* This is where the scores of students from each tasks are computed **automatically**.
* Teachers can see the **weight** of each tasks. (*ex. recitation is 5%*)
* If the current **weight** reaches 100%, the teacher can `submit` or `save` the computations.  This is to see each student's calculated subject grade on the **Grades tab**.

### Evaluation
* This page is only accesible by `Homeroom` teacher.
* The **Students Quarterly Average** route includes a `list` of students and their grades by subject.  It can be filtered by the `quarter`.
* The **Student General Average** route calculates subject grades quarterly and then outputs the `general average`.
    * There is a submit grades button, which will submit the students' **overall grades**. After submitting it, `students` can now view their `remarks` on each `subject` as well as their `general average`.

### Students & Teachers (Management)
* This page is only for `Admin`.
* The admin can `DELETE` the account of the registered `students` and `teachers`.
* There is also `filter` options to filter the `students` and `teachers`

<hr>

> **If you notice that some parts of it are not yet polished, it is my goal to demonstrate the extent of my knowledge and skills in React. I make it clear that this is only a demonstration and not a complete product. The logo and the name indicated on the system is provided by our instructor.**
