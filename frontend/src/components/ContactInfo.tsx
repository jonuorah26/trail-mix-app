import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export interface ContactDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  orderNotes: string;
}

interface ContactInfoProps {
  contactInfo: ContactDetails;
  setContactInfo: (contactInfo: ContactDetails) => void;
  contactInfoErrorFields: ContactInfoErrorFields;
  setContactInfoErrorFields: (
    contactInfoErrorFields: ContactInfoErrorFields
  ) => void;
}

export interface ContactInfoErrorFields {
  firstName: boolean;
  lastName: boolean;
  phoneNumber: boolean;
  email: boolean;
  orderNotes: boolean;
}

export function ContactInfo({
  contactInfo,
  setContactInfo,
  contactInfoErrorFields,
  setContactInfoErrorFields,
}: ContactInfoProps) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const field = e.target.id;
    const fieldValue = e.target.value;

    setContactInfo({ ...contactInfo, [field]: fieldValue });
    setContactInfoErrorFields({ ...contactInfoErrorFields, [field]: false });
  };

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <TextField
          error={contactInfoErrorFields.firstName}
          id="firstName"
          label="First Name"
          variant="outlined"
          value={contactInfo.firstName}
          onChange={(e) => handleChange(e)}
          helperText={
            contactInfoErrorFields.firstName && "Please enter your first name"
          }
          required
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <TextField
          error={contactInfoErrorFields.lastName}
          id="lastName"
          label="Last Name"
          variant="outlined"
          value={contactInfo.lastName}
          onChange={(e) => handleChange(e)}
          helperText={
            contactInfoErrorFields.lastName && "Please enter your last name"
          }
          required
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <InputMask
          mask="(999) 999-9999"
          value={contactInfo.phoneNumber}
          onChange={(e) => handleChange(e)}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              error={contactInfoErrorFields.phoneNumber}
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              value={contactInfo.phoneNumber}
              helperText={
                contactInfoErrorFields.phoneNumber &&
                "Please enter a valid phone number"
              }
              required
            />
          )}
        </InputMask>
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <TextField
          error={contactInfoErrorFields.email}
          id="email"
          label="E-mail"
          variant="outlined"
          type="email"
          value={contactInfo.email}
          helperText={
            contactInfoErrorFields.email && "Please enter a valid email"
          }
          onChange={(e) => handleChange(e)}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <TextField
          id="orderNotes"
          label="Notes"
          variant="outlined"
          multiline
          value={contactInfo.orderNotes}
          onChange={(e) => handleChange(e)}
          minRows={6}
        />
      </FormGrid>
    </Grid>
  );
}
