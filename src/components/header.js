import React, { Component } from "react";
import CreateUserModal from "./createUserModal";
import { Navbar, NavItem } from "react-materialize";

class Header extends Component {
  render() {
    return (
      <Navbar brand="logo" right>
        <li>
          <CreateUserModal />
        </li>
      </Navbar>
    );
  }
}

export default Header;
