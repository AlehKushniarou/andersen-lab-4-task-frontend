import React, {useContext} from "react";
import { Link } from "react-router-dom";
import "./Common.css";
import {FormDataContext} from "../FormDataContext";


export default function Header() {

  const { formData } = useContext(FormDataContext);
  let { name, password } = formData;
  name = "Your username is " + name;
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          {/*<button*/}
          {/*  className="navbar-toggler"*/}
          {/*  type="button"*/}
          {/*  data-bs-toggle="collapse"*/}
          {/*  data-bs-target="#mynavbar"*/}
          {/*>*/}
          {/*  <span className="navbar-toggler-icon"></span>*/}
          {/*</button>*/}
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <div  className="nav-link">{name}</div>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  User list
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="register">
                  Register new user
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="users-activities">
                  Activity list
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="users-activities/add">
                  Add Activity
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
