import React, { Component } from "react";
import { Modal, Button } from "react-materialize";
import UserForm from "../containers/user_form/UserForm";

class createUserModal extends Component {
  constructor(props) {
    super(props);

    this.default_param = {
      user_created: false,
      modal_header: "Add New Contact"
    };

    this.state = this.default_param;

    this.modalClosed = this.modalClosed.bind(this);
    this.userCreatedCallback = this.userCreatedCallback.bind(this);
  }

  modalClosed() {
    // Set to default
    this.setState(this.default_param);
  }

  setToDefault() {
    // Set to default
    this.setState(this.default_param);
  }

  userCreatedCallback(val) {
    // console.log("userCreatedCallback");
    this.setState({ user_created: true, modal_header: "" });
  }

  render() {
    return (
      <Modal
        header={this.state.modal_header}
        modalOptions={{
          complete: () => {
            this.modalClosed();
          },
          ready: (modal, trigger) => {
            console.log("OPEN MODAL");
            this.setToDefault();
          }
        }}
        trigger={<a>Add New Contact</a>}
      >
        {this.state.user_created == false && (
          <UserForm userCreatedCallback={this.userCreatedCallback} />
        )}
        {this.state.user_created == true && (
          <h5 className="center teal-text"> New contact was created</h5>
        )}
      </Modal>
    );
  }
}

export default createUserModal;
