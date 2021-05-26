import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editor from "views/Editor";
import Dashboard from "views/Dashboard";
import favicon from "assets/logo.svg";
import AppConfig from "./AppConfig";

const App: FC = () => {
  return (
    <Router>
      <AppConfig>
        <div className="app">
          <Helmet>
            <link rel="shortcut icon" href={favicon} type="image/svg+xml" />
            <title>Qwilr</title>
          </Helmet>
          <Switch>
            <Route path="/editor" component={Editor} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </AppConfig>
    </Router>
  );
};

export default App;
