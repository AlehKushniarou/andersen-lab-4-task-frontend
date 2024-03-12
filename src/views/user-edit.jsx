import { useParams } from "react-router-dom";

function UserEdit() {
  let { id } = useParams();
  return (
    <>
      <h1>edit</h1>
      <p>{id}</p>
    </>
  );
}

export default UserEdit;
