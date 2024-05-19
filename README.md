# Bizaar eShop
 
![logo](https://github.com/dreniff3/Bizaar-eShop/assets/85808475/9427443d-da6f-4bb0-9e11-d88c28878c21)

https://bizaar-eshop.onrender.com/

![Bizaar eShop Homepage](https://github.com/dreniff3/Bizaar-eShop/assets/85808475/9ad27288-f6a1-421a-a629-0534a8e85d0e)

## Description
An eCommerce shop built using the MERN stack along with Redux Toolkit, based largely on [Brad Traversy's eCommerce App](https://github.com/bradtraversy/proshop-v2). This project was originally made for an *Intro to Software Engineering* course at Oregon State University, with the intention of creating a more robust project using the **Agile** project management methodology. The Bizaar eShop connects to my [Email Notification Microservice](https://github.com/dreniff3/osu-cs361-microservice) to send e-mail receipts to users who successfully pay for a completed order.  

Redux is a pattern and library for managing state needed across many parts of a larger application. I used it to manage the "global" state of this project because, by necessity, an eCommerce application, which has a medium to large sized codebase, required that large amounts of state be needed in several places across the application, with that state being updated frequently. For this project, I specifically used the React-Redux package, which lets React components to interact with a [Redux store](https://github.com/dreniff3/Bizaar-eShop/blob/main/frontend/src/store.js) by reading pieces of state and dispatching actions to update that store. The alternative way to share the same state across multiple components is to lift that state up to parent components. Redux gives developers a centralized place to contain and access that "global" state.

For more information on Redux: https://www.reacttutorial.com/redux-state-management

### Features
**Users**
- Create account
- Log into account
- Edit profile
- Search products
- Post reviews
- Add items to cart
- Purchase orders

**Admin**
- Edit products
- Manage user profiles
- Mark orders as delivered

## Technology Used
- MongoDB
- Express.js
- React
- Node.js
- Redux Toolkit
- Bootstrap
