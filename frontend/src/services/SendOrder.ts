// *************************Jotform form fields***********************************

import axios from "axios";
import { ContactDetails } from "../components/ContactInfo";
import { MixSizeDetails } from "../components/SelectBagSize";
import { MixInDetails } from "../components/SelectMixIns";

const SELECT_BAG_SIZE = "5";
const NUTS = "29";
const DRIED_FRUITS = "30";
const CANDY = "31";
const MISC = "32";
const YOUR_NAME = "13";
const PHONE_NUMBER = "19";
const EMAIL = "20";
const NOTES = "8";

// ********************************************************************************

const testSubmission = {
  submission: {
    "5": "Small w/6 choice max / $8",
    "13": "John Doe",
    "19": "(956) 867-3809",
    "20": "john@example.com",
    "8": "Some additional notes",
    "29": ["Peanuts", "Almonds"],
    "30": ["Raisin", "Blueberries"],
    "31": ["M&Ms"],
    "32": ["Pretzels"],
  },
};

const testSubmission2 = {
  answers: {
    "5": { answer: "Small w/6 choice max / $8" },
    "13": { answer: "Joseph Onuorah" },
    "19": { answer: "(956) 867-3809" },
  },
};

export const SendOrder = async (
  selectedBagSizeData: MixSizeDetails,
  selectedMixIns: MixInDetails,
  contactInfo: ContactDetails
) => {
  try {
    const submissionData = BuildJotFormObject(
      selectedBagSizeData,
      selectedMixIns,
      contactInfo
    );

    const response = await axios.post(
      `http://localhost:3001/submit-form`,
      submissionData
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const BuildJotFormObject = (
  selectedBagSizeData: MixSizeDetails,
  selectedMixIns: MixInDetails,
  contactInfo: ContactDetails
) => {
  const data = {
    [SELECT_BAG_SIZE]: `${selectedBagSizeData.size} w/${selectedBagSizeData.maxMixIns} choice max / $${selectedBagSizeData.price}`,
    [YOUR_NAME]: { first: contactInfo.firstName, last: contactInfo.lastName },
    [PHONE_NUMBER]: contactInfo.phoneNumber,
    [EMAIL]: contactInfo.email,
    [NOTES]: contactInfo.orderNotes,
    [NUTS]: selectedMixIns.mixIns.Nuts,
    [DRIED_FRUITS]: selectedMixIns.mixIns.Dried_Fruits,
    [CANDY]: selectedMixIns.mixIns.Candy,
    [MISC]: selectedMixIns.mixIns.Miscellaneous,
  };

  return data;
};

export interface JotFormFields {
  [SELECT_BAG_SIZE]: string;
  [NUTS]: string;
  [DRIED_FRUITS]: string;
  [CANDY]: string;
  [MISC]: string;
  [YOUR_NAME]: string;
  [PHONE_NUMBER]: string;
  [EMAIL]: string;
  [NOTES]: string;
}

export const emptyJotFormFields: JotFormFields = {
  [SELECT_BAG_SIZE]: "",
  [NUTS]: "",
  [DRIED_FRUITS]: "",
  [CANDY]: "",
  [MISC]: "",
  [YOUR_NAME]: "",
  [PHONE_NUMBER]: "",
  [EMAIL]: "",
  [NOTES]: "",
};

export const BuildJotFormObject1 = (
  selectedBagSizeData: MixSizeDetails,
  selectedMixIns: MixInDetails,
  contactInfo: ContactDetails
) => {
  let jotFormFields = { ...emptyJotFormFields };

  jotFormFields[
    SELECT_BAG_SIZE
  ] = `${selectedBagSizeData.size} w/${selectedBagSizeData.maxMixIns} choice max / $${selectedBagSizeData.price}`;
  jotFormFields[YOUR_NAME] = `${contactInfo.firstName} ${contactInfo.lastName}`;
  jotFormFields[PHONE_NUMBER] = contactInfo.phoneNumber;

  if (contactInfo.email !== "") {
    jotFormFields[EMAIL] = contactInfo.email;
  }
  if (contactInfo.orderNotes != "") {
    jotFormFields[NOTES] = contactInfo.orderNotes;
  }
};
