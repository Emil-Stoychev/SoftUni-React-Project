# Online Shop
This is my final exam for softuni react project defence
For this project i used **React** for client and **Express** for backend.

## Backend API Documentation
This is the API documentation where you will be able to find information on all the endpoints for the "*Online Shop*" project.
For data base i used [MongoDB](https://www.mongodb.com/) 

## Used dependencies:
- Express
- Mongoose
- bcrypt
- jsonwebtoken
- cors
- cookie-parser

### Instalation and start server in server folder:

### To install all dependencies
```bash
npm i
```

### To start server
```bash
npm start
```

The base URL is: **localhost:3030/** and depending on what you need, there are different paths.
There are 2 different main paths, which are:
-  **baseURL/users**
-  **baseURL/catalog**

## Auth Service

### Authentication

If there is an error with token, the service will respond with ```{ message: "Invalid access token!" }```

#
- [x] **REGISTER**

Create a new user by sending a ```POST``` request to ```/users/register``` with properties ```email```, ```password```, ```repeat password``` and upload a ```profile picture```. Then you can log in!

> Example
```
{
  "email": "asd@abv.bg",
  "password": "123456",
  "rePassword": "123456",
  "image": "Your upload image here!"
}
```
**NOTE:** The image should be upload аnd the client will automatically convert it to base64, the server doesn't work URL!

**NOTE:** If the email is already exist, the service will respond with ```{ message: "Email already exist!" }```
#
- [x] **LOGIN**

Login by sending a ```POST``` request with ```email``` and ```password``` to ```/users/login```. The service will respond with an object, containing a standard string ```token```, that can be used for requests.

> Example
```
{
  "email": "asd@abv.bg",
  "password": "123456",
}
```

**NOTE:** If email or password is incorrect, the service will respond with ```{ message: "Email or password don't match!" }```
#
- [x] **To get user**

To get user just send ```GET``` request with ```userId``` to ```/users/:userId```. The service will respond with all information about the current user!

> Example
```
/users/62e90e2e061f1a3c90bab962
```

**NOTE:** If there is no user, the service will respond with ```{ message: "User doesn't exist!" }```
#
- [x] **To get own products**

To get all own products for current user, send ```GET``` request with ```userId``` to ```/users/ownProducts/:userId```

> Example
```
/users/ownProducts/62e90e2e061f1a3c90bab962
```

**NOTE:** If there is no products for this user, the service will respond with ```{ message: "Empty" }```
#
- [x] **To get all liked products**

To get all liked products for current user, send ```GET``` request with ```userId``` to ```/users/likedProducts/:userId```

> Example
```
/users/likedProducts/62e90e2e061f1a3c90bab962
```

**NOTE:** If there is no liked products for this user or userId is incorrect, the service will respond with ```{ message: "Empty" }```
#
- [x] **To get all messages**

To get all messages for current user, send ```GET``` request with ```userId``` to ```/users/messages/:userId```

> Example
```
/users/messages/62e90e2e061f1a3c90bab962
```

**NOTE:** If there is no messages for this user, the service will respond with ```{ message: "Empty" }```
#
- [x] **To delete product from user**

To delete product from current user, send ```PUT``` requst with ```userId``` to ```/users/deleteItem/:userId```

And the body must contain an object with ```token```, ```productId``` and ```nameOfProduct```

> Example
```
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmU5MG...",
  productId: "62ed3808d128d37c6f91bf02",
  nameOfProduct: "Souvenir"
}
```

**NOTE:** This will delete all information about product and comments inside
#
- [x] **To buy a new product**

- First:

You must send a 
