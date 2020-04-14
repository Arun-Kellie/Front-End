import React, { FunctionComponent } from "react";
import { DashboardContextConsumer } from "./DashboardContext";
import { slide as Menu } from "react-burger-menu";
import "./sidepanel.scss";

const AdminSidePanel: FunctionComponent = () => {
  return (
    <DashboardContextConsumer>
      {dashboardContext => (
        <Menu
          isOpen={dashboardContext?.isMenuOpen}
          onStateChange={state => dashboardContext?.stateChangeHandler(state)}
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        >
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
          <a id="contact" className="menu-item" href="/contact">
            Contact
          </a>
        </Menu>
      )}
    </DashboardContextConsumer>
  );
};

export default AdminSidePanel;
