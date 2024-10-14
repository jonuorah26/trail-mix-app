import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import {
  Typography,
  Radio,
  RadioGroup,
  Grid2,
  Paper,
  Box,
} from "@mui/material";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

// const FormGrid = styled(Grid)(() => ({
//   display: 'flex',
//   flexDirection: 'column',
// }));

export interface MixSizeDetails {
  size: string;
  price: number;
  maxMixIns: number;
}

const mixSizes: { [key: string]: MixSizeDetails } = {
  Small: {
    size: "Small",
    price: 8,
    maxMixIns: 6,
  },
  Medium: {
    size: "Medium",
    price: 10,
    maxMixIns: 8,
  },
  Large: {
    size: "Large",
    price: 12,
    maxMixIns: 12,
  },
};

export function SelectBagSize({ selectedBagSizeData, setSelectedBagSizeData }) {
  const headingOption = "h6";

  const handleRadioClick = (e) => {
    const selectedSizeLabel = e.target.value;
    const selectedSizeDetails = mixSizes[selectedSizeLabel];
    //console.log(selectedSizeDetails);
    setSelectedBagSizeData(selectedSizeDetails);
  };

  return (
    <div>
      <Paper sx={{ p: 2, textAlign: "center" }} elevation={5}>
        <RadioGroup
          onChange={(e) => {
            handleRadioClick(e);
          }}
          value={selectedBagSizeData.size}
        >
          <Grid2 container spacing={2} direction={"column"}>
            <Grid2>
              <Typography variant="h5">Select Your Bag Size</Typography>
            </Grid2>
            {Object.entries(mixSizes).map(([size, details]) => {
              return (
                <Grid2 size={12}>
                  <FormControlLabel
                    control={<Radio />}
                    value={size}
                    label={
                      <>
                        <Typography variant={headingOption} sx={{ pl: 2 }}>
                          {details.size} ({details.maxMixIns} choice max)
                        </Typography>
                        <Typography variant={headingOption} sx={{ pl: 2 }}>
                          ${details.price}
                        </Typography>
                      </>
                    }
                  />
                </Grid2>
              );
            })}
          </Grid2>
        </RadioGroup>
      </Paper>
    </div>
  );
}
