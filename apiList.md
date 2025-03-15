# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/status/:requestId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on plateform 

Status: ignore, intrested, accepted, rejected

# Group all the APIs and create a different router or group multiple routes in a different respective routers.

# whenever you are working on a large project in that case list down all the APIs Group them together and start writting code.


# Pagination
- /feed?page = 1&limit=10 => first 10 users 1-10  => .skip(0) & limit(10)
- /feed?page = 1&limit=10 => 11-20
- /feed?page = 1&limit=10 => 21-30

# two very important function that is "skip()" & "limit()".
- limit : how many document do you want 
- skip: how many document do you skip from the first

- skip = (page-1)*limit;
