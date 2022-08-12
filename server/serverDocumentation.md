# Backend API Documentation
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
- [x] **Delete user account**

To delete your user account you should send ```DELETE``` request with ```userId``` to ```/users/deleteAccount/:userId```

And the body must contain only ```cookie```

> Example
```
{
  cookie: "Your cookie info here"
}
```

**POSSIBLE ERRORS:** ```Invalid Access Token```, ```User doesn't exist!``` and ```You cannot delete this account!```
#
- [x] **Change message status**

To change your message status you should send ```PUT``` request with ```messageId``` to ```/users/messages/:messageId/changeStatus```

And the body must contain only ```token```

> Example
```
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2..."
}
```

**POSSIBLE ERRORS:** ```Invalid Access Token```, ```User not found!``` and ```You cannot delete this account!```
#
- [x] **Change user profile picture**

To change your profile picture you should send ```PUT``` request with ```userId``` to ```/users/changePicture/:userId```

The body must contain object with ```image``` (convertered to base64) and ```cookie```

> Example
```
{
  image: "Your convertered image info here",
  cookie: "Your cookie here"
}
```

**POSSIBLE ERRORS:** ```Invalid Access Token```, ```User not found!```

## Product Service
- [x] **To delete product**

To delete product, send ```DELETE``` requst with ```productId``` to ```/catalog/delete/:productId```

And the body must contain an object with ```cookie```

> Example
```
{
  cookie: "Cookie information here...",
}
```

**NOTE:** This will delete all information about product and comments inside and from user!
**POSSIBLE ERRORS:** ```Invalid Access Token```, ```User doesn't exist!```, ```Product not found!```, ```You cannot change this product!``` and ```Error with update, please try again later!```
#
- [x] **To buy a new product**

To buy a new product you must have enough money, then you can send ```PUT``` request with ```productId``` to ```/catalog/changeProductAuthor/:productId```

And the body must cointain an object with ```cookie```

> Example
```
{
  cookie: "Cookie information here...",
}
```

**POSSIBLE ERRORS:** ```Invalid Access Token```, ```User doesn't exist!```, ```Product owner doesn't exist!```,  ```Product not found!``` and ```Error with update, please try again later!```
#
- [x] **To create a new product**

To create a new product you should send ```post``` request to ```/catalog/create```

And the body must contain object with ```values``` and ```cookie```

> Example
```
{
  title: "Test title",
  description: "Some desc here",
  images: [Your upload images here],
  category: "Accessory",
  price: "12",
}
```

**NOTE:** The images should be upload аnd the client will automatically convert it to base64, the server doesn't work URL!
**POSSIBLE ERRORS:** ```Invalid Access Token```, ```User doesn't exist!``` or some of values can be incorrect!
#
- [x] **Get all products**

To get all products you should send a ```GET``` request to ```/catalog```

**POSSIBLE ERRORS:** ```Empty```
#
- [x] **Details product**

To get details product you should send ```GET``` request with ```productId``` to ```/catalog/details/productId```

**POSSIBLE ERRORS:** ```Product not found``` or ```404 not found```
#
- [x] **Edit product**

To edit current product you should send ```PUT``` request with ```productId``` to ```/catalog/edit/:productId```

And the body must contain object with ```productId```, ```productValues``` and ```cookie```

> Example
```
{
  cookie: {_id: '62e90e2e061f1a3c90bab962', email: 'admin@abv.bg'...}
  productId: "62f516b20bfbbb934adefe34"
  productValues: {_id: '62f516b20bfbbb934adefe34', title: 'Test title', description: 'Some desc here', images: Array(Your images), category: 'Accessory'...}
}
```

**POSSIBLE ERRORS:** ```Invalid access token```, ```User not found!```, ```Product not found / 404 not found!``` and ```You cannot change this product!```
#
- [x] **Like product**

To like product you should send a ```PUT``` request with ```productId``` to ```/catalog/addProductLikes/:productId```

