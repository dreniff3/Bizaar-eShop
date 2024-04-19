# Bizaar eShop

https://bizaar-eshop.onrender.com/

## Description
An eCommerce shop built using the MERN stack along with Redux Toolkit, based largely on [Brad Traversy's eCommerce App](https://github.com/bradtraversy/proshop-v2). This project was originally made for an *Intro to Software Engineering* course at Oregon State University, with the intention of creating a more robust project using the **Agile** project management methodology. The Bizaar eShop connects to my [Email Notification Microservice](https://github.com/dreniff3/osu-cs361-microservice) to send e-mail receipts to users who successfully pay for a completed order.  

Redux is a pattern and library for managing state needed across many parts of a larger application. I used it to manage the "global" state of this project because, by necessity, an eCommerce application, which has a medium to large sized codebase, required that large amounts of state be needed in several places across the application, with that state being updated frequently. For this project, I specifically used the React-Redux package, which lets React components to interact with a [Redux store](https://github.com/dreniff3/Bizaar-eShop/blob/main/frontend/src/store.js) by reading pieces of state and dispatching actions to update that store. The alternative way to share the same state across multiple components is to lift that state up to parent components. Redux gives developers a centralized place to contain and access that "global" state.

The Basics of Redux:

1. create Redux store: this is where application state is *stored*
2. UI components access state from the store and renders based on that
3. a User causes a change to happen: the app (via a component) dispatches an action (a JS object that is an "event", describing something that happened in the app) to the Redux store
4. the store notifies the part of the UI attached to that updated state

The Redux Workflow:

![Redux Workflow](https://redux.js.org/assets/images/one-way-data-flow-04fe46332c1ccb3497ecb04b94e55b97.png)

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
