import * as React from "react";
import { Typography, Stack, Button } from "@mui/material";

export default function OrderConfirmation() {
  return (
    <Stack spacing={2} useFlexGap>
      <Typography variant="h1">📦</Typography>
      <Typography variant="h5">Thank you for your order!</Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        If you have questions or comments, please contact me at the number
        below. I look forward to hearing from you!
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 0 }}>
        Contact Info
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: "-12px" }}>
        Phone Number: (903) 603-4924 <br />
        Email: gmrome97@gmail.com
      </Typography>

      <Typography variant="body1" sx={{ color: "text.secondary", mb: 0 }}>
        Delivery Time
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: "-12px" }}>
        1-2 days or when you're available
      </Typography>

      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        I accept Zelle, Venmo, Cash App, and Cash for payment
      </Typography>

      <Button
        variant="contained"
        sx={{
          alignSelf: "start",
          width: { xs: "100%", sm: "auto" },
          mb: { xs: 10 },
        }}
        href="/material-ui/getting-started/templates/"
      >
        Start A New Order
      </Button>
    </Stack>
  );
}