And the body must contain object with ```productId```, ```userId``` and ```token```

> Example
```
{
  productId: "62e90e2e061f1a3c9222162",
  userId: "62e90e2e061f1a3c90bab962",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2..."
}
```

**POSSIBLE ERRORS:** ```Invalid access token```, ```User doesn't exist!```, ```Product not found / 404 not found!``` and ```You cannot like this product!```
#
- [x] **Unlike product**

To unlike product you should send a ```PUT``` request with ```productId``` to ```/catalog/removeProductLikes/:productId```

And the body must contain object with ```productId```, ```userId``` and ```token```

> Example
```
{
  productId: "62e90e2e061f1a3c9222162",
  userId: "62e90e2e061f1a3c90bab962",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2..."
}
```

**POSSIBLE ERRORS:** ```Invalid access token```, ```User doesn't exist!```, ```Product not found / 404 not found!``` and ```You cannot unlike this product!```
#
- [x] **Add comment to product**

To add comment to product you should send a ```POST``` request to ```/catalog/addComment```

And the body must contain an object with ```email```, ```title```, ```authorId```, ```productId``` and ```token```

> Example
```
{
  email: "admin@abv.bg",
  title: "Some title here",
  authorId: "62e90e2e061f1a3c90bab962",
  productId: "62e90e2e061f1a3c90bab962",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2..."
}
```

**POSSIBLE ERRORS:** ```Invalid access token```, ```User doesn't exist!``` and ```Product not found!```
#
- [x] **Edit comment/nested comment**

To edit current comment you should send ```PUT``` request with ```commentId``` to ```/catalog/editComment/:commentId```

The body must contain object with ```commentValue```, ```cookie``` and ```commentId```

> Example
```
{
  commentValue: "Some value here",
  cookie: "Your cookie info here",
  commentId: "62e90e2e061f1a3c90bab962"
}
```

**POSSIBLE ERRORS:** ```Invalid access token```, ```This comment doesn't exist!``` and ```You cannot change this comment!```
#
- [x] **Like/Unlike comment/nested comment**

To like/unlike current comment you should send ```PUT``` request with ```commentId``` to ```/catalog/likeComment/:commentId```

The body must contain object only with ```cookie```

> Example
```
{
  cookie: "Your cookie info here",
}
```

**POSSIBLE ERRORS:** ```Invalid access token```, ```This comment doesn't exist!``` and ```You cannot like/unlike this comment!```
#
- [x] **Delete comment**

To delete current comment you should send ```DELETE``` request with ```commentId``` to ```/catalog/deleteComment/:commentId```

And the body must contain only ```cookie```

> Example
```
{
  cookie: "Your cookie info here",
}
```

**POSSIBLE ERRORS:** ```Invalid access token```, ```This comment doesn't exist!``` and ```You cannot delete this comment!```
#
- [x] **Reply to comment**

To add reply to comment you should send ```PUT``` request with ```commentId``` to ```/catalog/addReplyComment/:commentId```

And the body must contain object with ```cookie```, ```commentId``` and ```commentValue```

> Example
```
{
  cookie: "Your cookie info here",
  commentId: "62e90e2e061f1a3c90bab962",
  commentValue: "some value here"
}
```

**POSSIBLE ERRORS:** ```Invalid access token```, ```This comment doesn't exist!```
#
- [x] **Delete nested comment**

To delete nested comment you should send ```DELETE``` request with ```commentId``` to ```/catalog/deleteNestedComment/:commentId```

And the body must contain object with ```cookie```, ```nestedCommentId``` and ```parentId``` (parent comment id)

> Example
```
{
  nestedCommentId: "62e90e2e061f1a3c90bab962",
  cookie: "Your cookie info here",
  parentId: "62e90e2e061f1a3c90bab962"
}
```

**POSSIBLE ERRORS:** ```Invalid access token```, ```This comment doesn't exist!``` and ```You cannot delete this comment!```
