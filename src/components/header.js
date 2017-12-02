import React, { Component } from "react";
import { Modal, Button } from "react-materialize";
import CreateUserModal from "./createUserModal";

import UserForm from "../containers/user_form/UserForm";

class Header extends Component {
  render() {
    console.log(this.props.history, "HISTORY");

    return (
      <nav className="main_nav">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            Dib Management Phone Book
          </a>

          <a href="#" data-activates="mobile-demo" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>

          <ul className="right hide-on-med-and-down">
            <li>
              <CreateUserModal />
            </li>
          </ul>

          <ul className="side-nav" id="mobile-demo">
            <li />
            <li />
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
