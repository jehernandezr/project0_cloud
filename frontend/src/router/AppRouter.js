import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../pages/Style.scss";
import PrivateRoute from "./PrivateRoute";
import { Login } from "../pages/login/Login";
import { SignUp } from "../pages/signup/Signup";
import { EventsDetail } from "../pages/event-detail/EventDetail";
import { NotFound } from "../pages/not-found/NotFound";
import { EventList } from "../pages/event-list/EventList";


export const AppRouter = () => {

  return (
   
      <Router>
        <Switch>
        <PrivateRoute exact path="/">
            <EventList />
          </PrivateRoute>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <PrivateRoute exact path="/events">
            <EventList />
          </PrivateRoute>
          <Route exact path="/events/:id">
            <EventsDetail />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>

  );
};
