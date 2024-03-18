import { useState } from "react";
import axios from 'axios';

const ActivityAdd = () => {

    const [user, setUser] = useState({
        description: '',
        userId: '',
        dateTime: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://192.168.100.42:8085/users-activities', user)
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Description
                    <input
                        type="text"
                        name="description"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, description: e.target.value })}
                    />
                </label>
            </div>
            <div>
                <label>
                    User ID:
                    <input
                        type="number"
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
            <button type="submit">Submit</button>
        </form>
    )
}
export default ActivityAdd;