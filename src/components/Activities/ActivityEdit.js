import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";
const ActivityEdit = () => {
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getActivityApi = "http://localhost:8080/users-activities";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch(getActivityApi.concat("/") + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setActivity(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setActivity({ ...activity, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    fetch(getActivityApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setIsLoading(true);
        navigate("/users-activities");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      })
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Edit Form</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="description"
            value={activity.description}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="surname" className="form-label">
            Name and Surname of user
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="surname"
            name="dateTime"
            value={activity.dateTime}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="age" className="form-label">
            Date and time
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="userId"
            value={activity.userId}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          EDIT
        </button>
      </form>
    </div>
  );
};
export default ActivityEdit;
