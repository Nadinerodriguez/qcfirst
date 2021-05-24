# qcfirst

<p><a href="https://qcfirst.danielrodrigu21.repl.co">Click Me! QCFirst</a> Or go to https://qcfirst.danielrodrigu21.repl.co</p>

## Name of Contributors
- Daniel Rodriguez (Github: Danielbrod01)
- Nadine Rodriguez (Github: Nadinerodriguez)

## Contributions
Daniel Rodriguez
- Visual Design: Designed the sign up, login, homepage, and manage courses pages on Figma.
- HTML: I wrote the navbar and the entire HTML code for the sign up, log in, and homepage pages.
- CSS: I styled the sign up, login, course planner, course enrollment, and manage courses pages.
- Back End: Researched on what best technologies to use for the backend such as Firebase, Node.js, Express.js, MySQL and MongoDB. I set up the various routings in the Node and Express server to serve all our web documents. Implemented a simple authentication router to check if the email already exists in the database before deciding whether to insert that new entry into the database. Implemented another authentication router to check if the email and password provided on the login form matches an entry in the database. Implemented a simple session to only allow those in logged in session to navigate around and use the application. Added a check to only allow faculty to access the 'manage courses' page

Nadine Rodriguez
- Visual Design: Designed the course search, course planner, and course enrollment pages on Figma.
- Front End:
  - HTML: I worked on the footer and the entire HTML code for the course search, course planner, course enrollment, and manage courses page. Fixed minor errors on all of the HTML pages.
  - CSS: I styled the navbar, footer, homepage and course search page.
  - JavaScript: Using JS, I was able to get the data from the API / server-side to display and inject in our HTML pages.
- Back End: Researched on what best technologies to use for the backend such as Firebase, Node.js, and Express.js. Tried using Firebase's Authentication for the Sign Up and Login pages but later decided with my partner that his solution was the best approach in the long run. I set up the MySQL database. I designed and created the various tables we needed to store information about the users and courses. I also wrote several test and edge cases for all of our pages .
  - UML Diagram: <img src="/public/images/UML.png" /><br />

## List of features of our app (With Links)
- You can sign in to either a student or faculty user
- You can sign up as a student or faculty. A user needs to provide their first name, last name, email and set a password to sign up for an account.
- As a Student you can:
  - View your schedule (courses you are currently enrolled to)
    - <a href="https://qcfirst.danielrodrigu21.repl.co">Schedule Feature</a>
  - View and search for offered courses
    - <a href="https://qcfirst.danielrodrigu21.repl.co">Search feature</a>
  - Add a course to your planner/cart
  - Enroll for a course
  - Drop a course you are enrolled
  - Remove a course in your planner/cart
- As an Instructor you can:
  - Create and delete a course
    - <a href="https://qcfirst.danielrodrigu21.repl.co">Create and delete feature</a>
  - View and search for offered courses
    - <a href="https://qcfirst.danielrodrigu21.repl.co">Search feature</a>
  - View the courses they are teaching
    - <a href="https://qcfirst.danielrodrigu21.repl.co">Courses they're teaching feature</a>
  - View the roster of students enrolled to their courses
    - <a href="https://qcfirst.danielrodrigu21.repl.co"> Roster feature</a>

## Choice of front-end / client-side technologies
- We decided to stick to the basic HTML, CSS, and JavaScript. We just chose JavaScript as it's a powerful tool that allowed us to build UI components. We didn't use a framework as we had a time restriction and we felt that we were most comfortable in just using plain JavaScript.

## Choice of back-end / server-side technologies
- Node.js/Express: We felt that Node.js was an ideal choice as we had the ability to execute similar code on both the client and server side. It was easier to send data between the server and client side. Node.js also had a great framework and libraries which made our project slightly easier to work with. It allowed us to construct an API and to implement interaction with existing applications.

