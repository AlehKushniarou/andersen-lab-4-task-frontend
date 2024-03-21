import React, {useContext, useState} from "react";
import axios from 'axios';
import {FormDataContext} from "../FormDataContext";
import { useNavigate } from 'react-router-dom';

const Register= () => {
    const navigate = useNavigate();
    const { formData, setFormData } = useContext(FormDataContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/front/Register', formData)
            .then(response => {
                console.log('Successful sending', response.data);
                setFormData(formData);
                navigate('/users');
            })
            .catch(error => {
                console.error('Error while sending', error);
                alert("Error while sending")
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </label>
            </div>
            <div>
                <label>
                    Surname:
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={(e) => setFormData({...formData, surname: e.target.value})}
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
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </label>
            </div>
            <div>
                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                    />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}


export default Register;