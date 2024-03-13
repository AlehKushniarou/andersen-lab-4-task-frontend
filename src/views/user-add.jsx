import {useState} from "react";
import axios from 'axios';

const UserAdd = () => {

    const [user, setUser] = useState({
        name: '',
        surname: '',
        age: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/person', user)//todo поменяй адрес!!
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                </label>
            </div>
            <div>
                <label>
                    Surname:
                    <input
                        type="text"
                        name="surname"
                        value={user.surname}
                        onChange={(e) => setUser({...user, surname: e.target.value})}
                    />
                </label>
            </div>
            <div>
                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={user.age}
                        onChange={(e) => setUser({...user, age: e.target.value})}
                    />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}
export default UserAdd;