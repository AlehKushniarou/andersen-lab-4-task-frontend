import React, {useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";
import {FormDataContext} from "../FormDataContext";
const ActivityEdit = () => {
  let [activity, setActivity] = useState([]);
  const [error, setError] = useState(null);
  const { formData } = useContext(FormDataContext);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getActivityApi = "http://localhost:8080/front/UserActivity";

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const { name, password } = formData;
    fetch(getActivityApi.concat("/") + id,
        {
          method: "GET",
          headers: {
            'Authorization': 'Basic ' + btoa(`${name}:${password}`)
          }
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setActivity(data);
        })
        .catch((err) => {
          console.log(err.message);
          navigate("/login");
        });
  };

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, password } = formData;
    activity = Object.assign({}, activity, { id: id });
    console.log("Activity: " + JSON.stringify(activity));
    fetch(getActivityApi, {
      method: "PUT",
      headers: {
        'Authorization': 'Basic ' + btoa(`${name}:${password}`)
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
          console.log(error.message);
          setIsLoading(false);
          navigate("/login");
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
        <input type={"hidden"} value={activity.id} name={"id"} onChange={handelInput}></input>
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
        <button type="submit" className="btn btn-primary submit-btn">
          EDIT
        </button>
      </form>
    </div>
  );
};
export default ActivityEdit;
