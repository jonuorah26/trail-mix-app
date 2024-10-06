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
  FormGroup,
  Chip,
  Avatar,
} from "@mui/material";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { MixSizeDetails } from "./SelectBagSize";

const mixIns = {
  Nuts: [
    "Peanuts",
    "Almonds",
    "Pistachios",
    "Pecans",
    "Walnuts",
    "Cashews",
    "Macadamia",
    "Sunflower Seeds",
    "Pumpkin Seeds",
    "Brazil Nuts",
    "Pepitas",
    "Hazelnuts",
  ],
  DriedFruits: [
    "Raisin",
    "Blueberries",
    "Cranberry",
    "Pineapple",
    "Mango",
    "Coconut Flakes",
    "Golden Raisin",
    "Banana",
    "Apple Chips",
  ],
  Candy: [
    "M&Ms",
    "Peanut M&Ms",
    "Almond M&Ms",
    "Reese's Pieces",
    "Milk Chocolate Chips",
    "Dark Chocolate Chips",
    "White Chocolate Chips",
    "Peanut Butter Chips",
    "Gummy Bears",
  ],
  Miscellaneous: [
    "Pretzels",
    "Peanut Butter filled Pretzel",
    "Edamame",
    "Toasted Corn",
    "Sesame Sticks",
    "Granola",
  ],
};

export interface MixIns {
  count: number;
  mixIns: string[];
}

export interface SelectMixInsProps {
  selectedBagSizeData: MixSizeDetails;
  selectedMixIns: MixIns;
  setSelectedMixIns: (mixIns: MixIns) => void;
}

export function SelectMixIns({
  selectedBagSizeData,
  selectedMixIns,
  setSelectedMixIns,
}: SelectMixInsProps) {
  const [disableBoxes, setDisableBoxes] = React.useState(false);
  const [checkedBoxes, setCheckedBoxes] = React.useState({});

  React.useEffect(() => {
    let checkedBoxes = {};

    selectedMixIns.mixIns.forEach((selectedMixIn) => {
      checkedBoxes[selectedMixIn] = true;
    });

    Object.entries(mixIns).forEach(([mixInType, mixIns]) => {
      mixIns.forEach((mixIn) => {
        checkedBoxes[mixIn] = checkedBoxes[mixIn] ?? false;
      });
    });

    setCheckedBoxes(checkedBoxes);
    if (selectedMixIns.count === selectedBagSizeData.maxMixIns) {
      setDisableBoxes(true);
    }
  }, []);

  const handleChange = (e) => {
    const selectedMixIn = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      const mixInCount = ++selectedMixIns.count;
      const newSelectedMixIns: MixIns = {
        count: mixInCount,
        mixIns: [...selectedMixIns.mixIns, selectedMixIn],
      };
      setSelectedMixIns(newSelectedMixIns);
      setCheckedBoxes({ ...checkedBoxes, [selectedMixIn]: true });

      if (mixInCount === selectedBagSizeData.maxMixIns) {
        setDisableBoxes(true);
      }
    } else {
      const mixInCount = --selectedMixIns.count;
      const newSelectedMixIns: MixIns = {
        count: mixInCount,
        mixIns: selectedMixIns.mixIns.filter((mixIn) => {
          if (mixIn !== selectedMixIn) {
            return mixIn;
          }
        }),
      };
      setSelectedMixIns(newSelectedMixIns);
      setCheckedBoxes({ ...checkedBoxes, [selectedMixIn]: false });

      if (mixInCount < selectedBagSizeData.maxMixIns) {
        setDisableBoxes(false);
      }
    }
  };

  const handleClear = () => {
    Object.entries(checkedBoxes).forEach(([key, value]) => {
      checkedBoxes[key] = false;
    });

    setCheckedBoxes(checkedBoxes);
    setSelectedMixIns({
      count: 0,
      mixIns: [],
    });
    setDisableBoxes(false);
  };

  return (
    <>
      <Paper sx={{ p: 2 }} elevation={5}>
        <Grid2 container>
          <Grid2 size={12}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Select Your Mix Ins
            </Typography>
            {selectedMixIns.count == 0 ? (
              <Chip label={`${selectedMixIns.count} Selected`} sx={{ my: 1 }} />
            ) : (
              <Chip
                avatar={<Avatar>{selectedMixIns.count}</Avatar>}
                color={
                  selectedMixIns.count === selectedBagSizeData.maxMixIns
                    ? "success"
                    : "primary"
                }
                onDelete={handleClear}
                label="Selected"
                sx={{ my: 1 }}
              />
            )}
          </Grid2>
          {Object.entries(mixIns).map(([mixInType, mixIns]) => {
            return (
              <Grid2
                sx={{
                  px: 1,
                  mb: 5,
                }}
                size={{ xs: 12, sm: 6 }}
              >
                <Typography variant="h6" sx={{ textAlign: { sm: "left" } }}>
                  {mixInType}
                </Typography>
                <FormGroup>
                  {mixIns.map((mixIn) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedBoxes[mixIn] ?? false}
                            value={mixIn}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            disabled={
                              disableBoxes && checkedBoxes[mixIn] == false
                            }
                          />
                        }
                        label={mixIn}
                      />
                    );
                  })}
                </FormGroup>
              </Grid2>
            );
          })}
        </Grid2>
      </Paper>
    </>
  );
}
