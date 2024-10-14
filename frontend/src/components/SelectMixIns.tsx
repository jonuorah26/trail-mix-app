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
import { Category } from "@mui/icons-material";

const allMixIns: MixIns = {
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
  Dried_Fruits: [
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

export interface MixInDetails {
  count: number;
  mixIns: MixIns;
}

export interface MixIns {
  Nuts: string[];
  Dried_Fruits: string[];
  Candy: string[];
  Miscellaneous: string[];
}

export interface SelectMixInsProps {
  selectedBagSizeData: MixSizeDetails;
  selectedMixIns: MixInDetails;
  setSelectedMixIns: (mixIns: MixInDetails) => void;
}

export const emptyMixInDetails: MixInDetails = {
  count: 0,
  mixIns: {
    Nuts: [],
    Dried_Fruits: [],
    Candy: [],
    Miscellaneous: [],
  },
};

export function SelectMixIns({
  selectedBagSizeData,
  selectedMixIns,
  setSelectedMixIns,
}: SelectMixInsProps) {
  const [disableBoxes, setDisableBoxes] = React.useState(false);
  const [checkedBoxes, setCheckedBoxes] = React.useState({});

  React.useEffect(() => {
    let checkedBoxes = {};

    let selectedMix: string[] = [];
    Object.entries(selectedMixIns.mixIns).forEach(
      ([category, list]: [string, string[]]) => {
        list.forEach((value) => {
          selectedMix.push(value);
        });
      }
    );

    selectedMix.forEach((selectedMixIn) => {
      checkedBoxes[selectedMixIn] = true;
    });

    Object.entries(allMixIns).forEach(
      ([mixInType, mixIns]: [string, string[]]) => {
        mixIns.forEach((mixIn) => {
          checkedBoxes[mixIn] = checkedBoxes[mixIn] ?? false;
        });
      }
    );

    setCheckedBoxes(checkedBoxes);
    if (selectedMixIns.count === selectedBagSizeData.maxMixIns) {
      setDisableBoxes(true);
    }
  }, []);

  const handleChange = (e) => {
    const selectedMixIn = JSON.parse(e.target.value);
    const category = Object.keys(selectedMixIn)[0] as keyof MixIns;
    const mixIn = selectedMixIn[category];
    const checked = e.target.checked;
    const newMixIns: MixIns = selectedMixIns.mixIns;

    if (checked) {
      const mixInCount = ++selectedMixIns.count;
      newMixIns[category].push(mixIn);
      const newSelectedMixIns: MixInDetails = {
        count: mixInCount,
        mixIns: newMixIns,
      };
      setSelectedMixIns(newSelectedMixIns);
      setCheckedBoxes({ ...checkedBoxes, [mixIn]: true });

      if (mixInCount === selectedBagSizeData.maxMixIns) {
        setDisableBoxes(true);
      }
    } else {
      const mixInCount = --selectedMixIns.count;
      newMixIns[category] = newMixIns[category].filter((curr) => {
        if (curr !== mixIn) {
          return curr;
        }
      });
      const newSelectedMixIns: MixInDetails = {
        count: mixInCount,
        mixIns: newMixIns,
      };
      setSelectedMixIns(newSelectedMixIns);
      setCheckedBoxes({ ...checkedBoxes, [mixIn]: false });

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
    setSelectedMixIns(JSON.parse(JSON.stringify(emptyMixInDetails)));
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
          {Object.entries(allMixIns).map(
            ([mixInType, mixIns]: [string, string[]]) => {
              return (
                <Grid2
                  sx={{
                    px: 1,
                    mb: 5,
                  }}
                  size={{ xs: 12, sm: 6 }}
                >
                  <Typography variant="h6" sx={{ textAlign: { sm: "left" } }}>
                    {mixInType.replaceAll("_", " ")}
                  </Typography>
                  <FormGroup>
                    {mixIns.map((mixIn) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkedBoxes[mixIn] ?? false}
                              value={JSON.stringify({ [mixInType]: mixIn })}
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
            }
          )}
        </Grid2>
      </Paper>
    </>
  );
}
