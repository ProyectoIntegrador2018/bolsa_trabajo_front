import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import FormEmployee from "./Forms/FormEmployee";
import FormOrganization from "./Forms/FormOrganization";
import MainLayout from './Layouts/MainLayout';
import RouteWithLayout from './Layouts/RouteWithLayout';
import PanelAdmin from './PanelAdmin/PanelAdmin';
import Home from './Home/Home';
import { UserContext } from './Authentication/UserProvider';

function Application() {
  // Get user context here:
  const { user } = useContext(UserContext);
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
          <FormEmployee 
          // @ts-ignore
          exact path="/form-employee" />
          <FormOrganization
          // @ts-ignore
          exact path="/form-organization" />
          <Redirect to="/" />
        </Switch>
        </>
      )}
    </Router>
  );
}
export default Application;
