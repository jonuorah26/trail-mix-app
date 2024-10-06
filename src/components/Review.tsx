import * as React from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MixSizeDetails } from "./SelectBagSize";
import { MixIns } from "./SelectMixIns";
import { ContactDetails } from "./ContactInfo";
import { Grid2 } from "@mui/material";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const contactInfoFields = [
  { label: "First Name", fieldId: "firstName" },
  { label: "Last Name", fieldId: "lastName" },
  { label: "Phone Number", fieldId: "phoneNumber" },
  { label: "Email", fieldId: "email" },
];

interface ReviewProps {
  selectedBagSizeData: MixSizeDetails;
  selectedMixIns: MixIns;
  contactInfo: ContactDetails;
}

export default function Review({
  selectedBagSizeData,
  selectedMixIns,
  contactInfo,
}: ReviewProps) {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{ variant: "h6" }}
            secondaryTypographyProps={{ variant: "subtitle1" }}
            primary="Selected Bag Size"
            secondary={selectedBagSizeData.size}
          />
          <Typography variant="subtitle1">
            ${selectedBagSizeData.price}
          </Typography>
        </ListItem>
        <Divider />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{ variant: "h6" }}
            secondaryTypographyProps={{ variant: "subtitle1" }}
            primary="Selected Mix-Ins"
            secondary={selectedMixIns.mixIns.join(", ")}
          />
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="h6" gutterBottom>
            Contact Info
          </Typography>
          <Grid2 container>
            {contactInfoFields.map((field) => (
              <React.Fragment key={field.fieldId}>
                <Stack
                  direction="column"
                  spacing={0}
                  useFlexGap
                  sx={{ width: "100%", mb: 2 }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "text.secondary" }}
                  >
                    {field.label}
                  </Typography>
                  <Typography variant="subtitle2">
                    {contactInfo[field.fieldId]}
                  </Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid2>
        </div>
      </Stack>
      {contactInfo.orderNotes !== "" && (
        <>
          <Divider />
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                primaryTypographyProps={{ variant: "h6" }}
                secondaryTypographyProps={{ variant: "subtitle1" }}
                primary="Notes"
                secondary={contactInfo.orderNotes}
              />
            </ListItem>
          </List>
        </>
      )}
    </Stack>
  );
}
