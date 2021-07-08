# Well with waves frontend

## To change the papi url resource is in config/backEntryPoint.js

## In this project we have following elements : 
1. JWT Authentication Flow for User Signup & User Login
2. Project Structure for React JWT Authentication (without Redux) with LocalStorage, React Router & Axios
3. Creating React Components with Form Validation
4. React Components for accessing protected Resources (Authorization)
5. Dynamic Navigation Bar in React App

#User Registration and User Login Flow
For JWT Authentication, we’re gonna call 2 endpoints:

POST api/auth/signup for User Registration
POST api/auth/signin for User Login
The following flow shows you an overview of Requests and Responses that React Client will make or receive. This React Client must add a JWT to HTTP Header before sending request to protected resources.

# Run docker
docker-compose up -d --build

