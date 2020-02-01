import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import MainNavigation from "./shared/containers/navigation/main-navigation/main-navigation/MainNavigation";
import UserPlaces from "./places/pages/user-place/UserPlaces";
import NewPlace from "./places/pages/new-place/NewPlace";
import Users from "./users/pages/users/Users";
import UpdatePlace from "./places/pages/update-place/UpdatePlace";
import Auth from "./users/pages/auth/Auth";
import { UserContext } from "./shared/context/auth/auth-context";
import PrivateRoute from "./shared/private-route/PrivateRoute";

const Routes = () => {
  const { loadUser, isUserLoaded } = useContext(UserContext);

  useEffect(() => {
    loadUser();
  }, [loadUser]);
  if (!isUserLoaded) {
    return null;
  }
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/:userId/places" exact component={UserPlaces} />
          <Route path="/auth" exact component={Auth} />
          <PrivateRoute path="/places/new" exact component={NewPlace} />
          <PrivateRoute path="/places/:placeId" exact component={UpdatePlace} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default Routes;
