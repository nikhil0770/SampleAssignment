const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  event_type: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  event_region: {
    type: String,
  },
});

mongoose.model("Event", eventSchema);
