const axios = require("axios");

const FORM_ID = "242795723600155";
const API_KEY = "7c5cecb18f51cbcd6d7ea6565a0b0adb";

const submitToJotform = async (submissionData) => {
  try {
    const response = await axios.post(
      `https://api.jotform.com/form/${FORM_ID}/submissions`,
      submissionData,
      {
        headers: { "Content-Type": "application/json", apiKey: API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw new Error("Form submission failed");
  }
};

const getFieldInfo = async () => {
  try {
    const response = await axios.get(
      `https://api.jotform.com/form/${FORM_ID}/questions`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = submitToJotform;
