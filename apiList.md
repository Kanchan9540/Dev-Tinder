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
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on plateform 

Status: ignore, intrested, accepted, rejected

# Group all the APIs and create a different router or group multiple routes in a different respective routers.

# whenever you are working on a large project in that case list down all the APIs Group them together and start writting code.