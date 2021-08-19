

Eteration Bootcamp 2021 - Team 6 

----

# Movieration

- #### Back-end Live On [heroku](https://movieration.herokuapp.com)

- #### Front-end Live On [netlify](https://movieration.netlify.app)

----

## Team Members

| Role               | Name                                               |
| ------------------ | -------------------------------------------------- |
| Frontend Developer | [Şükran Öğüdücü](https://github.com/sukranoguducu) |
| Frontend Developer | [Fatih Aykut](https://github.com/FAykut1)          |
| Backend Developer  | [Berke Oğuz](https://github.com/BerkeOguz)         |
| Backend Developer  | [Furkan Şahin](https://github.com/furk2sahin)      |

----

Movieration is a web app that users can rate, comment, add watched list and sort movies by category and mood. 

### Main Features

- Users can create an account and login with it.
- Users can list movies.
- Users can rate and comment movies.
- Users can add movies to their Watched Movies list.
- Users can upload a photo with their own face and Movieration sorts movies by mood! 

- Admin can delete user comments.
- Admin can add new movies.
- Admin can delete movies.
- Admin can ban a user.

----

## Used Technologies

- Java 8
- Spring Boot
- Spring Web
- Spring Security
- Maven
- Jpa / Hibernate
- PostgreSQL
- MapStruct

- Swagger UI
- Cloudinary
- Amazon Rekognition
- React.js
- Semantic UI
- Font Awesome React

----

# API Endpoints

#### User Controller
| Route                                                        | HTTP Verb | POST Body        | Description           |
| ------------------------------------------------------------ | --------- | ---------------- | --------------------- |
| http://localhost:8080/api/users/add                          | `POST`    | userDto          | Create User           |
| http://localhost:8080/api/users/getAll                       | `GET`     | Empty            | Get All Users         |
| http://localhost:8080/api/users/delete/{userId}              | `DELETE`  | userId           | Delete User by userId |
| http://localhost:8080/api/users/ban/{userId}                 | `PUT`     | userId           | Ban User by userId    |
| http://localhost:8080/api/users/unban/{userId}               | `PUT`     | userId           | Unban User by userId  |
| http://localhost:8080/api/users/changePassword/{userId}/{password} | `PUT`     | userId, password | Change user password  |



#### Movie Controller

| Route                                                        | HTTP Verb | POST Body  | Description              |
| ------------------------------------------------------------ | --------- | ---------- | ------------------------ |
| http://localhost:8080/api/movies/add                         | `POST`    | movieDto   | Add Movie                |
| http://localhost:8080/api/movies/getAll                      | `GET`     | Empty      | Get All Movies           |
| http://localhost:8080/api/movies/delete/{movieId}            | `DELETE`  | movieId    | Delete Movie by movieId  |
| http://localhost:8080/api/movies/findById/{movieId}          | `GET`     | movieId    | Get Movie by movieId     |
| http://localhost:8080/api/movies/findByName/{name}           | `GET`     | name       | Get Movie by name        |
| http://localhost:8080/api/movies/findByCategoryId/{categoryId} | `GET`     | categoryId | Get Movies by categoryId |
| http://localhost:8080/api/movies/findByEmotionId/{emotionId} | `GET`     | emotionId  | Get Movies by emotionId  |



#### User Review Controller

| Route                                                        | HTTP Verb | POST Body     | Description                    |
| ------------------------------------------------------------ | --------- | ------------- | ------------------------------ |
| http://localhost:8080/api/userReviews/add                    | `POST`    | userReviewDto | Add User Review                |
| http://localhost:8080/api/userReviews/getAll                 | `GET`     | Empty         | Get All User Reviews           |
| http://localhost:8080/api/userReviews/delete/{reviewId}      | `DELETE`  | reviewId      | Delete User Review by reviewId |
| http://localhost:8080/api/userReviews/findByMovieId/{movieId} | `GET`     | movieId       | Get User Reviews by movieId    |
| http://localhost:8080/api/userReviews/findByUserId/{userId}  | `GET`     | userId        | Get User Review by User Id     |



#### User Watched Movie Controller

| Route                                                        | HTTP Verb | POST Body     | Description                      |
| ------------------------------------------------------------ | --------- | ------------- | -------------------------------- |
| http://localhost:8080/api/userWatchedMovies/add              | `POST`    | userReviewDto | Add User Watched Movie           |
| http://localhost:8080/api/userWatchedMovies/getAll           | `GET`     | Empty         | Get All User Watched Movies      |
| http://localhost:8080/api/userWatchedMovies/delete/{id}      | `DELETE`  | id            | Delete User Watched Movie by id  |
| http://localhost:8080/api/userWatchedMovies/findById/{id}    | `GET`     | id            | Get User Watched Movie by id     |
| http://localhost:8080/api/userWatchedMovies/findByUserId/{userId} | `GET`     | userId        | Get User Watched Movie by userId |



#### Category Controller

| Route                                       | HTTP Verb | POST Body | Description        |
| ------------------------------------------- | --------- | --------- | ------------------ |
| http://localhost:8080/api/categories/getAll | `GET`     | Empty     | Get All categories |



#### Emotion Controller

| Route                                     | HTTP Verb | POST Body | Description      |
| ----------------------------------------- | --------- | --------- | ---------------- |
| http://localhost:8080/api/emotions/getAll | `GET`     | Empty     | Get All emotions |



#### Authentication Controller

| Route                                | HTTP Verb | POST Body | Description |
| ------------------------------------ | --------- | --------- | ----------- |
| http://localhost:8080/api/auth/login | `POST`    | userDto   | Login       |



#### Amazon Rekognition Controller

| Route                                          | HTTP Verb | POST Body | Description  |
| ---------------------------------------------- | --------- | --------- | ------------ |
| http://localhost:8080/api/rekognition/emotions | `POST`    | image     | Get emotions |
