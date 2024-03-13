import "./App.css";
import UserList from "./components/User/UserList";
import { Route, Routes } from "react-router-dom";
import UserEdit from "./components/User/UserEdit";
import UserAdd from "./components/User/UserAdd";
import Header from "./components/Common/Header";
function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>

            <Route path="/" element={<UserList />} />
            <Route path="/users/add" element={<UserAdd />} />
            <Route path="/users/edit/:id" element={<UserEdit />} />
            <Route path="/users" element={<UserList />} />
          </Routes>

        </div>
      </header>
    </div>
  );
}

export default App;
