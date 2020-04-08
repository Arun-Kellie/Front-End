import React, { FunctionComponent } from "react";
import { Alignment, Navbar, Button } from "@blueprintjs/core";

const NavbarComponent: FunctionComponent = () => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Blueprint</Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp3-minimal" icon="home" text="Dashboard" />
        <Button className="bp3-minimal" icon="document" text="Users" />
      </Navbar.Group>
    </Navbar>
  );
};

export default NavbarComponent;
