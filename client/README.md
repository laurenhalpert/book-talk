# Book Talk
## Overview
-Book Talk is a fullstack application utilizing React JS, Flask, and Python. Book Talk is a platform where users can make posts about a particular book and converse with each other through liking others' posts, creating a post of their own, or deleting a post they have made. A user can also add a book to "their books" for ease of access.
## The Set Up
-This application has been seeded using faker, random choice, and an array of genres self-made
-The front end consists of many React components written in JavaScript, and formik controlled forms
-The back end consists of models (models.py), seeding (seed.py), configuration (config.py), and routing (app.py)
    -The models are used to create tables in the database via flask migrations
        -each table is built from a class
        -each class inherits from db.Model and SerializerMixin
            -db.Model is imported from config.py
            -SerializerMixin aids with serialization and allows for the .to_dict() method to be used 
        -some classes use serialize_rules to prevent recursion errors
        -the classes are related using foreign keys, backrefs, and an association proxy
    -Seeding was done for ease of programming, debugging, and demonstration of how the app works
    -Configuration was set up to establish the location of the database, the secret key, metadata, CORS, and bcrypt
    -Routing establishes what actions the server takes when presented with different HTTP verbs and establishes endpoints for fetch requests
## Usage
### Home Page
-When a user first visits the site, they are taken to the homepage where they are presented with two options:
    -log in
    -sign up
-If a user enters valid credentials, they will be redirected to the user home page via programmatic navigation
-If a user enters invalid credentials, an alert will appear to inform them that they've used invalid credentials and to either enter valid credentials or sign up for an account
-If a user clicks on the "Sign Up" button, they will be redirected to the Sign Up page programmatically
### Sign Up Page
-Users see a sign up form where they will be prompted to enter:
    -a username
    -a password
    -a short bio
    -an image URL
-Upon submission of a new sign up, the user is redirected to the user home page via programmatic navigation
-There is also a "Home" button that, upon being clicked, will redirect the user to the Home Page
### User Home Page
-This page is only reachable if a user has entered valid credentials
-User is welcomed and has four options:
    =Book Index
    -My Book Index
    -Logout
    -Home
-If a user selects "Book Index" they will be taken to the Book Index Page programmatically
-If a user selects "My Book Index" they will be taken to the My Book Index Page programmatically
-If a user selects "Logout" they will be logged out and taken back to the Hoome Page
-If a user selects "Home" they will remain logged in but will be taken back to the Home Page
### Book Index
-A user can view a list of book cards where each book card has two options:
    -Add to My Books
        -Upon clicking, if the book is NOT already in My Book Index, the book will be added to My Book Index
        -if the book is already in My Book Index, it will not be added for a second time, and the user will be alerted that that book is already in the My Book Index
    -View Posts
        -Upon clicking, a user is redirected to a page dedicated to that book and its posts
            -The user will see all of the book info (title, author, genre, description, and book image) as well as posts that users have made regarding that particular book
                -Each post has a "like" button that shows how many likes each post has
                -If a post was made by the user that is currently logged in, they have the ability to delete that post (posts can only be deleted by the user who created them)
            -On this page, there is also a "Home" option, which, when clicked, redirects the user back to the home page while remaining logged in.
-At the bottom of the page, there is a form where a user can add a book to the book index by filling out each field and clicking submit
-On the Book Index page, there is also a "Home" option, which, when clicked, redirects the user back to the home page while remaining logged in.
### My Book Index
-A user can view books that they've placed in their "my books" for ease of viewing
-Each book shows up only as the book cover image
    -when the image is clicked, a user is redirected to a page dedicated to that book and its posts
         -The user will see all of the book info (title, author, genre, description, and book image) as well as posts that users have made regarding that particular book
                -Each post has a "like" button that shows how many likes each post has
                -If a post was made by the user that is currently logged in, they have the ability to delete that post (posts can only be deleted by the user who created them)
        -There is also a "Remove from My Books" button that, when clicked, removes the book from the My Book Index and redirects the user programmatically to the My Book Index
        -on this page, there is also a "Home" option, which, when clicked, redirects the user back to the home page while remaining logged in.
-On the My Book Index page, there is also a "Home" option, which, when clicked, redirects the user back to the home page while remaining logged in.
## GitHub URL
-https://github.com/laurenhalpert/book-talk
## Acknowledgements
-Background image: 'https://static.vecteezy.com/system/resources/thumbnails/002/305/052/small/real-grayscale-marble-texture-background-vector.jpg'
-Book Cover images from faker
## Contributing
-Not open to contributions at this time.
