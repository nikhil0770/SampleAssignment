const mongoose = require("mongoose");
const Event = mongoose.model("Event");

const formatDate = (date) => {
  let arr = date.toString().split("-");
  arr = arr.reverse();
  let t = arr[1];
  arr[1] = arr[2];
  arr[2] = t;
  return arr;
};

exports.addToDatebase = (fileData) => {
  fileData.forEach((eventObject) => {
    const event = new Event({
      event_name: eventObject.EventName,
      start_date: new Date(formatDate(eventObject.StartDate)),
      end_date: new Date(formatDate(eventObject.EndDate)),
      event_type: eventObject.EventType,
      tags: eventObject.Tags,
      event_region: eventObject.Region,
    });

    event
      .save()
      .then((result) => {
        console.log("Event Inserted");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
