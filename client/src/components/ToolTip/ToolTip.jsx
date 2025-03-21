import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const ToolTip = ({tooltip, children, text, placement = "top" }) => {
  return (
    <>
        {
            tooltip?
            <OverlayTrigger placement={placement} overlay={<Tooltip>{text}</Tooltip>}>
            {children}
          </OverlayTrigger>
          :
          children
        }
        </>
  );
};
