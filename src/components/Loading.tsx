import * as React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";

export default function Loading() {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999, // Ensure it overlays on top of everything else
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress size={isSmallScreen ? 300 : 450} />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            variant={isSmallScreen ? "body2" : "h6"}
            color="text.primary"
          >
            Recieving Your Order...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
