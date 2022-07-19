const mongoose = require("mongoose");
const Event = mongoose.model("Event");

const { buildFilterQuery } = require("../utils/EventUtils");

exports.getAllEvents = () => {
  return new Promise((resolve, reject) => {
    Event.find()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.searchResults = (filterData) => {
  const finalQuery = buildFilterQuery(filterData.filter);
  let sort, param;

  // console.log(finalQuery, filterData.filter.sort, filterData.filter.sortBy);
  sort = filterData.filter.sort == 1 ? "1" : "-1";
  param = filterData.filter.sortBy === 1 ? "start_date" : "end_date";
  let sortQuery = {};
  sortQuery[param] = sort;

  // console.log(sortQuery);

  // console.log(finalQuery)
  return new Promise((resolve, reject) => {
    Event.find(finalQuery)
      .sort(sortQuery)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