## Choice of database management system
- MySQL: We were more comfortable in using MySQL and decided to use this instead of MongoDB. Also because it's an open source database. Furthermore, MySQL offers great security features that ensure data protection. This is important because we're storing sensitive information such as passwords and a user's ID. It's the most secure and reliable database management system. The roles/users can be defined with a list of permissions that can be granted or revoked for the user. It can also run on various platforms. Lastly, it uses SQL which is the standard language choice for modern database system.

## Visual Designs using Figma
<a href="https://github.com/Nadinerodriguez/qcfirst/tree/main/VisualDesigns">Link to our visual designs</a>
<br/>

## A summary of any differences between our visual designs and final outcome
- In our Visual Designs, we initially wanted the form in our sign up and log in pages to be on the right side of the page. But for the final outcome, we decided to just put the form in the center of the page. We also removed the "table" for our schedule in our final outcome. Instead of a table, we have the courses listed in rows. We also decided to remove the advanced search feature as users can just type their "specific" course in the search bar.

## Visual Designs using Figma
**Sign Up/Log In Page**
- Students and Faculties can sign up using their QCfirst email addresses.
- To sign up, the user needs to provide a username, password, and their first and last names.
- A user can only log in when they provide these information

<img src="/VisualDesigns/desktop/signup(desktop).png" /><br />
<img src="/VisualDesigns/tablet/signup(tablet).png" /><br />
<img src="/VisualDesigns/mobile/signup(mobile).png" /><br />

**Log In Page**
- Students and Faculties can sign in using their QCfirst email addresses.
- To sign up, the user needs to provide a username and password
- A user can only log in when they provide these information

<img src="/VisualDesigns/desktop/login(desktop).png" /><br />
<img src="/VisualDesigns/tablet/login(tablet).png" /><br />
<img src="/VisualDesigns/mobile/login(mobile).png" /><br />

**Home Page**
- A student’s schedule and any other important information such as announcements and enrollment date will be displayed on the homepage.

<img src="/VisualDesigns/desktop/homepage(desktop).png" /><br />
<img src="/VisualDesigns/tablet/homepage(tablet).png" /><br />
<img src="/VisualDesigns/mobile/homepage(mobile).png" /><br />

**Course Search Page**
- Students can look for courses they are interested in this page. They can either use the search for a specific course or use the search filter feature.
- Once a student searches for a class, the results will be displayed. They can either add it to their planner, enroll for the course or just browse through them.

<img src="/VisualDesigns/desktop/course-search(desktop).png" /><br />
<img src="/VisualDesigns/tablet/course-search(tablet).png" /><br />
<img src="/VisualDesigns/mobile/course-search(mobile).png" /><br />

**Course Planner Page**
- A potential schedule is shown in this page where a darker red box would indicate the courses a student is currently enrolled too, while a pink box would show it’s planned courses if the checkbox is clicked.
- When a user clicks the manage button or the enroll button, it will redirect them to the course enrollment page

<img src="/VisualDesigns/desktop/course-planner(desktop).png" /><br />
<img src="/VisualDesigns/tablet/course-planner(tablet).png" /><br />
<img src="/VisualDesigns/mobile/course-planner(mobile).png" /><br />

**Course Enrollment Page**
- A student can drop a course they are enrolled to.
- A student can also remove, swap or enroll to a class.

<img src="/VisualDesigns/desktop/courses-enrollment(desktop).png" /><br />
<img src="/VisualDesigns/tablet/course-enrollment(tablet).png" /><br />
<img src="/VisualDesigns/mobile/course-enrollment(mobile).png" /><br />

**Manage Courses Page**
- This page could only be accessed if you signed in as a faculty.
- An instructor can delete and create a course

<img src="/VisualDesigns/desktop/manage-course(desktop).png" /><br />
<img src="/VisualDesigns/tablet/manage-course(tablet).png" /><br />
<img src="/VisualDesigns/mobile/manage-course(mobile).png" /><br />
