const express = require("express");
const submitToJotform = require("./SendOrder");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/submit-form", async (req, res) => {
  const submissionData = req.body; // Data from your React app

  try {
    const responseData = await submitToJotform(submissionData);
    res.status(200).send(responseData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
