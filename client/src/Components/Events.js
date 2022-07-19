import React, { useEffect, useState } from "react";
import Filter from "./Filter";

function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({
    start_date: "",
    end_date: "",
    event_type: "",
    event_region: "",
    tags: "",
    sort: 1,
    sortBy: -1,
  });
  useEffect(() => {
    fetch("/getAllEvents", {
      method: "get",
    })
      .then((res) => res.json())
      .then((result) => {
        setEvents(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handler = (e) => {
    const { name, value } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(filter);
  };

  const searchResults = () => {
    console.log(filter);
    fetch("/searchResults", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setEvents(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sortByQuery = () => {
    filter.sort = filter.sort == "1" ? "0" : "1";
    // console.log(filter);
    searchResults();
  };

  return (
    <div>
      <Filter
        updateFilter={handler}
        filter={filter}
        searchResults={searchResults}
        sortByQuery={sortByQuery}
        sort={filter.sort}
      />
      <div className="eventList" style={{ maxWidth: "600px", margin: "auto" }}>
        {events.map((item) => {
          return (
            <div className="events">
              <p>
                <strong>EventName</strong> : {item.event_name}
              </p>
              <br />
              <p>
                <strong>Start Date</strong> : {item.start_date}
              </p>
              <br />
              <p>
                <strong>End Date</strong> : {item.end_date}
              </p>
              <br />
              <p>
                <strong>Event Type</strong> : {item.event_type}
              </p>
              <br />
              <p>
                <strong>Event Region</strong> : {item.event_region}
              </p>
              <br />

              <div style={{ display: "flex" }}>
                <div style={{ padding: "5px 0px", marginRight: "10px" }}>
                  <strong>Tags</strong> :
                </div>
                {item.tags.map((tagItem) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        padding: "5px",
                        marginRight: "5px",
                        boxShadow: "blue 2px 0px 7px 1px",
                        justifyContent: "space-around",
                      }}
                    >
                      {tagItem}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Events;
