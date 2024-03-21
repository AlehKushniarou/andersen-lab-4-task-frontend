import "./App.css";
import UserList from "./components/User/UserList";
import { Route, Routes } from "react-router-dom";
import UserEdit from "./components/User/UserEdit";
//import UserAdd from "./components/User/UserAdd";
import Header from "./components/Common/Header";
import ActivityList from "./components/Activities/ActivityList";
import ActivityEdit from "./components/Activities/ActivityEdit";
import ActivityAdd from "./components/Activities/ActivityAdd";
import Login from "./components/login/Login"
import Register from "./components/login/Register";
import { FormDataProvider } from "./components/FormDataContext";
function App() {
  return (
    <FormDataProvider>
      <div className="App">
        <header className="container">
          <div className="">
            <Header />
            <Routes>
              <Route path="/" element={<UserList />} />
              {/*<Route path="/users/add" element={<UserAdd />} />*/}
              <Route path="/users/edit/:id" element={<UserEdit />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users-activities" element={<ActivityList />} />
              <Route path="/users-activities/add" element={<ActivityAdd />} />
              <Route path="/users-activities/edit/:id" element={<ActivityEdit />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>

          </div>
        </header>
      </div>
    </FormDataProvider>
  );
}

export default App;
