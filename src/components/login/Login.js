import React, { useContext, useState } from "react";
//import axios from 'axios';
import { FormDataContext } from "../FormDataContext";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const { formData, setFormData } = useContext(FormDataContext);
    const [setUser] = useState([]);

    // eslint-disable-next-line no-unused-vars
    const getUsers = () => {
        const { name, password } = formData;

        fetch("http://localhost:8080/front/Users", {
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
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/users');
    };


    return (

        <form onSubmit={handleSubmit}>
            <div>
                <h1>Log in page</h1>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="text"
                            name="surname"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </label>
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}


export default Login;