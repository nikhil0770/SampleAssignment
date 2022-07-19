const formatString = (input) => {
  return "^" + input;
};

const formatTag = (tags) => {
  return tags.toString().split(",");
};

exports.buildFilterQuery = (filter) => {
  let query = {};
  for (let keys in filter) {
    if (
      keys != "sortBy" &&
      keys != "sort" &&
      filter[keys].constructor === String &&
      filter[keys].length > 0
    ) {
      if (keys === "start_date") {
        query[keys] = { $gte: new Date(filter[keys]) };
      } else if (keys === "end_date") {
        query[keys] = { $lte: new Date(filter[keys]) };
      } else if (keys === "tags") {
        query[keys] = { $all: formatTag(filter[keys]) };
      } else {
        query[keys] = {
          $regex: formatString(filter[keys]),
          $options: "i",
        };
      }
    }
  }
  return query;
};
