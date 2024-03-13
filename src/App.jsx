import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./views/user-list";
import UserEdit from "./views/user-edit";
import UserAdd from "./views/user-add";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
        <Route path="/users/add"  element={<UserAdd/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
