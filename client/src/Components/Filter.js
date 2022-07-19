import React, { useState } from "react";

function Filter(props) {
  const filter = props.filter,
    handler = props.updateFilter,
    searchResults = props.searchResults,
    sortByQuery = props.sortByQuery;

  const [sortCondition, setSortCondition] = useState("Low to High");
  const changeBtn = () => {
    filter.sort == "1"
      ? setSortCondition("High to Low")
      : setSortCondition("Low to High");
    sortByQuery();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginBottom: "20px",
      }}
    >
      <div>
        <label>Start Date : </label>
        <input
          value={filter.start_date}
          type="date"
          name="start_date"
          onChange={handler}
        />
      </div>
      <div>
        <label>End Date : </label>
        <input
          value={filter.end_date}
          type="date"
          name="end_date"
          onChange={handler}
        />
      </div>
      <div>
        <label>Event Type : </label>
        <input
          value={filter.event_type}
          type="text"
          name="event_type"
          onChange={handler}
        />
      </div>
      <div>
        <label>Event Tags : </label>
        <input
          value={filter.tags}
          type="text"
          placeholder="Enter comma separated tags"
          name="tags"
          onChange={handler}
        />
      </div>
      <div>
        <label>Event Region </label>
        <input
          value={filter.event_region}
          type="text"
          name="event_region"
          onChange={handler}
        />
      </div>
      <button onClick={searchResults}>Apply Filter</button>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <select value={filter.sortBy} onChange={handler} name="sortBy">
          <option value={1}>By Start Date</option>
          <option value={0}>By End Date</option>
        </select>

        <button onClick={changeBtn}>{sortCondition}</button>
      </div>
    </div>
  );
}

export default Filter;
