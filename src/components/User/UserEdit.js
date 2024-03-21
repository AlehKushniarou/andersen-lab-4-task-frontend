import React, {useContext, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";
import {FormDataContext} from "../FormDataContext";
const EditUser = () => {
  const userListApi = "http://localhost:8080/front/Users";
  const { formData } = useContext(FormDataContext);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const { name, password } = formData;
    fetch(userListApi.concat("/") + id,
        {
          method: "GET",
          headers: {
            'Authorization': 'Basic ' + btoa(`${name}:${password}`)
          }
        })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/login");
      });
  };

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, password } = formData;
    fetch(userListApi, {
      method: "PUT",
      headers: {
        'Authorization': 'Basic ' + btoa(`${name}:${password}`)
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setIsLoading(true);
        navigate("/users");
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
        <div className="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="surname" className="form-label">
            Surname
          </label>
          <input
            type="surname"
            className="form-control"
            id="surname"
            name="surname"
            value={user.surname}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={user.age}
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
export default EditUser;
