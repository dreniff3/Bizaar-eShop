# Bizaar eShop

https://bizaar-eshop.onrender.com/

## Description
An eCommerce shop built using the MERN stack along with Redux Toolkit, based largely on [Brad Traversy's eCommerce App](https://github.com/bradtraversy/proshop-v2). This project was originally made for an *Intro to Software Engineering* course at Oregon State University, with the intention of creating a more robust project using the **Agile** project management methodology. The Bizaar eShop connects to my [Email Notification Microservice](https://github.com/dreniff3/osu-cs361-microservice) to send e-mail receipts to users who successfully pay for a completed order.  

Redux is a pattern and library for managing state needed across many parts of a larger application. I used it to manage the "global" state of this project because, by necessity, an eCommerce application, which has a medium to large sized codebase, required that large amounts of state be needed in several places across the application, with that state being updated frequently. For this project, I specifically used the React-Redux package, which lets React components to interact with a [Redux store](https://github.com/dreniff3/Bizaar-eShop/blob/main/frontend/src/store.js) by reading pieces of state and dispatching actions to update that store. The alternative way to share the same state across multiple components is to lift that state up to parent components. Redux gives developers a centralized place to contain and access that "global" state.

The Basics of Redux:

1. create Redux **store**, using `configureStore` function: this is where application state is *stored*
2. UI components access state from the store and renders based on that
3. a User causes a change to happen: the app (via a component) *dispatches* an **action** (a JS object that is an "event", describing something that happened in the app) to the Redux store
4. the store notifies the part of the UI attached to that updated state
* updating state is handled by **reducer** functions, which receive current state and an action object, and returns the new state: `(state, action) => newState`
* reducers for all features of the application are passed as an object to the `configureStore` function when creating the store

The Redux Workflow:
- State describes the condition of the app at a specific point in time
- The UI is rendered based on that state
- When something happens (such as a user clicking a button), the state is updated based on what occurred
- The UI re-renders based on the new state
![Redux Workflow](https://redux.js.org/assets/images/one-way-data-flow-04fe46332c1ccb3497ecb04b94e55b97.png)

Redux Slices: 
- a **slice** is a collection of Redux reducer logic and actions for a single feature of the application
- a slice is created using the `createSlice` Redux Toolkit function: each slice has a `name`, an `initialState`, and an object of `reducers`

The React-Redux library has its own hooks, too: 
- `useSelector`: lets a component extract data from the Redux **store** state
- `useDispatch`: used to dispatch **actions** from the store
* components don't have direct access to the store, which is why these hooks are necessary

How do the React-Redux hooks in our components know about the store? Because it's passed down to the rest of the application via the `<Provider>` component:

[`main.jsx`](https://github.com/dreniff3/Bizaar-eShop/blob/main/frontend/src/main.jsx)
```
...
import store from './app/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

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
