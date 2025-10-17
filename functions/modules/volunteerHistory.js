const express = require("express");
const router = express.Router();
const { validateHistoryEntry } = require("../utils/validation");

//dummy volunteer history hardcoded
//add in location!
let volunteerHistory = [
  { id: 1, date: "2025-08-21", event: "Dog Grooming", hours: 3 },
  { id: 2, date: "2025-09-10", event: "Dog Park Cleanup", hours: 2 },
  { id: 3, date: "2025-09-15", event: "Cat Grooming", hours: 3 },
  { id: 4, date: "2025-09-28", event: "Dog Park Cleanup", hours: 2},
  { id: 5, date: "2025-10-01", event: "Bird Feeding and Cage Cleanup", hours: 4}
];

//get all volunteer history
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: volunteerHistory,
  });
});

//post new volunteer history entry w validation
router.post("/", (req, res) => {
  const { date, event, hours } = req.body;
  const validationError = validateHistoryEntry({ date, event, hours });

  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  const newEntry = {
    id: volunteerHistory.length + 1,
    date,
    event,
    hours,
  };

  volunteerHistory.push(newEntry);

  res.status(201).json({
    success: true,
    message: "History entry added successfully.",
    data: newEntry,
  });
});

module.exports = router;
