import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/person")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
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
          {user.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.name}</td>
                <td>{post.surname}</td>
                <td>{post.age}</td>
                <td>
                  <button onClick={() => navigate(`/users/edit/${post.id}`)}>
                    EDIT
                  </button>
                </td>
                <td>
                  <form action="/hello/users/delete" method="post">
                    <input
                      type="number"
                      name="id"
                      value={post.id}
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
