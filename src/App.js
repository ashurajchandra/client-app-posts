import React, {useReducer} from 'react';
import Posts from './Posts/Posts'
import './App.css'
import {PostContext} from './Context/PostContext';
import {postInitialState,postReducer}from './Context/PostReducer';


// import {PostContext} from './Context/PostContext';
// import {postInitialState,postReducer} from './Context/PostReducer'

function App() {
  const [ PostState, PostDispatch] = useReducer(postReducer, postInitialState)
  return (
    <PostContext.Provider value={{PostState, PostDispatch}}>
    <div className="App">
     {/* <h1>App</h1> */}
 
     <Posts/>
     
    </div>
    </PostContext.Provider>
  );
}

export default App;
