import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editor from "views/Editor";
import EditorA from "views/Editor/EditorA";
import Dashboard from "views/Dashboard";
import favicon from "assets/logo.svg";
import AppConfig from "./AppConfig";
import { Button, ButtonType } from "kaleidoscope/src";

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
            <Route path="/editor" component={EditorA} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </AppConfig>
    </Router>
  );
};

export default App;
