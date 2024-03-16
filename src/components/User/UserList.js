import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import { Url } from '../../constants/global';

const ShowUser = () => {
  const userListApi = `${Url}/users`;

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
      const response = await fetch(userListApi.concat("/") + id, {
        method: "DELETE",
      });
      console.log(response);
      setUser(user.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch(userListApi)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.age}</td>
                  <td>
                    <Link to={`/users/edit/${item.id}`}>
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

export default ShowUser;
