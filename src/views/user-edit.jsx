import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const UserEdit = () => {
  let { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.1.121:8085/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    age: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="number" name="id" value={user.id} />
        <label>
          Name:
          <br />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <br />
        </label>
        <label>
          Surname:
          <br />
          <input
            type="text"
            name="surname"
            value={user.surname}
            onChange={handleChange}
          />
          <br />
        </label>
        <label>
          Age:
          <br />
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleChange}
          />
          <br />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <br />
      <a href="/users">Back to user list</a>
    </>
  );
};

export default UserEdit;
