import React, { FunctionComponent } from "react";
import { DashboardContextConsumer } from "./DashboardContext";
import { slide as Menu } from "react-burger-menu";
import "./sidepanel.scss";
import {MenuDivider, MenuItem, Menu as BlueprintMenu} from '@blueprintjs/core';

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
          <div className="page-brand pt-3 text-center"><a className="link"
                                         href="/"><span className="brand">Admin <span
              className="brand-tip">CAST</span></span><span className="brand-mini">AC</span></a></div>
          <BlueprintMenu className="bm-menu pt-4" large>
            <MenuItem icon="user" text="Profile" className="sideBarItem"/>
            <MenuItem icon="cog" text="Settings" className="sideBarItem"/>
            <MenuItem icon="lifesaver" text="Support" className="sideBarItem"/>
            <MenuDivider/>
            <MenuItem icon="power" text="Logout" className="sideBarItem"/>
          </BlueprintMenu>
        </Menu>
      )}
    </DashboardContextConsumer>
  );
};

export default AdminSidePanel;
