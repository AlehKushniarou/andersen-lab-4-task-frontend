import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {

  const [users, setusers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.1.121:8085/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setusers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>SURNAME</th>
            <th>AGE</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => {

            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => navigate(`/users/edit/${user.id}`)}>
                    EDIT
                  </button>
                </td>
                <td>
                  <form action="/hello/users/delete" method="post">
                    <input
                      type="number"
                      name="id"
                      value={user.id}
                      readOnly
                      hidden
                    />
                    <input type="submit" value="Delete" />
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
