import React from 'react';
import { Switch } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import AdminLayout from '../Layouts/AdminLayout';
import RouteWithLayout from '../Layouts/RouteWithLayout';
import AdminHome from './AdminHome';
import ManageAdmins from './ManageAdmins';
import RegisterAdmins from './RegisterAdmins';
import UserAccept from './UserAccept';
import UserDetails from './UserDetail';

function PanelAdmin() {

  let match = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <RouteWithLayout
          layout={AdminLayout}
          exact path={`${match.path}`}
          layoutProps={null}
          component={AdminHome}
        />
        <RouteWithLayout
          layout={AdminLayout}
          exact path={`${match.path}/accept-users`}
          layoutProps={null}
          component={UserAccept}
        />
        <RouteWithLayout
          layout={AdminLayout}
          exact path={`${match.path}/accept-users/:userId`}
          layoutProps={null}
          component={UserDetails}
        />
        <RouteWithLayout
          layout={AdminLayout}
          exact path={`${match.path}/register-admins`}
          layoutProps={null}
          component={RegisterAdmins}
        />
        <RouteWithLayout
          layout={AdminLayout}
          exact path={`${match.path}/manage-admins`}
          layoutProps={null}
          component={ManageAdmins}
        />
      </Switch>
    </React.Fragment>
  );
};

export default PanelAdmin;