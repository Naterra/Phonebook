import React, { Component } from "react";
import CreateUserModal from "./createUserModal";

class Header extends Component {
  render() {
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
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
