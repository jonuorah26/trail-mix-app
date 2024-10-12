import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import { InfoIcon, CloseIcon } from "@mui/icons-material";
import { Avatar } from "@mui/material";

import Info from "./Info.tsx";

interface InfoProps {
  totalPrice: string;
}

export default function InfoMobile({ totalPrice }: InfoProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ position: "relative", width: "auto", px: 3, pb: 3, pt: 8 }}
      role="presentation"
    >
      <Box
        sx={{
          position: "relative", // Make sure the container is relative for positioning inside it
          width: "100%",
          height: "100%",
        }}
      >
        <img
          style={{ width: "20%" }}
          src="https://trailmyx.com/cdn/shop/files/TrailMyx_Logo.png?v=1725720770&width=600"
        />
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{ position: "absolute", top: -10, right: -20 }}
        >
          <CloseIcon />
        </IconButton>
        <Info totalPrice={totalPrice} />
      </Box>
    </Box>
  );

  return (
    <div style={{ width: "100%" }}>
      <Button
        variant="text"
        endIcon={<EndRoundIcon />}
        onClick={toggleDrawer(true)}
        sx={{ width: "100%", mx: "auto", color: "black" }}
      >
        <img
          style={{ width: "15%", marginRight: "5%" }}
          src="https://trailmyx.com/cdn/shop/files/TrailMyx_Logo.png?v=1725720770&width=600"
        />
        Build Your Perfect Mix!
      </Button>
      <Drawer open={open} anchor="top" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
