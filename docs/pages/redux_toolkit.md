# Redux toolkit package
## NPM docs
- [React-Redux](https://react-redux.js.org/) : base package
- [Redux Toolkit](https://redux-toolkit.js.org/) : framework over Redux that simplifies its usage

## Our usage
### Redux files
All the Redux related code is located in `src/redux`. There are two subfolders:
- `features` : contains all the slices that we will use. Each folder corresponds to one slice of the application.
- `store` : creates the store by getting all the reducers from the slices. If you create a new reducer/slice, you must add a reference there.

#### Creating a reducer
When you create a reducer, please create a new feature subfolder. Please create a constant that stores the string name of the reducer (`sliceName`), and another one that contains the initial state (`initialState`) of this reducer. You can store your reducer in a third constant. You can create your reducer by using `createSlice` from Redux Toolkit. The parameter is an object containing:
- `name`: The name of your reducer (use `sliceName`)
- `initialState`: The initial state of your reducer (use `initialState`).
- `reducers`: The list of **synchronous** actions with the matching reducer function (you can change your state here).
- `extraReducers`: The list of **asynchronous** actions promises callbacks that will be executed after the call of the asynchronous action.

#### Asynchronous actions
To create asynchronous actions, store each one in a constant with `createAsyncThunk` from Redux Toolkit. The first argument is the name of your action with the reducer prefix : `sliceName/<actionName>`. The second argument is an async function that will containing your asynchronous logic. After that, you must use the constant of the action in `extraReducers`, like this: `[<constantName>.<status>]`. The status can help you to separate between success (`fulfilled`), error (`rejected`) and loading (`pending`) states. You can access state and payload (the result of your async function or throw) here like any other action reducer.

#### Exporting your reducer
When exporting your reducer, please do the following :
- export all the **synchronous** under an object which is destructured from `<yourSlice>.actions`
- export all the **asynchronous** async thunks
- export `<yourSlice>.reducer` as the default export.

### In the components
> Please keep in mind that we use functional components!

#### Accessing state variables
You can use the `useSelector` hook from React-Redux to access a state variable. The argument is a function that takes the state as parameter and returns one subfield. You have to access it that way : `state.<sliceName>.<variable>`. Store the result as a constant.

#### Dispatching actions
To send actions, you must access the `dispatch` function with the `useDispatch` hook from React-Redux, and store it as a constant. You must the import the action you wish to call. Call your action inside `dispatch` with your payload data as an argument.
