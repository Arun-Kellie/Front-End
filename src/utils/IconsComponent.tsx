import React from "react";
import { Button, Intent, Tooltip } from "@blueprintjs/core";

export const userIcon = (
  <Tooltip content={"Enter a username or email address"}>
    <Button icon={"user"} intent={Intent.WARNING} minimal={true} />
  </Tooltip>
);

export const emailIcon = (
  <Tooltip content={"Enter an email address"}>
    <Button icon={"envelope"} intent={Intent.WARNING} minimal={true} />
  </Tooltip>
);

export const phoneIcon = (
  <Tooltip content={"Enter a valid phone number"}>
    <Button icon={"phone"} intent={Intent.WARNING} minimal={true} />
  </Tooltip>
);
