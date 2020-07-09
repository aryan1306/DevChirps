import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Alert from './components/layout/alert';
import CreateProfile from './components/layout/profileForms/CreateProfile';
import EditProfile from './components/layout/profileForms/EditProfile';
import AddExperience from './components/layout/profileForms/AddExperience';
import AddEducation from './components/layout/profileForms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/posts';
import PrivateRoute from './routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth_actions';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';
import Post from './components/Post/Post';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-user-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/post/:id' component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
