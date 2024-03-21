import {useContext, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {FormDataContext} from "../FormDataContext";

const ActivityAdd = () => {
    const addActivityApi = `${Url}/users-activities`;

    const navigate = useNavigate();
    const { formData, setFormData } = useContext(FormDataContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const getActivityApi = "http://localhost:8080/front/UserActivity";

    const [userActivity, setUserActivity] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, password } = formData;
        fetch(getActivityApi, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(`${name}:${password}`)
            },
            body: JSON.stringify(userActivity),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setIsLoading(true);
                navigate("/users-activities");
            })
            .catch((error) => {
                navigate("/users-activities");
                setError(error.message);
                setIsLoading(false);
            })
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Description
                    <input
                        type="text"
                        name="description"
                        value={userActivity.name}
                        onChange={(e) => setUserActivity({ ...userActivity, description: e.target.value })}
                    />
                </label>
            </div>
            <div>
                {/*<label>*/}
                    {/*Date and Time:*/}
                    <input
                        type="hidden"
                        name="dateTime"
                        value={userActivity.dateTime}
                        onChange={(e) => setUserActivity({ ...userActivity, dateTime: e.target.value })}
                    />
                    {/*</label>*/}
                </div>
                <button className="btn btn-primary submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}
export default ActivityAdd;