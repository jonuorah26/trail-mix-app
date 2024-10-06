import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, PaletteMode } from "@mui/material/styles";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import getCheckoutTheme from "./theme/getCheckoutTheme";
import Info from "./components/Info.tsx";
import InfoMobile from "./components/InfoMobile.tsx";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review.tsx";
import SitemarkIcon from "./components/SitemarkIcon";
import TemplateFrame from "./TemplateFrame.tsx";
import { MixSizeDetails, SelectBagSize } from "./components/SelectBagSize.tsx";
import { MixIns, SelectMixIns } from "./components/SelectMixIns.tsx";
import Alert from "@mui/material/Alert";
import { Collapse, Fade, Grow, Mixins } from "@mui/material";
import {
  ContactDetails,
  ContactInfo,
  ContactInfoErrorFields,
} from "./components/ContactInfo.tsx";
import { FirstPage } from "@mui/icons-material";
import { flushSync } from "react-dom";

const steps = [
  "Select Bag Size",
  "Select Mix Ins",
  "Contanct Information",
  "Review Your Order",
];
export default function Checkout() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(false);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedBagSizeData, setSelectedBagSizeData] =
    React.useState<MixSizeDetails>({
      size: "",
      price: 0,
      maxMixIns: 0,
    });
  const [selectedMixIns, setSelectedMixIns] = React.useState<MixIns>({
    count: 0,
    mixIns: [],
  });
  const [contactInfo, setContactInfo] = React.useState<ContactDetails>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    orderNotes: "",
  });
  const [contactInfoErrorFields, setContactInfoErrorFields] =
    React.useState<ContactInfoErrorFields>({
      firstName: false,
      lastName: false,
      phoneNumber: false,
      email: false,
      orderNotes: false,
    });
  const [alert, setAlert] = React.useState("");

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode") as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <SelectBagSize
            selectedBagSizeData={selectedBagSizeData}
            setSelectedBagSizeData={setSelectedBagSizeData}
          />
        );
      case 1:
        return (
          <SelectMixIns
            selectedBagSizeData={selectedBagSizeData}
            selectedMixIns={selectedMixIns}
            setSelectedMixIns={setSelectedMixIns}
          />
        );
      case 2:
        return (
          <ContactInfo
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
            contactInfoErrorFields={contactInfoErrorFields}
            setContactInfoErrorFields={setContactInfoErrorFields}
          />
        );
      case 3:
        return (
          <Review
            selectedBagSizeData={selectedBagSizeData}
            selectedMixIns={selectedMixIns}
            contactInfo={contactInfo}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
  };
  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  const handleNext = () => {
    if (activeStep == 0) {
      if (selectedBagSizeData.size === "") {
        setAlert("Please Select a Size Option");
        return;
      }
    }
    if (activeStep == 1) {
      if (selectedMixIns.count === 0) {
        setAlert("Please Select at least one option");
        return;
      }
    }
    if (activeStep == 2) {
      let errorFound = false;
      let newErrorStates: ContactInfoErrorFields = {
        firstName: false,
        lastName: false,
        phoneNumber: false,
        email: false,
        orderNotes: false,
      };

      if (contactInfo.firstName === "") {
        newErrorStates.firstName = true;
        errorFound = true;
      }
      if (contactInfo.lastName === "") {
        newErrorStates.lastName = true;
        errorFound = true;
      }
      if (
        contactInfo.phoneNumber === "" ||
        contactInfo.phoneNumber.match(/^\(\d{3}\) \d{3}-\d{4}$/) === null
      ) {
        newErrorStates.phoneNumber = true;
        errorFound = true;
      }
      if (
        contactInfo.email !== "" &&
        contactInfo.email.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        ) === null
      ) {
        newErrorStates.email = true;
        errorFound = true;
      }
      if (errorFound) {
        setContactInfoErrorFields((prev) => ({
          ...prev,
          ...newErrorStates,
        }));
        return;
      }
    }
    setActiveStep(activeStep + 1);
  };

  React.useEffect(() => {
    if (activeStep == 0 && selectedBagSizeData.size != "") {
      setAlert("");
    } else if (activeStep == 1 && selectedMixIns.count !== 0) {
      setAlert("");
    }

    // refresh selected mix ins whenever bag size option changes
    // to an option with a max option count less than the current selection count
    if (selectedMixIns.count > selectedBagSizeData.maxMixIns) {
      setSelectedMixIns({
        count: 0,
        mixIns: [],
      });
    }
  }, [activeStep, selectedBagSizeData, selectedMixIns]);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
        <CssBaseline enableColorScheme />

        <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
          <Grid
            size={{ xs: 12, sm: 5, lg: 4 }}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              alignItems: "start",
              pt: 16,
              px: 10,
              gap: 4,
            }}
          >
            <SitemarkIcon />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Info totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"} />
            </Box>
          </Grid>
          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "100%",
              backgroundColor: { xs: "transparent", sm: "background.default" },
              alignItems: "start",
              pt: { xs: 6, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexGrow: 1,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{ width: "100%", height: 40 }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ":first-child": { pl: 0 },
                        ":last-child": { pr: 0 },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
            <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected products
                  </Typography>
                  <Typography variant="body1">
                    {activeStep >= 2 ? "$144.97" : "$134.98"}
                  </Typography>
                </div>
                <InfoMobile
                  totalPrice={activeStep >= 2 ? "$144.97" : "$134.98"}
                />
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
                maxHeight: "720px",
                gap: { xs: 5, md: "none" },
              }}
            >
              <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: "flex", md: "none" } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                      "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{
                        ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h1">📦</Typography>
                  <Typography variant="h5">
                    Thank you for your order!
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    If you have questions or comments, please contact me at the
                    number below. I look forward to hearing from you!
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", mb: 0 }}
                  >
                    Contact Info
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: "-12px" }}
                  >
                    Phone Number: (903) 603-4924 <br />
                    Email: gmrome97@gmail.com
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", mb: 0 }}
                  >
                    Delivery Time
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: "-12px" }}
                  >
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
                  >
                    Back to Home
                  </Button>
                </Stack>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Grow in={alert != ""} timeout={500}>
                    <Alert
                      sx={{
                        width: { xs: "100%", sm: "fit-content" },
                        mx: "auto",
                      }}
                      severity="error"
                      variant="filled"
                    >
                      {alert}
                    </Alert>
                  </Grow>
                  <Box
                    sx={[
                      {
                        display: "flex",
                        flexDirection: { xs: "column-reverse", sm: "row" },
                        alignItems: "end",
                        flexGrow: 1,
                        gap: 1,
                        pb: { xs: 12, sm: 0 },
                        mt: { xs: 2, sm: 0 },
                        mb: "60px",
                      },
                      activeStep !== 0
                        ? { justifyContent: "space-between" }
                        : { justifyContent: "flex-end" },
                    ]}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      >
                        Previous
                      </Button>
                    )}
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{ display: { xs: "flex", sm: "none" } }}
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      onClick={handleNext}
                      sx={{ width: { xs: "100%", sm: "fit-content" } }}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </TemplateFrame>
  );
}
