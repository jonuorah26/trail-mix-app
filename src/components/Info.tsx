import * as React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const products = [
  {
    name: "Choose Your Size",
    desc: "Select from our 3 different bag size options",
  },
  {
    name: "Choose Your Mix-ins",
    desc: "Choose your favorites from our wide range of mix-in options",
  },
  {
    name: "Enter your Contact Information",
    desc: "Give us some basic contanct info so we can reach you about your order",
  },
  {
    name: "Review Your Order",
    desc: "Review and pay!",
  },
];

interface InfoProps {
  totalPrice: string;
}

export default function Info({ totalPrice }: InfoProps) {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        So How Does this Work?
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
