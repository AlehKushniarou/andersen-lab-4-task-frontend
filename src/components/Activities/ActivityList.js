import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Loader from "../Common/Loader";
import {FormDataContext} from "../FormDataContext";

const ShowActivity = () => {
  const activitiesListApi = "http://localhost:8080/front/UserActivity";
  const { formData } = useContext(FormDataContext);
  const navigate = useNavigate()
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    const { name, password } = formData;
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(activitiesListApi.concat("/") + id,
          {
            method: "DELETE",
            headers: {
              'Authorization': 'Basic ' + btoa(`${name}:${password}`)
            }
          });
      console.log(response);
      setActivity(activity.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getUsers = () => {
    const { name, password } = formData;
    fetch(activitiesListApi, {
      headers: {
        'Authorization': 'Basic ' + btoa(`${name}:${password}`)
      }
    })
        .then((response) => response.json())
        .then((data) => {
          setActivity(data);
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
  };

  if (activity.length < 0) {
    return <h1>No activity found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Description</th>
              <th>Name and Surname of the user</th>
              <th>Date and Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activity?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.userName}</td>
                  <td>{item.dateTime}</td>
                  <td>
                    <Link to={`/users-activities/edit/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    {/* <Link to={`/user/${item.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link> */}

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowActivity;
