![Alt text](/public/images/LOGOwText.png)
##### Uplift is a web application to help users with serious medical conditions manage large amounts information regarding their illness.

### Development Approach

We began by whiteboarding and outlining what our app was going to include. Once we outlined what the page should do and what it should contain, we divided up our work. We decided we could each focus on the database models, the routes we would build and the design of the page. Once the page was built all in a single list-like format we jQueried the app until everything moved and interacted in the desired ways. Here are some examples of our planning process:

![Placeholder](/public/images/brokenlink.jpg)


---

### User Stories

- As a user, I want to have access to a database of medical conditions. By selecting a medical condition, I want to be able to view more information about the illness that I have.

![Illness Modal](/public/images/illness-modal.jpg)


- Users are able to input any medical condition and learn about the symptoms, cures, and history related..


- As a user, I want to be able to create an account where I can input information regarding my upcoming appointments, my medication, and my dietary restrictions.

![Splash page](/public/images/home-screen.png)

- Users can sign up and create a profile that will hold all of the information regarding their illness. Users can add and remove appointments, restrictions, or medications based on their doctors recommendations. All of their information is displayed and rendered on their profile page, making it simple for users to manage particulars

![Appointments](/public/images/appointments.jpg)

- Users can access a sidebar at any point that provides a navigational system. The User can choose click on a designated field, whether it be appointments, medication or dietary restrictions, and add information.  

---

### URL

https://safe-chamber-85748.herokuapp.com/

---

### Technologies

* NodeJS - Package manager used to serve our site
* Express - JS framework which utilizes node to run server side code and allows the routing of our page.
* MongoDB - NoSQL database using JSON objects.
* JavaScript/jQuery - Almost all code was written in JavaScript while jQuery was used for DOM manipulation, i.e. to show different panels or modals on the web app.
* Bootstrap - CSS framework used for the basic styling and structure of the panels and forms.

---

### Installation Instructions for Dependencies
##### Our app requires the following dependencies which we installed using the Node Package Manager

* BCryptJS - Used for safely storing and hashing private information like passwords.
* BodyParser - Used for
* Express - The main dependency of the project, our application is built in express.
* Cookie - Used for authentication and the storage of tokens in a cookie.
* EJS - for viewing HTML pages embedded with Javascript.
* Mongoose - used to create our data schema in the models.
* Morgan - a middleware used for verbose statuses on our server side console.
* Request - used for making XML AJAX requests to a 3rd Party API.
* XML2JS - a plugin used to translate our XML formatted API into a JSON object we were more easily able to consume.


---

### Unsolved Problems and Challenges

* Uplift 2.0 would include a refactoring and modularization of our models. This would allow our data creation and storage to be simplified and would improve scalability.
