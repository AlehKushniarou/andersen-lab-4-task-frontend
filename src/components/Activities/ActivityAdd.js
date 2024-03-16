import { useState } from "react";
import axios from 'axios';
import './User.css';
import { Url } from '../../constants/global';

const ActivityAdd = () => {
    const addActivityApi = `${Url}/users-activities`;

    const [user, setUser] = useState({
        description: '',
        userId: '',
        dateTime: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(addActivityApi, user)
            .then(response => {
                console.log('Successful sending', response.data);
                window.location.href = '/users-activities';
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
                        Description
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, description: e.target.value })}
                        />
                    </label>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">
                        User ID:
                        <input
                            type="number"
                            className="form-control"
                            name="userId"
                            value={user.userId}
                            onChange={(e) => setUser({ ...user, userId: e.target.value })}
                        />
                    </label>
                </div>
                <div>
                    {/*<label>*/}
                    {/*Date and Time:*/}
                    <input
                        type="hidden"
                        name="dateTime"
                        value={user.dateTime}
                        onChange={(e) => setUser({ ...user, dateTime: e.target.value })}
                    />
                    {/*</label>*/}
                </div>
                <button className="btn btn-primary submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default ActivityAdd;