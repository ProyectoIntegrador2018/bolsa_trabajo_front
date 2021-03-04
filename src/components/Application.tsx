import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Redirect, Switch, useHistory } from 'react-router-dom';
import SignIn from './Login/SignIn';
import SignUp from './Login/SignUp';
import MainLayout from './Layouts/MainLayout';
import RouteWithLayout from './Layouts/RouteWithLayout';
import PanelAdmin from './PanelAdmin/PanelAdmin';
import Home from './Home/Home';
// import { authenticationService } from '../services/authentication';
// import { UserContext } from './UserProvider';

function Application() {
  // Get user context here:
  // const user = useContext(UserContext);
  const user = "User"
  console.log(user);
  return (
    <Router>
      {user ? (
        // Routes a logged in user can access
        <Switch>
          <RouteWithLayout
            layout={MainLayout}
            exact path="/"
            layoutProps={null}
            component={Home}
          />
          <RouteWithLayout
            layout={MainLayout}
            exact path="/admin"
            layoutProps={null}
            component={PanelAdmin}
          />
          <Redirect to="/" />
        </Switch>
      ) : (
        <>
        <Switch>
          <SignIn 
          // @ts-ignore
          exact path="/" default />
          <SignUp 
          // @ts-ignore
          exact path="/register" />
          <Redirect to="/" />
        </Switch>
        </>
      )}
    </Router>
  );
}
export default Application;
