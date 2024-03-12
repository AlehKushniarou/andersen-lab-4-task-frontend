import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./views/user-list";
import UserEdit from "./views/user-edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
