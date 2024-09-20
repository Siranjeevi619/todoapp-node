import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="ms-5 ms-md-0 d-flex text-center justify-content-center align-items-center">
          <Link className="navbar-brand ms-5 ms-md-0" to="/">
            To Do App <i className="bi bi-check text-primary"></i>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="mx-auto">
            <div className="me-md-5">
              <div className="navbar-nav me-md-5">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/completed">
                  Completed
                </Link>
                <Link className="nav-link" to="/removed">
                  Removed
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
