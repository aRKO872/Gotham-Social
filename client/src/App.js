import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import Profiles from "./components/profile/Profiles";
import Profile from "./components/profiles/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import EditProfile from "./components/profile-forms/EditProfile";
import AddEducation from "./components/profile-forms/AddEducation";
import PrivateRoute from "./components/routing/PrivateRoute";

import { Provider } from 'react-redux';
import store from './store'
import {loadUser} from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Landing />} />
        </Routes>
        <section className = "container">
          <Alert/>
          <Routes>
            <Route exact path = '/register' element={<Register/>}/>
            <Route exact path = '/login' element={<Login/>}/>
            <Route exact path = '/profiles' element={<Profiles/>}/>
            <Route exact path = '/profile/:id' element={<Profile/>}/>
            <Route exact path = '/dashboard' element={<PrivateRoute component={Dashboard}/>}/>
            <Route exact path = '/create-profile' element={<PrivateRoute component={CreateProfile}/>}/>
            <Route exact path = '/posts' element={<PrivateRoute component={Posts}/>}/>
            <Route exact path = '/post/:id' element={<PrivateRoute component={Post}/>}/>
            <Route exact path = '/edit-profile' element={<PrivateRoute component={EditProfile}/>}/>
            <Route exact path = '/add-education' element={<PrivateRoute component={AddEducation}/>}/>
          </Routes>
        </section>
    </Router>
  </Provider>
)};

export default App;
