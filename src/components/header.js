import React, { Component } from "react";
import { Modal, Button } from "react-materialize";

import UserForm from "../containers/user_form/UserForm";

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
              <a>Add New Contact</a>
            </li>
            <li>
              <Modal header="Modal Header" trigger={<Button>MODAL</Button>}>
                <UserForm />
              </Modal>
            </li>
          </ul>

          <ul className="side-nav" id="mobile-demo">
            <li>
              <a>Add New Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
