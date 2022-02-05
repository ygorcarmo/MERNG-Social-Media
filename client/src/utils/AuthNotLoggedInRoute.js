import React, { userContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../utils/auth";

function AuthNotLoggedInRoute({ component: Component, ...rest }) {
  const isLoggedIn = Auth.loggedIn();

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default AuthNotLoggedInRoute;
