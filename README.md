## Our Website
https://garden-time-info441.azurewebsites.net/

## Project Description 
Our proposed application is a productivity tool designed to cater to individuals who have multiple tasks to do and seek a seamless integration of daily activities with personal entertainment preferences. Our target audience is students, young professionals, and anyone who wants a personalized experience that enhances their productivity. These individuals are all people who seek a solution that helps them with managing their tasks effectively while also having elements that support their personal interests such as music and aesthetics.

We envision that the primary motivation these users will have to use our application is their desire to build an efficient daily routine. With features like task management, a pomodoro timer for focused work sessions, and direct integration with Spotify for music playback, our application aims to fulfill any and all our users' needs.

Our motivation for creating such an application comes from our observation that while there are numerous tools that do all of these things individually, there are very few, if any, applications that offer a unified platform. Currently, users have to switch between multiple different applications and this can disrupt focus and reduce efficiency.

As developers, who are students ourselves, we understand the need that our target audience has when it comes to managing their busy schedules and meeting deadlines effectively. Therefore, our motivation for creating this application stems from the fact that we believe we can design and build an application that not only meets these diverse needs but also exceeds expectations by offering a level of integration and personalization not currently available in the market. We plan to leverage our personal experiences and understanding of the challenges our users might face to create a central hub for productivity and enjoyment that is not just a tool but a companion for our users in their pursuit of productivity and personal fulfillment. 

## Technical Description

![architectual diagram1](./architectural_diagram/Screenshot%202024-02-08%20at%2012.51.25 PM.png)
![architectual diagram2](./architectural_diagram/Screenshot%202024-02-08%20at%2012.51.41 PM.png)
![architectual diagram3](./architectural_diagram/Screenshot%202024-02-08%20at%2012.51.53 PM.png)



| Priority | User                  | Description                                                                                                      | Technical Implementation                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------|-----------------------|------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| P0       | Microsoft Authentication | I need to log into my account to retrieve and interact with my personalized settings and tasks.                  | Technical Implementation: Use Microsoft’s authentication API to allow the user to securely sign in to their account.                                                                                                                                                                                                                                                                                                    |
| P0       | Authenticated User      | I need to log into my account to retrieve and interact with my personalized settings and tasks.                  | Technical Implementation: Use a front-end framework like React for dynamic UI updates and a back-end database like MongoDB to store user tasks. CRUD operations will be implemented via RESTful API endpoints, allowing users to see their to-do list in real-time.                                                                                                                                                    |
| P0       | Busy Individual         | I want to see all of the tasks I have by adding them to a list                                                   | Technical Implementation: Use a front-end framework to enable the user to input tasks, and a back-end database like MongoDB to store tasks specific to each user.                                                                                                                                                                                                                                                      |
| P1       | Google Authentication   | I need to log into my account to retrieve and interact with my personalized settings and tasks.                  | Technical Implementation: Use google authentication api to allow user to log in with personal information: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow                                                                                                                                                                                                                             |
| P1       | Canvas Authentication   | I need to log into my account to retrieve and interact with my personalized settings and tasks.                  | Technical Implementation: Use Canvas authentication API to allow the user to securely sign into their account and retrieve current tasks. https://canvas.instructure.com/doc/api/                                                                                                                                                                                                                                      |
| P1       | Organized Individual    | I aim to manage my tasks efficiently through editing, and deleting options in the to-do list.                    | Technical Implementation: Utilize React for dynamic user interface interactions and MongoDB to store user tasks, supporting real-time CRUD operations via RESTful APIs.                                                                                                                                                                                                                                                |
| P1       | Focused Worker          | I seek to use an interval timer to effectively alternate between work and break periods.                         | Technical Implementation: Use JavaScript for timer mechanics, offering start, pause, and reset capabilities, with live updates on the user interface for timer states.                                                                                                                                                                                                                                                 |
| P1       | Music Lover             | I desire to integrate my Spotify account for music playback directly within the app.                             | Technical Implementation: Utilize Spotify's Web API to fetch and store user's favorite playlists in the database linked to their account. Provide a feature in the app's UI for users to view and select their stored playlists for playback. https://developer.spotify.com/documentation/web-api/concepts/api-calls                                                                                                      |
| P1       | Security-Conscious User | I want to log out to protect my account information when not actively using the app.                             | Technical Implementation: Create a logout feature that securely invalidates the current session or JWT, clearing cookies or tokens as necessary.                                                                                                                                                                                                                                                                        |
| P2       | Customizer              | I prefer to personalize the duration of work and break intervals according to my needs.                          | Technical Implementation: Offer a customizable settings page for duration adjustments, storing these preferences in the database or local storage linked to the user's account.                                                                                                                                                                                                                                         |
| P2       | Time-Aware Individual   | I wish to receive timely notifications to transition smoothly between breaks and work sessions.                  | Technical Implementation: Implement a reminder system that sends notifications via email or SMS using third-party APIs like Twilio or SendGrid. This will require storing reminder times in the database and scheduling a background job to send notifications at the right time.                                                                                                                                       |
| P2       | Group project member    | I want to share my todo list with people in my group project and people in the same group and all modify the todo list and crossed off the task when finished | Technical Implementation: Option1: Working with the canvas api to assign people into groups and then create a new collection group in the mongoDB to store all userId for specific groups. Option 2: In the front-end, we will allow the user to input all people in a group, we then take that information and store them into the mongoDB.                                                                            |




## Additionally include:
Include a list of available endpoints your application will provide and what is the purpose it serves. Ex. GET /driver/{id}, POST "/driver/{id}/rating"
- GET /User/
- POST /User
- GET /task
- POST /task
- POST /login
- POST /logout
- DELETE/task
- DELETE/User

Include any database schemas as an appendix
- User
- Google sign-in
- Microsoft sign-in
- Canvas sign-in
- TodoList
- Tasks
- Shared tasks, users shared with

## UI Design: 
[Link to Wireframe](https://www.figma.com/file/W9dwlnPnFAYbcT6JAsLNe7/Wireframing-and-prototyping?type=design&node-id=38%3A4&mode=design&t=6So2WMB5oWXSLyg5-1)
