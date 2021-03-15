import React, { FC } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import Pages from "./Pages";
import Blocks from "./Blocks";

const Dashboard: FC = () => {
  const location = useLocation();

  return (
    <div className="proto-dashboard">
      <DashboardNavbar />
      <main className="proto-dashboard__main">
        <div className="proto-dashboard__content">
          <Switch>
            <Route exact path="/">
              <Redirect to={`/pages${location.search}`} />
            </Route>
            <Route path="/blocks" component={Blocks} />
            <Route exact path="/pages" component={Pages} />
          </Switch>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
