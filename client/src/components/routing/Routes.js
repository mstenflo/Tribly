import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import PrivateRoute from '../routing/PrivateRoute';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import GroupForm from '../group-forms/GroupForm';
import Groups from '../groups/Groups';
import Group from '../group/Group';
import Topic from '../topic/Topic';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/create-group' component={GroupForm} />
        <PrivateRoute exact path='/groups' component={Groups} />
        <PrivateRoute exact path='/group/:id' component={Group} />
        <PrivateRoute
          exact
          path='/group/:id/topic/:topicId'
          component={Topic}
        />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
