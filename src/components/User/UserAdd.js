import { useState } from "react";
import axios from 'axios';
import './User.css';

const UserAdd = () => {

    const [user, setUser] = useState({
        name: '',
        surname: '',
        age: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://192.168.1.121:8085/users', user)
            .then(response => {
                console.log('Successful sending', response.data);
                window.location.href = '/users';
            })
            .catch(error => {
                console.error('Error while sending', error);
                alert("Error while sending")
            });
    };


    return (
        <div className='user-form'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">
                        Name:
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                    </label>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">
                        Surname:
                        <input
                            type="text"
                            className="form-control"
                            name="surname"
                            value={user.surname}
                            onChange={(e) => setUser({ ...user, surname: e.target.value })}
                        />
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Age:
                        <input
                            type="number"
                            className="form-control"
                            name="age"
                            value={user.age}
                            onChange={(e) => setUser({ ...user, age: e.target.value })}
                        />
                    </label>
                </div>
                <button className="btn btn-primary submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default UserAdd;