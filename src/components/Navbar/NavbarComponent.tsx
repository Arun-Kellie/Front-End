import React, { FunctionComponent } from "react";
import {
  Alignment,
  Navbar,
  Button,
  Position,
  Popover,
  Menu,
  Classes,
  MenuItem,
  MenuDivider
} from "@blueprintjs/core";
import Avatar from "react-avatar";
import './navbar.scss';
// @ts-ignore
import variables from "../../index.scss";

const NavbarComponent: FunctionComponent = () => {

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <Button icon={"menu-closed"} minimal></Button>
        </Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp3-minimal" icon="home" text="Dashboard" />
        <Button className="bp3-minimal" icon="document" text="Users" />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Popover
          content={
            <Menu className={Classes.ELEVATION_1}>
              <MenuItem icon="user" text="Profile" />
              <MenuItem icon="cog" text="Settings" />
              <MenuItem icon="lifesaver" text="Support" />
              <MenuDivider />
              <MenuItem icon="power" text="Logout" />
            </Menu>
          }
          position={Position.BOTTOM}
        >
          <Avatar
            name="Admin User"
            round={true}
            size={"40"}
            color={variables.greenColor}
            className='nav-avatar'
          />
        </Popover>
      </Navbar.Group>
    </Navbar>
  );
};

export default NavbarComponent;
